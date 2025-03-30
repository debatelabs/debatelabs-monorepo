import { z } from 'zod';
import createLoginFormSchema from './login-form.schema';
import { TFunction } from 'i18next';

export default function createSignupFormSchema(t: TFunction) {
  return createLoginFormSchema(t)
    .extend({
      name: z
        .string()
        .min(2, t('validation.min', { length: 2 }))
        .max(100, t('validation.max', { length: 100 })),
      confirmPassword: z.string()
    })
    .strict()
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordsDontMatch'),
      path: ['confirmPassword']
    });
}
