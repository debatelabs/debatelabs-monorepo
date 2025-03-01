import { MiddlewareConsumer, Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProtectAuthMiddleware } from '../../common/middleware/auth/protect-auth.middleware';
import { FileModule } from '../../utils/file/file.module';

@Module({
  imports: [FileModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectAuthMiddleware).forRoutes(UserController);
  }
}
