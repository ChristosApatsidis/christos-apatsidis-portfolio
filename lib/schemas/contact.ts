import { z } from "zod";
import { getTranslations } from "next-intl/server";

/**
 * Contact Form Schema
 * Defines validation rules for the contact form using Zod.
 * Fields:
 * - name: Required, max length 100
 * - email: Required, valid email format, max length 100
 * - message: Required, max length 1000
 */
export default async function useContactSchema() {
  const t = await getTranslations("ContactPage.form.validations");

  return z.object({
    name: z.string()
      .max(100, { message: t("nameMaxLength", { max: 100 }) })
      .nonempty({ message: t("nameRequired") }),
    email: z.string()
      .email({ message: t("invalidEmail") })
      .max(100, { message: t("emailMaxLength", { max: 100 }) })
      .nonempty({ message: t("emailRequired") }),
    message: z.string()
      .max(1000, { message: t("messageMaxLength", { max: 1000 }) })
      .nonempty({ message: t("messageRequired") }),
    createdAt: z.date(),
  });
}