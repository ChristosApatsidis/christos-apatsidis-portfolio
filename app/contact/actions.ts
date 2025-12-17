"use server";

/* i18n */
import { getTranslations } from 'next-intl/server';

export type FormField = {
  name: string;
  value: string;
  type: string;
  placeholder: string;
  required?: boolean;
  error: string;
};

type ValidationErrors = { [key: string]: string };
type ResponseError = { type: string; message: string }[];

/**
 * shared validation function
 * Validates the contact form fields.
 */
export async function validateContactForm(formData: FormField[]) {
  const t = await getTranslations('ContactPage.form.validations');

  const validationErrors: ValidationErrors = {};
  let hasvalidationErrors = false;

  formData.forEach((field) => {
    // Basic required field validation
    if (field.required && !field.value.trim()) {
      hasvalidationErrors = true;
      validationErrors[field.name] = t(`${field.name}Required`);
    }

    // Email format validation
    if (field.name === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        hasvalidationErrors = true;
        validationErrors[field.name] = t('invalidEmail');
      }
    }
  });

  return { hasvalidationErrors, validationErrors };
}

/**
 * Submit Contact Form
 * Handles server-side validation and Turnstile verification.
 */
export async function submitContactForm(formData: FormField[], turnstileToken: string) {
  const t = await getTranslations('ContactPage.form.errors');

  // Server-side validation (security layer)
  const { hasvalidationErrors, validationErrors } = await validateContactForm(formData);

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

  // Your actual submission logic here
  console.log('Form submitted on server:', formData);
  await new Promise((resolve) => setTimeout(resolve, 2000));

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