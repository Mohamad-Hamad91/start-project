import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeController } from './resume.controller';
import { Resume } from './entity/resume.entity';
import { ResumeService } from './resume.service';
import { AuthModule } from '../auth/auth.module';
import { AutoCompleteService } from 'src/utils/autocomplete/autocomplete-redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Resume]),
    AuthModule,
    CacheModule.register()
  ],
  controllers: [ResumeController],
  providers: [ResumeService, AutoCompleteService],
  exports: [ResumeService],
})
export class ResumeModule { }
