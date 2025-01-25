import { Injectable } from '@nestjs/common';
import { Details } from 'express-useragent';
import { Prisma, UserDevice } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { TokenType } from '../common/type/token.type';

@Injectable()
export class UserDevicePrisma {
  constructor(private readonly prisma: PrismaService) {}

  async add(params: {
    userAgent: Details;
    tokens: TokenType;
    userId: number;
    ipAddress: string;
  }): Promise<UserDevice> {
    const { userAgent, userId, tokens, ipAddress } = params;
    const details = {
      platform: userAgent.platform,
      os: userAgent.os,
      browser: userAgent.browser,
      version: userAgent.version,
    } as Prisma.JsonObject;

    return this.prisma.userDevice.create({
      data: {
        ...tokens,
        ipAddress,
        details,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
