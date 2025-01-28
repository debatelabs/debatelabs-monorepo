import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';

import { ProtectBaseAbstract } from '../common/middleware/auth/protect-base.abstract';
import { RedisService } from '../redis-io/redis.service';

@Injectable()
export class WebsocketAuthService extends ProtectBaseAbstract {
  constructor(
    jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {
    super(jwtService);
  }

  async authConnect(token: string): Promise<number> {
    try {
      const { deviceId, id: userId } = await this.verifyToken(token);
      const isAuth = await this.redisService.checkTokenExists({
        deviceId,
        userId,
        token,
      });
      if (!isAuth) new Error();
      return userId;
    } catch {
      throw new WsException('Not authorized');
    }
  }
}
