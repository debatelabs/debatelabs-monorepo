import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [AuthModule, FriendshipModule],
})
export class AppModule {}
