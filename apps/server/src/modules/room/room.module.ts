import { MiddlewareConsumer, Module } from '@nestjs/common';

import { RoomService } from './services/room.service';
import { ProtectAuthMiddleware } from '../../common/middleware/auth/protect-auth.middleware';
import { CrudRoomController } from './controllers/crud-room.controller';
import { MembersRoomController } from './controllers/members-room.controller';
import { MembersRoomService } from './services/member-room.service';

@Module({
  imports: [],
  providers: [RoomService, MembersRoomService],
  controllers: [CrudRoomController, MembersRoomController],
})
export class RoomModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProtectAuthMiddleware)
      .forRoutes(CrudRoomController, MembersRoomController);
  }
}
