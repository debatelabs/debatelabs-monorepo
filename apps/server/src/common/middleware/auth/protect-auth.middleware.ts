import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ProtectBaseAbstract } from './protect-base.abstract';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

import { PrismaService } from '../../../prisma.service';
import { ProtectReqType } from '../../type/request.type';
import { CustomException } from '../../../utils/custom-exception';
import { ResponseErrorEnum } from '../../enum/response-message.enum';

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

    req.user = user;
    next();
  }
}
