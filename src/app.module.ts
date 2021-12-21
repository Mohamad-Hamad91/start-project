import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';
import { Resume } from './api/resume/entity/resume.entity';
import { ResumeModule } from './api/resume/resume.module';
import { SearchModule } from './api/search/search.module';
import { HttpLoggerMiddleware } from './utils/logger/http-logger';
import { MailModule } from './utils/mail/mail.module';
import { LoggerModule } from './utils/logger/logger.module';
import { ConsoleModule } from 'nestjs-console';
import { SeedService } from './console/seed.service';
import { UsersModule } from './api/users/users.module';
import { User } from './api/users/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    AuthModule,
    ResumeModule,
    SearchModule,
    TypeOrmModule.forRoot(),// the configuration was taken from the file ormconfig.json at the root directory
    MailModule,
    LoggerModule,
    ConsoleModule,
    UsersModule
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes('*');
  }
}
