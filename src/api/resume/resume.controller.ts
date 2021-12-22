import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/utils/decorator/get-user.decorator';
import { User } from '../users/entity/user.entity';
import { ResumeDto } from './dto/resume.dto';
import { Resume } from './entity/resume.entity';
import { ResumeService } from './resume.service';

@Controller('resume')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard())
export class ResumeController {

  private logger = new Logger('ResumeController');

  constructor(private resumeService: ResumeService) { }

  @Get()
  get() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    this.logger.verbose('getting resumes!');
    return this.resumeService.get();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<Resume> {
    // throw new Error('just kidding 😜');
    return this.resumeService.getOne(id);
  }

  @Post()
  create(@GetUser() user, @Body() resume: ResumeDto): Promise<Resume> {
    return this.resumeService.create(resume, user.id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() resume: ResumeDto): Promise<Resume> {
    return this.resumeService.update(id, resume);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.resumeService.delete(id);
  }
}
