import { Injectable, NestMiddleware } from '@nestjs/common';
import { ProtectBaseAbstract } from './protect-base.abstract';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';

import { ProtectReqType } from '../../type/request.type';
import { getLang } from '../../../utils/header-lang-get.util';

@Injectable()
export class ProtectAuthMiddleware
  extends ProtectBaseAbstract
  implements NestMiddleware
{
  constructor(jwtService: JwtService) {
    super(jwtService);
  }

  async use(req: ProtectReqType, _: Response, next: NextFunction) {
    const lang = getLang(
      Array.isArray(req.headers['accept-language'])
        ? ''
        : req.headers['accept-language'],
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { exp, ...user } = await this.verifyToken(
      req.cookies.accessToken,
      lang,
    );

    req.user = user;
    next();
  }
}
