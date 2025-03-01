import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserAgentMiddleware } from '../../common/middleware/user-agent.middleware';
import { UserDevicePrisma } from '../../prisma-extend/user-device-prisma';
import { ProtectRefreshMiddleware } from '../../common/middleware/auth/protect-refresh.middleware';
import { RedisIOModule } from '../../redis-io/redis.module';

@Module({
  imports: [RedisIOModule],
  providers: [AuthService, UserDevicePrisma],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ProtectRefreshMiddleware).forRoutes(
      {
        path: '/auth/refresh',
        method: RequestMethod.GET,
      },
      {
        path: '/auth/logout',
        method: RequestMethod.GET,
      },
    );

    consumer.apply(UserAgentMiddleware).forRoutes(
      {
        path: '/auth/register',
        method: RequestMethod.POST,
      },
      {
        path: '/auth/login',
        method: RequestMethod.POST,
      },
      {
        path: '/auth/refresh',
        method: RequestMethod.GET,
      },
    );
  }
}
