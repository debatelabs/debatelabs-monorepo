import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as process from 'process';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const serverAddress = `${process.env.NEXT_PUBLIC_SERVER_PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_HOST}`;
const serverPort = process.env.NEXT_PUBLIC_SERVER_PORT
  ? `:${process.env.NEXT_PUBLIC_SERVER_PORT}`
  : '';
const callbackURL = `${serverAddress}${serverPort}/api/auth/google/callback`;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID,
      clientSecret,
      callbackURL,
      passReqToCallback: true,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _request: any,
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    let fixImage = profile.photos[0]?.value;
    const arrayStr = profile.photos[0]?.value.split('/');
    const lastStr = arrayStr[arrayStr.length - 1];
    if (lastStr && lastStr.includes('=s96-c')) {
      fixImage = profile.photos[0]?.value.replace('=s96-c', '=s256-c');
    }

    const email = profile?.emails[0]?.value;
    if (!email) return done('Not found email', false);

    const user = {
      name: profile?.name?.givenName,
      avatar: fixImage,
      email,
    };
    return done(null, user);
  }
}
