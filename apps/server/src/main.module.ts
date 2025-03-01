import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { jwtConfig } from './config/jwt.config';
import { AppModule } from './modules/app.module';
import { PrismaService } from './prisma.service';
import { WebsocketModule } from './websocket/websocket.module';
import { RedisIOModule } from './redis-io/redis.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register(jwtConfig),
    EventEmitterModule.forRoot(),
    AppModule,
    WebsocketModule,
    RedisIOModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class MainModule {}
