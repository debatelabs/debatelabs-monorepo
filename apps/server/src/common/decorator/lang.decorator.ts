import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Language } from '../enum/language.enum';
import { getLang } from '../../utils/header-lang-get.util';

export const Lang = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Language => {
    const request = ctx.switchToHttp().getRequest();
    return getLang(request.headers['Accept-Language']);
  },
);
