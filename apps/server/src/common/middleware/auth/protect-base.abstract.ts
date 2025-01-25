import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';

import { CustomException } from '../../../utils/custom-exception';
import { ResponseErrorEnum } from '../../enum/response-message.enum';

export abstract class ProtectBaseAbstract {
  protected constructor(protected readonly jwtService: JwtService) {}

  async verifyToken(token?: string): Promise<{ id: number; email: string }> {
    if (!token)
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ResponseErrorEnum.TOKEN_UNAUTHORIZED,
      );

    let decodedToken: { id: number; email: string } | undefined;
    try {
      decodedToken = await this.jwtService.verify(token);
      if (!decodedToken) new Error('decodedToken is empty');
    } catch (error) {
      console.error(error);
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ResponseErrorEnum.TOKEN_UNAUTHORIZED,
      );
    }
    return decodedToken;
  }
}
