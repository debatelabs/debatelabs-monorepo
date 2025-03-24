import { Injectable, NestMiddleware } from '@nestjs/common';
import { ProtectBaseAbstract } from './protect-base.abstract';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

import { PrismaService } from '../../../prisma.service';
import { ProtectReqType } from '../../type/request.type';
import { getLang } from '../../../utils/header-lang-get.util';

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
    const lang = getLang(
      Array.isArray(req.headers['Accept-Language'])
        ? ''
        : req.headers['Accept-Language'],
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, ...user } = await this.verifyToken(
      req.headers.authorization?.startsWith('Bearer') &&
        req.headers.authorization?.split(' ')[1],
      lang,
    );

    req.user = user;
    next();
  }
}
