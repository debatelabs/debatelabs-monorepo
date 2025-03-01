import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ProtectBaseAbstract } from './protect-base.abstract';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { Language } from '@prisma/client';

import { PrismaService } from '../../../prisma.service';
import { ProtectReqType } from '../../type/request.type';
import { CustomExceptionUtil } from '../../../utils/custom-exception.util';
import { AuthErrorMessage } from '../../messages/error/auth.message';

@Injectable()
export class ProtectAuthMiddleware
  extends ProtectBaseAbstract
  implements NestMiddleware
{
  constructor(
    private readonly prisma: PrismaService,
    jwtService: JwtService,
  ) {
    super(jwtService);
  }

  async use(req: ProtectReqType, _: Response, next: NextFunction) {
    const { id } = await this.verifyToken(
      req.headers.authorization?.startsWith('Bearer') &&
        req.headers.authorization?.split(' ')[1],
    );

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        isBlocked: true,
        language: true,
        role: true,
      },
    });
    if (!user)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
      );
    if (user.isBlocked)
      throw new CustomExceptionUtil(
        HttpStatus.FORBIDDEN,
        AuthErrorMessage[user.language].USER_BLOCKED,
      );

    req.user = user;
    next();
  }
}
