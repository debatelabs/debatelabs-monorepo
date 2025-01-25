import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDevice } from '@prisma/client';
import { NextFunction, Response, Request } from 'express';

import { ProtectBaseAbstract } from './protect-base.abstract';
import { PrismaService } from '../../../prisma.service';
import { CustomException } from '../../../utils/custom-exception';
import { ResponseErrorEnum } from '../../enum/response-message.enum';

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
      user: Pick<User, 'id' | 'isBlocked' | 'email'>;
      device: UserDevice;
    },
    _: Response,
    next: NextFunction,
  ) {
    const token = req.cookies.refreshToken;
    const { id } = await this.verifyToken(token);

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        isBlocked: true,
        devices: true,
      },
    });
    if (!user)
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ResponseErrorEnum.TOKEN_UNAUTHORIZED,
      );
    if (user.isBlocked)
      throw new CustomException(
        HttpStatus.FORBIDDEN,
        ResponseErrorEnum.USER_BLOCKED,
      );

    const device = user.devices.find((i) => i.refreshToken === token);
    if (!device)
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ResponseErrorEnum.TOKEN_UNAUTHORIZED,
      );

    req.user = user;
    req.device = device;
    next();
  }
}
