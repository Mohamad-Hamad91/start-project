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
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: config.get('DB_TYPE'),
        host: config.get('DB_HOST'),
        url: config.get('DB_URL'),
        // port: +config.get<number>('DB_PORT'),
        // username: config.get('DB_USERNAME'),
        // password: config.get('DB_PASSWORD'),
        // database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: config.get('DB_SYNC'),
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }
    ),// the configuration was taken from the file ormconfig.json at the root directory
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
