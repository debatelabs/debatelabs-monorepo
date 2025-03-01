import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { Details } from 'express-useragent';
import { User, UserDevice } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { TokenType } from '../../common/type/token.type';
import { RegisterDto } from './dto/register.dto';
import { CustomExceptionUtil } from '../../utils/custom-exception.util';
import {
  checkPassword,
  hashPasswordUtil,
} from '../../utils/hash-password.util';
import { UserDevicePrisma } from '../../prisma-extend/user-device-prisma';
import { LoginDto } from './dto/login.dto';
import { RedisService } from '../../redis-io/redis.service';
import { AuthErrorMessage } from '../../common/messages/error/auth.message';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userDevicePrisma: UserDevicePrisma,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async singUpCredentials(
    body: RegisterDto,
    userAgent: Details,
    ipAddress: string,
  ): Promise<
    Omit<User, 'password'> & {
      accessToken: string;
      refreshToken: string;
    }
  > {
    const { email, password, language, ...names } = body;

    const existUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
      },
    });
    if (existUser)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[language].REGISTER_USER_EXIST,
      );

    const hashPass = await hashPasswordUtil(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        firstName: names.firstName,
        lastName: names.lastName,
        password: hashPass,
        language,
      },
    });
    delete newUser.password;

    const tokens = this.generateToken({ email, id: newUser.id });

    const device = await this.userDevicePrisma.add({
      userAgent,
      ipAddress,
      tokens,
      userId: newUser.id,
    });

    await this.saveAuth({
      userId: newUser.id,
      deviceId: device.id,
      accessToken: tokens.accessToken,
    });

    return { ...newUser, ...tokens };
  }

  async singInCredentials(
    body: LoginDto,
    userAgent: Details,
    ipAddress: string,
  ): Promise<
    Pick<
      User,
      'id' | 'firstName' | 'language' | 'lastName' | 'avatar' | 'email'
    > & {
      accessToken: string;
      refreshToken: string;
    }
  > {
    const { email, password, language } = body;

    const existUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        password: true,
        firstName: true,
        lastName: true,
        language: true,
      },
    });
    if (!existUser)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[language].LOGIN_UNAUTHORIZED,
      );

    const isValidPass = await checkPassword(password, existUser.password);
    if (!isValidPass)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[language].LOGIN_UNAUTHORIZED,
      );

    const tokens = this.generateToken({ email, id: existUser.id });

    const device = await this.userDevicePrisma.add({
      userAgent,
      ipAddress,
      tokens,
      userId: existUser.id,
    });

    await this.saveAuth({
      userId: existUser.id,
      deviceId: device.id,
      accessToken: tokens.accessToken,
    });

    delete existUser.password;

    return {
      ...existUser,
      ...tokens,
    };
  }

  async logout(device: UserDevice): Promise<void> {
    await this.prisma.userDevice.delete({ where: { id: device.id } });
  }

  async refreshToken(
    user: User,
    device: UserDevice,
    userAgent: Details,
    ipAddress: string,
  ): Promise<TokenType> {
    const tokens = this.generateToken({
      email: user.email,
      id: user.id,
      deviceId: device.id,
    });

    await Promise.all([
      this.userDevicePrisma.update({
        deviceId: device.id,
        userAgent,
        tokens,
        ipAddress,
      }),
      this.saveAuth({
        userId: user.id,
        deviceId: device.id,
        accessToken: tokens.accessToken,
      }),
    ]);

    return tokens;
  }

  private generateToken(payload: {
    email: string;
    id: number;
    deviceId?: number;
  }): TokenType {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRE_REFRESH_TOKEN,
    });
    return { accessToken, refreshToken };
  }

  private async saveAuth(payload: {
    userId: number;
    deviceId: number;
    accessToken: string;
  }) {
    const { accessToken } = payload;
    const { exp } = this.jwtService.decode(accessToken);
    return this.redisService.saveAuthUser({ ...payload, expiresIn: exp });
  }
}
