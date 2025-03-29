import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDevice } from '@prisma/client';
import { NextFunction, Response, Request } from 'express';

import { ProtectBaseAbstract } from './protect-base.abstract';
import { PrismaService } from '../../../prisma.service';
import { CustomExceptionUtil } from '../../../utils/custom-exception.util';
import { AuthErrorMessage } from '../../messages/error/auth.message';
import { TUserAuth } from '../../type/user.type';
import { getLang } from '../../../utils/header-lang-get.util';

@Injectable()
export class ProtectRefreshMiddleware
  extends ProtectBaseAbstract
  implements NestMiddleware
{
  constructor(
    private readonly prisma: PrismaService,
    jwtService: JwtService,
  ) {
    super(jwtService);
  }
  async use(
    req: Request & {
      user: TUserAuth;
      device: UserDevice;
    },
    _: Response,
    next: NextFunction,
  ) {
    const lang = getLang(
      Array.isArray(req.headers['accept-language'])
        ? ''
        : req.headers['accept-language'],
    );

    const token = req.cookies.refreshToken;
    const { id } = await this.verifyToken(token, lang);

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        avatar: true,
        isBlocked: true,
        role: true,
        devices: true,
        name: true,
      },
    });

    if (!user)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[lang].TOKEN_UNAUTHORIZED,
      );
    const { isBlocked, devices, ...userr } = user;
    if (isBlocked)
      throw new CustomExceptionUtil(
        HttpStatus.FORBIDDEN,
        AuthErrorMessage[lang].USER_BLOCKED,
      );

    const device = devices.find((i) => i.refreshToken === token);
    if (!device)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[lang].TOKEN_UNAUTHORIZED,
      );

    req.user = { ...userr, deviceId: device.id };
    req.device = device;
    next();
  }
}
