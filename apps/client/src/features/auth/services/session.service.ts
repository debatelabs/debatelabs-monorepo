import SessionMapper from '~/features/auth/mappers/session.mapper';
import { NextResponse } from 'next/server';
import { TokenPayload } from '~/shared/types/session.types';
import { sessionCookie } from '~/core/constants/cookies';

export class SessionService {
  constructor(
    private readonly sessionMapper = new SessionMapper(),
    private readonly cookieName = sessionCookie.name,
    private readonly cookieOptions = sessionCookie.options
  ) {}

  setJwtPayloadToCookie(accessTokenPayload: TokenPayload, res: NextResponse) {
    const jwtPayloadDTO = this.sessionMapper.toJwtPayloadDTO(accessTokenPayload);
    res.cookies.set(this.cookieName, JSON.stringify(jwtPayloadDTO), this.cookieOptions);
  }

  getJwtPayloadFromCookie() {}
}

const sessionService = new SessionService();

export default sessionService;
