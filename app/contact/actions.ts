"use server";

// Database
import mongoDB from '@/lib/mongodb';
// i18n
import { getTranslations } from 'next-intl/server';
// Schemas
import useContactSchema from '@/lib/schemas/contact';

export type FormField = {
  name: string;
  value: string;
  type: string;
  placeholder: string;
  required?: boolean;
  error: string;
};

type ValidationErrors = { [key: string]: string };
type ResponseError = string;

// MongoDB database and collection
const db = mongoDB.db("portfolio_database");
const collection = db.collection("contact_submissions");


export async function formValidation(formData: FormField[]) {
  const ContactSchema = await useContactSchema();

  // Initialize error tracking
  let hasvalidationErrors = false;
  let validationErrors: ValidationErrors = {};

  // Validate form data using Zod schema
  const contactSchemaResult = ContactSchema.safeParse({
    name: formData.find(field => field.name === 'name')?.value || '',
    email: formData.find(field => field.name === 'email')?.value || '',
    message: formData.find(field => field.name === 'message')?.value || '',
    createdAt: new Date(),
  });

  // Handle validation errors
  if (!contactSchemaResult.success) {
    hasvalidationErrors = true;
    contactSchemaResult.error.issues.forEach((issue) => {
      const fieldName = issue.path[0] as string;
      validationErrors[fieldName] = issue.message;
    });
  }

  return { hasvalidationErrors, validationErrors };
}

/**
 * Submit Contact Form
 * Handles server-side validation and Turnstile verification.
 */
export async function submitContactForm(formData: FormField[], turnstileToken: string) {
  const t = await getTranslations('ContactPage.form.errors');

  // Only allow expected fields
  const allowedFields = ["name", "email", "message"];

  // Filter out any unexpected fields
  formData = formData.filter(field => allowedFields.includes(field.name));

  // Initialize error tracking
  let hasvalidationErrors = false;
  let validationErrors: ValidationErrors = {};

  // Validate form data
  const validationResult = await formValidation(formData);
  hasvalidationErrors = validationResult.hasvalidationErrors;
  validationErrors = validationResult.validationErrors;

  // If there are validation errors, return them
  if (hasvalidationErrors) {
    return {
      success: false,
      hasvalidationErrors,
      validationErrors,
      hasResponseError: false,
      responseError: ""
    };
  }

  // Verify Turnstile token
  const isTurnstileValid = await verifyTurnstileToken(turnstileToken);
  if (!isTurnstileValid) {
    return {
      success: false,
      hasvalidationErrors,
      validationErrors,
      hasResponseError: true,
      responseError: t('verificationFailed')
    };
  }

  // Simulate processing delay (for UX purposes)
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Prepare data for insertion
  let formDataObj: { [key: string]: string } = {};

  formData.forEach((field) => {
    formDataObj[field.name] = field.value;
  });

  // Save submission to MongoDB
  await collection.insertOne({ ...formDataObj, createdAt: new Date() }).catch((error) => {
    console.error("Error saving contact form submission:", error);
    return {
      success: false,
      hasvalidationErrors,
      validationErrors,
      hasResponseError: true,
      responseError: t('serverError')
    };
  });

  return {
    success: true,
    hasvalidationErrors,
    validationErrors,
    hasResponseError: false,
    responseError: ""
  };
}

/**
 * Verify Turnstile Token with Cloudflare
 * docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("Turnstile secret key is not set in environment variables.");
    return false;
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  });

  const data = await response.json();
  return data.success;
}