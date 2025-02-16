import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as process from 'process';

import { MainModule } from './main.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule, {
    logger: ['error', 'warn', 'log'],
    cors: {
      origin: ['*'],
      credentials: true,
    },
  });

  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.useGlobalFilters(new HttpExceptionFilter());

  if (Number(process.env.IS_SHOW_DOCS)) {
    const config = new DocumentBuilder()
      .setTitle('Debate documentation')
      .setDescription('Debate API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }

  const PORT = process.env.PORT_SERVER || 3000;

  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

bootstrap();
