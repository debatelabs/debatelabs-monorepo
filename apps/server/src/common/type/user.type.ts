import { User } from '@prisma/client';

export type TUserAuth = Pick<
  User,
  'id' | 'name' | 'avatar' | 'role' | 'email'
> & {
  deviceId: number;
};
