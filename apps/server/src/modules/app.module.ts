import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FriendshipModule } from './friendship/friendship.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, FriendshipModule, UserModule],
})
export class AppModule {}
