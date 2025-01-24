import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { Details } from 'express-useragent';

import { PrismaService } from '../../prisma.service';
import { TokenType } from '../../common/type/token.type';
import { RegisterDto } from './dto/register.dto';
import { CustomException } from '../../utils/custom-exception';
import { ResponseErrorEnum } from '../../common/enum/response-message.enum';
import { hashPassword } from '../../utils/hash-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async singUpCredentials(
    body: RegisterDto,
    userAgent: Details,
    ipAddress: string,
  ) {
    const { email, password, ...names } = body;
    const deviceModel = `${userAgent.platform} ${userAgent.os} ${userAgent.browser}`;

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

    console.log('userAgent', userAgent);
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

    await this.prisma.userDevice.create({
      data: {
        name: deviceModel,
        ...tokens,
        ipAddress,
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });
    return { email, ...names, ...tokens };
  }

  private generateToken(payload: { email: string; id: number }): TokenType {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRE_REFRESH_TOKEN,
    });
    return { accessToken, refreshToken };
  }
}
