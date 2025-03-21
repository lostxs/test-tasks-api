import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { CoreModule } from './core/core.module';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.getOrThrow<number>('PORT');
  await app.listen(port);

  Logger.log(`🚀 Application is running on: ${await app.getUrl()})`);
}
void bootstrap();
