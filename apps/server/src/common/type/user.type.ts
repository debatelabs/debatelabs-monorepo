import { User } from '@prisma/client';

export type TUserAuth = Pick<
  User,
  'id' | 'email' | 'isBlocked' | 'language' | 'role'
>;

export type TUserInfo = Pick<
  User,
  'id' | 'firstName' | 'language' | 'lastName' | 'avatar' | 'email'
>;
