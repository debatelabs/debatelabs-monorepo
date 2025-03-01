import { User } from '@prisma/client';

export type TUserAuth = Pick<
  User,
  'id' | 'email' | 'isBlocked' | 'language' | 'role'
>;
