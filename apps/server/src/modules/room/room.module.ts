import { MiddlewareConsumer, Module } from '@nestjs/common';

import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { ProtectAuthMiddleware } from '../../common/middleware/auth/protect-auth.middleware';

@Module({
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectAuthMiddleware).forRoutes(RoomController);
  }
}
