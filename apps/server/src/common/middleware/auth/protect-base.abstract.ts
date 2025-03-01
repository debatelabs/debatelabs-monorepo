import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';
import { Language } from '@prisma/client';

import { CustomExceptionUtil } from '../../../utils/custom-exception.util';
import { AuthErrorMessage } from '../../messages/error/auth.message';

export abstract class ProtectBaseAbstract {
  protected constructor(protected readonly jwtService: JwtService) {}

  async verifyToken(
    token?: string,
  ): Promise<{ id: number; email: string; exp: number; deviceId?: number }> {
    if (!token)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
      );

    let decodedToken:
      | { id: number; email: string; exp: number; deviceId?: number }
      | undefined;
    try {
      decodedToken = await this.jwtService.verify(token);
      if (!decodedToken) new Error('decodedToken is empty');
    } catch {
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[Language.EN].TOKEN_UNAUTHORIZED,
      );
    }
    return decodedToken;
  }
}
