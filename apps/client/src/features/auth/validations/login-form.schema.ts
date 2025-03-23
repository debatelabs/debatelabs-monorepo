import { TFunction } from 'i18next';
import { z } from 'zod';

export default function createLoginFormSchema(t: TFunction) {
  return z
    .object({
      email: z.string().email(t('validation.email')),
      password: z
        .string()
        .regex(/[A-Z]/, t('validation.upperCaseLetter'))
        .regex(/[0-9]/, t('validation.numberSymbol'))
        .regex(/[\W_]/, t('validation.specialSymbol'))
        .min(8, t('validation.min', { length: 8 }))
        .max(100, t('validation.max', { length: 100 }))
    })
    .strict();
}
