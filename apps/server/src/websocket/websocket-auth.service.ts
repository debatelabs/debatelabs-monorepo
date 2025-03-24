import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

import { ProtectBaseAbstract } from '../common/middleware/auth/protect-base.abstract';
import { RedisService } from '../redis-io/redis.service';
import { RedisKey } from '../common/enum/redis-key.enum';
import { Language } from '../common/enum/language.enum';

@Injectable()
export class WebsocketAuthService extends ProtectBaseAbstract {
  constructor(
    jwtService: JwtService,
    private readonly redisService: RedisService,
    @InjectRedis()
    private readonly redisClient: Redis,
  ) {
    super(jwtService);
  }

  async authConnect(token: string, lang: Language): Promise<number> {
    try {
      const { deviceId, id: userId } = await this.verifyToken(token, lang);
      const isAuth = await this.redisService.checkTokenExists({
        deviceId,
        userId,
        token,
      });
      if (!isAuth) new Error();
      return userId;
    } catch {
      throw new WsException({
        status: 401,
        message: 'Not authorized',
      });
    }
  }

  async checkAuth(clientId: string) {
    const userId = await this.redisClient.get(
      `${RedisKey.CONNECTIONS_SOCKET}:${clientId}:user`,
    );
    if (!userId)
      throw new WsException({
        status: 401,
        message: 'Not authorized',
      });
  }
}
