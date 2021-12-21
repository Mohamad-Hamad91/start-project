import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './utils/logger/errors.interceptor';
import { MyLogger } from './utils/logger/my-logger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    // logger: new MyLogger();,
    logger: false
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const myLogger = app.get(MyLogger);
  app.useLogger(myLogger);
  // app.useGlobalInterceptors(app.get(ErrorsInterceptor));
  await app.listen(port);
  myLogger.log(`server started and listening on port: ${port}`);
}
bootstrap();


