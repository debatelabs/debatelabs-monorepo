import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

import { RedisKey } from '../common/enum/redis-key.enum';

@Injectable()
export class RedisService {
  constructor(
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  async saveAuthUser(payload: {
    userId: number;
    deviceId: number;
    accessToken: string;
    expiresIn: number;
  }) {
    const { deviceId, userId, accessToken, expiresIn } = payload;

    const ex = expiresIn - Math.floor(Date.now() / 1000) - 120;

    await this.redis.setex(
      `${RedisKey.AUTH}:${userId}:device:${deviceId}:token`,
      ex,
      accessToken,
    );
  }

  async checkTokenExists(param: {
    deviceId?: number;
    token: string;
    userId: number;
  }): Promise<boolean> {
    const { deviceId, userId, token } = param;
    if (deviceId) {
      const value = await this.redis.getex(
        `${RedisKey.AUTH}:${userId}:device:${deviceId}:token`,
      );
      return !(!value || value !== token);
    } else {
      const devices = await this.redis.smembers(
        `${RedisKey.AUTH}:${userId}:device`,
      );
      const tokens = await Promise.all(
        devices.map((device) => {
          return this.redis.getex(
            `${RedisKey.AUTH}:${userId}:device:${device}:token`,
          );
        }),
      );
      return tokens.includes(token);
    }
  }
}
