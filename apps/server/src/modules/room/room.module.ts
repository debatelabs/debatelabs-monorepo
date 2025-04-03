import { MiddlewareConsumer, Module } from '@nestjs/common';

import { RoomService } from './services/room.service';
import { ProtectAuthMiddleware } from '../../common/middleware/auth/protect-auth.middleware';
import { CrudRoomController } from './controllers/crud-room.controller';
import { MembersRoomController } from './controllers/members-room.controller';
import { MembersRoomService } from './services/member-room.service';
import { TeamRoomController } from './controllers/team-room.controller';
import { TeamRoomService } from './services/team-room.service';

@Module({
  imports: [],
  providers: [RoomService, MembersRoomService, TeamRoomService],
  controllers: [CrudRoomController, MembersRoomController, TeamRoomController],
})
export class RoomModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProtectAuthMiddleware)
      .forRoutes(CrudRoomController, MembersRoomController, TeamRoomController);
  }
}
