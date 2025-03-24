import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';

import { CustomExceptionUtil } from '../../../utils/custom-exception.util';
import { AuthErrorMessage } from '../../messages/error/auth.message';
import { TUserAuth } from '../../type/user.type';
import { Language } from '../../enum/language.enum';

export abstract class ProtectBaseAbstract {
  protected constructor(protected readonly jwtService: JwtService) {}

  async verifyToken(
    token: string,
    lang: Language,
  ): Promise<TUserAuth & { exp: number }> {
    if (!token)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[lang].TOKEN_UNAUTHORIZED,
      );

    let decodedToken: (TUserAuth & { exp: number }) | undefined;
    try {
      decodedToken = await this.jwtService.verify(token);
      if (!decodedToken) new Error('decodedToken is empty');
    } catch {
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[lang].TOKEN_UNAUTHORIZED,
      );
    }
    return decodedToken;
  }
}
