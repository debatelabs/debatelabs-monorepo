import { MiddlewareConsumer, Module } from '@nestjs/common';

import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { PrismaService } from '../../prisma.service';
import { ProtectAuthMiddleware } from '../../common/middleware/auth/protect-auth.middleware';

@Module({
  providers: [FriendshipService, PrismaService],
  controllers: [FriendshipController],
})
export class FriendshipModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectAuthMiddleware).forRoutes(FriendshipController);
  }
}
