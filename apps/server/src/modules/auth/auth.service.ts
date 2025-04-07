import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { Details } from 'express-useragent';
import { User, UserDevice } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

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
import { TUserAuth } from '../../common/type/user.type';
import { Language } from '../../common/enum/language.enum';

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
    lang: Language,
  ): Promise<TokenType> {
    const { email, password, name } = body;

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
        AuthErrorMessage[lang].REGISTER_USER_EXIST,
      );

    const hashPass = await hashPasswordUtil(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashPass,
      },
    });

    return this.generateToken(
      {
        id: newUser.id,
        role: newUser.role,
        name,
        avatar: null,
        email: newUser.email,
      },
      userAgent,
      ipAddress,
    );
  }

  async singInCredentials(
    body: LoginDto,
    userAgent: Details,
    ipAddress: string,
    lang: Language,
  ): Promise<TokenType> {
    const { email, password } = body;

    const existUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        avatar: true,
        password: true,
        email: true,
        name: true,
        role: true,
        isBlocked: true,
      },
    });
    if (!existUser)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[lang].LOGIN_UNAUTHORIZED,
      );

    const { isBlocked, password: hash, ...user } = existUser;

    if (isBlocked)
      throw new CustomExceptionUtil(
        HttpStatus.UNAUTHORIZED,
        AuthErrorMessage[lang].USER_BLOCKED,
      );

    const isValidPass = await checkPassword(password, hash);
    if (!isValidPass)
      throw new CustomExceptionUtil(
        HttpStatus.FORBIDDEN,
        AuthErrorMessage[lang].LOGIN_UNAUTHORIZED,
      );

    return this.generateToken(user, userAgent, ipAddress);
  }

  async authGoogle(
    googleProfile: Pick<User, 'name' | 'avatar' | 'email'>,
    userAgent: Details,
    ipAddress: string,
  ): Promise<TokenType> {
    const existUser = await this.prisma.user.findFirst({
      where: {
        email: googleProfile.email,
      },
      select: {
        id: true,
        avatar: true,
        name: true,
        role: true,
        email: true,
      },
    });

    let newUser: Omit<TUserAuth, 'deviceId'>;

    if (!existUser) {
      const hashPass = await hashPasswordUtil(uuidv4());

      newUser = await this.prisma.user.create({
        data: {
          ...googleProfile,
          password: hashPass,
        },
        select: {
          id: true,
          role: true,
          avatar: true,
          name: true,
          email: true,
        },
      });
    }

    return this.generateToken(existUser || newUser, userAgent, ipAddress);
  }

  async logout(device: UserDevice): Promise<void> {
    await this.prisma.userDevice.delete({ where: { id: device.id } });
  }

  async refreshToken(
    user: TUserAuth,
    device: UserDevice,
    userAgent: Details,
    ipAddress: string,
  ): Promise<TokenType> {
    return this.generateToken(user, userAgent, ipAddress, device.id);
  }

  private async generateToken(
    payload: Omit<TUserAuth, 'deviceId'>,
    userAgent: Details,
    ipAddress: string,
    deviceId?: number,
  ): Promise<TokenType> {
    let idDevice = deviceId;
    if (!deviceId) {
      const device = await this.userDevicePrisma.add({
        userAgent,
        ipAddress,
        userId: payload.id,
      });
      idDevice = device.id;
    }

    const accessToken = this.jwtService.sign({
      ...payload,
      deviceId: idDevice,
    });
    const refreshToken = this.jwtService.sign(
      {
        ...payload,
        deviceId: idDevice,
      },
      {
        expiresIn: process.env.JWT_EXPIRE_REFRESH_TOKEN,
      },
    );

    await Promise.all([
      this.prisma.userDevice.update({
        where: {
          id: idDevice,
        },
        data: { accessToken, refreshToken },
      }),
      this.saveAuth({
        userId: payload.id,
        deviceId: idDevice,
        accessToken,
      }),
    ]);

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
