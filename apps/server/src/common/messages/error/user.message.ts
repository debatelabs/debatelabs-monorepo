import { Language } from '@prisma/client';

type TUserErrorMessage = {
  USER_NOT_FOUND: string;
  AVATAR_SET: string;
};

export const UserErrorMessage: Record<Language, TUserErrorMessage> = {
  [Language.EN]: {
    USER_NOT_FOUND: 'User not found',
    AVATAR_SET: 'Avatar secret value',
  },
  [Language.UK]: {
    USER_NOT_FOUND: 'Користувача не знайдено',
    AVATAR_SET: 'Помилка збереження зображення',
  },
};
