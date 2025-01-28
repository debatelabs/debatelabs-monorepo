import { RedisModuleOptions } from '@nestjs-modules/ioredis/dist/redis.interfaces';
import * as process from 'process';

export const redisConfig: RedisModuleOptions = {
  type: 'single',
  options: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || undefined,
  },
};
