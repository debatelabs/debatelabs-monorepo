import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { jwtConfig } from './config/jwt.config';
import { AppModule } from './modules/app.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register(jwtConfig),
    AppModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class MainModule {}
