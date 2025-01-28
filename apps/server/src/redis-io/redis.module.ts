import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';

import { redisConfig } from '../config/redis.config';
import { RedisService } from './redis.service';

@Module({
  imports: [RedisModule.forRoot(redisConfig)],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisIOModule {}
