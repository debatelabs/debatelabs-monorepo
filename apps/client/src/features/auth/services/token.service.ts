import envConfig from '~/core/configs/env.config';
import * as jose from 'jose';
import { NextRequest } from 'next/server';

import { TokenPayload } from '~/shared/types/session.types';

export class TokenService {
  private readonly jwtSecretEncoded: Uint8Array<ArrayBufferLike>;

  constructor(jwtSecret = envConfig.JWT_SECRET) {
    this.jwtSecretEncoded = new TextEncoder().encode(jwtSecret);
  }

  public async validateToken(token: string | undefined) {
    try {
      if (!token) throw new Error();
      const { payload } = await jose.jwtVerify<TokenPayload>(
        token,
        this.jwtSecretEncoded
      );
      return payload as TokenPayload;
    } catch (err) {
      return null;
    }
  }

  public verifyAccessTokenFromCookie(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken')?.value;
    return this.validateToken(accessToken);
  }

  public async verifyRefreshTokenFromCookie(req: NextRequest) {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    return this.validateToken(refreshToken);
  }
}

const tokenService = new TokenService();

export default tokenService;
