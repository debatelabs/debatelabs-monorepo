import { User } from '@prisma/client';
import { Request } from 'express';

export type ProtectReqType = Request & {
  user: Pick<User, 'id' | 'isBlocked' | 'email'>;
};
