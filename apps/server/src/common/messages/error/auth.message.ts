import { Language } from '../../enum/language.enum';

type TAuthErrorMessage = {
  LOGIN_UNAUTHORIZED: string;
  REGISTER_USER_EXIST: string;
  TOKEN_UNAUTHORIZED: string;
  USER_BLOCKED: string;
};

export const AuthErrorMessage: Record<Language, TAuthErrorMessage> = {
  [Language.EN]: {
    LOGIN_UNAUTHORIZED: 'Email or password is wrong',
    REGISTER_USER_EXIST: 'User with such email already exists',
    TOKEN_UNAUTHORIZED: "You aren't authorized or your session expired",
    USER_BLOCKED: 'Your account is blocked',
  },
  [Language.UK]: {
    LOGIN_UNAUTHORIZED: 'Пошта або пароль невірні',
    REGISTER_USER_EXIST: 'Користувач з такою поштою вже існує',
    TOKEN_UNAUTHORIZED: 'Ви не авторизовані або термін дії сеансу закінчився',
    USER_BLOCKED: 'Ваш аккаутн заблоковано',
  },
};
