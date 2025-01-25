import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { Details } from 'express-useragent';
import { UserDevice } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { TokenType } from '../../common/type/token.type';
import { RegisterDto } from './dto/register.dto';
import { CustomException } from '../../utils/custom-exception';
import { ResponseErrorEnum } from '../../common/enum/response-message.enum';
import { checkPassword, hashPassword } from '../../utils/hash-password';
import { UserDevicePrisma } from '../../prisma-extend/user-device-prisma';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userDevicePrisma: UserDevicePrisma,
    private readonly jwtService: JwtService,
  ) {}

  async singUpCredentials(
    body: RegisterDto,
    userAgent: Details,
    ipAddress: string,
  ): Promise<{
    email: string;
    firstName: string;
    lastName?: string;
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, password, ...names } = body;

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
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ResponseErrorEnum.REGISTER_USER_EXIST,
      );

    const hashPass = await hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        firstName: names.firstName,
        lastName: names.lastName,
        password: hashPass,
      },
    });

    const tokens = this.generateToken({ email, id: newUser.id });

    await this.userDevicePrisma.add({
      userAgent,
      ipAddress,
      tokens,
      userId: newUser.id,
    });
    return { email, ...names, ...tokens };
  }

  async singInCredentials(
    body: LoginDto,
    userAgent: Details,
    ipAddress: string,
  ): Promise<{
    email: string;
    firstName: string;
    lastName?: string;
    accessToken: string;
    refreshToken: string;
  }> {
    const { email, password } = body;

    const existUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
      },
    });
    if (!existUser)
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ResponseErrorEnum.LOGIN_UNAUTHORIZED,
      );

    const isValidPass = await checkPassword(password, existUser.password);
    if (!isValidPass)
      throw new CustomException(
        HttpStatus.UNAUTHORIZED,
        ResponseErrorEnum.LOGIN_UNAUTHORIZED,
      );

    const tokens = this.generateToken({ email, id: existUser.id });

    await this.userDevicePrisma.add({
      userAgent,
      ipAddress,
      tokens,
      userId: existUser.id,
    });

    return {
      email,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      ...tokens,
    };
  }

  async logout(device: UserDevice): Promise<void> {
    await this.prisma.userDevice.delete({ where: { id: device.id } });
  }

  private generateToken(payload: { email: string; id: number }): TokenType {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRE_REFRESH_TOKEN,
    });
    return { accessToken, refreshToken };
  }
}
