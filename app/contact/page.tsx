"use client";

import React, { useState, useEffect, useRef } from 'react';
/* UI Components */
import { SectionCard, SectionCardHeader } from '@/components/ui/sectionCard';
import { Input, TextArea, Button, Turnstile } from '@/components/ui/forms';
import { TurnstileInstance } from '@marsidev/react-turnstile';
/* Actions */
import { submitContactForm, type FormField } from '@/app/contact/actions';
/* Animation */
import { motion, AnimatePresence } from 'framer-motion';
/* i18n */
import { useTranslations, useLocale } from 'next-intl';

/**
 * Contact Page Component
 * Renders the contact form with validation and Turnstile CAPTCHA.
 */
export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const locale = useLocale();

  // Form Turnstile
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance>(null);
  // Form submission state
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');
  // Store required flag in state
  const [formData, setFormData] = useState<FormField[]>([
    { name: 'name', value: '', error: '', placeholder: t('form.name'), type: 'text', required: true },
    { name: 'email', value: '', error: '', placeholder: t('form.email'), type: 'text', required: true },
    { name: 'message', value: '', error: '', placeholder: t('form.message'), type: 'textarea', required: true },
  ]);

  // Update placeholders when language changes
  useEffect(() => {
    setFormData((prev) =>
      prev.map((field) => ({
        ...field,
        placeholder: t(`form.${field.name}` as any),
        error: '', // Clear errors on language change
      }))
    );
  }, [locale, t]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Turnstile
    if (!turnstileToken) {
      setServerError(t('form.validations.turnstileRequired'));
      return;
    }

    setSubmitLoading(true);

    // Server-side submission
    try {
      const result = await submitContactForm(formData, turnstileToken);

      if (!result.success) {
        // Handle validation errors from server
        if (result.hasvalidationErrors) {
          setFormData((prevData) =>
            prevData.map((field) => ({
              ...field,
              error: result.validationErrors[field.name] || '',
            }))
          );
          return;
        }

        // Handle other server errors
        if (result.hasResponseError) {
          setServerError(result.responseError || t('form.errors.serverError'));
          turnstileRef.current?.reset();
          setTurnstileToken('');
          return
        }
      }

      setSubmittedSuccessfully(true);
    } catch (error) {
      setServerError(t('form.errors.networkError'));
      turnstileRef.current?.reset();
      setTurnstileToken('');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Clear server error on input change
    setServerError('');
    setFormData((prevData) =>
      prevData.map((field) =>
        field.name === name ? { ...field, value, error: '' } : field
      )
    );
  };

  return (
    <SectionCard transition={{ duration: 0.3, ease: "easeOut" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {/* Server Error Message */}
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-xl text-red-500 text-sm overflow-hidden"
            >
              {serverError}
            </motion.div>
          )}

          {/* Form or Success Message */}
          {submittedSuccessfully ? (
            <SubmittedSuccessfullyMessage />
          ) : (
            <div>
              <SectionCardHeader>
                {t('title')}
              </SectionCardHeader>
              <p className='text-black/60 dark:text-white/60 mb-4'>
                {t('description')}
              </p>

              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md space-y-4"
              >
                {/* Form Fields */}
                {formData.map((field, idx) => {
                  return field.type === 'textarea' ? (
                    <TextArea
                      key={`${field.name}-${idx}`}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={handleChange}
                      disabled={submitLoading}
                      rows={5}
                      resize="resize-none"
                      error={field.error}
                    />
                  ) : (
                    <Input
                      key={`${field.name}-${idx}`}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={field.value}
                      onChange={handleChange}
                      disabled={submitLoading}
                      error={field.error}
                    />
                  );
                })}

                {/* Turnstile CAPTCHA */}
                <Turnstile
                  ref={turnstileRef}
                  onSuccess={(token) => setTurnstileToken(token)}
                  onError={() => {
                    setTurnstileToken('');
                    setServerError(t('form.errors.verificationFailed'));
                  }}
                  onExpire={() => {
                    setTurnstileToken('');
                    setServerError(t('form.errors.verificationExpired'));
                  }}
                  options={{
                    theme: "auto",
                    size: "flexible"
                  }}
                />

                <Button
                  type="submit"
                  loading={submitLoading}
                  loadingMessage={t('form.sending')}
                  disabled={submitLoading || !turnstileToken}
                >
                  {t('form.send')}
                </Button>
              </motion.form>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionCard>
  );
}

/**
 * Submitted Successfully Message Component
 * Displays a thank you message after successful form submission.
 */
function SubmittedSuccessfullyMessage() {
  const t = useTranslations('ContactPage');

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold mb-2">{t('submittedMessage.title')}</h2>
      <p className="text-black/60 dark:text-white/60">{t('submittedMessage.subtitle')}</p>
      <p className="text-black/60 dark:text-white/60">{t('submittedMessage.description')}</p>
    </motion.div>
  );
}