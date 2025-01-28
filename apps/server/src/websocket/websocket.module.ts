import { Module } from '@nestjs/common';

import { WebsocketGateway } from './websocket.gateway';
import { WebsocketAuthService } from './websocket-auth.service';
import { PrismaService } from '../prisma.service';
import { RedisIOModule } from '../redis-io/redis.module';

@Module({
  imports: [RedisIOModule],
  providers: [WebsocketGateway, WebsocketAuthService, PrismaService],
})
export class WebsocketModule {}
