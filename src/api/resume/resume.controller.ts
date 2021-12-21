import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ResumeDto } from './dto/resume.dto';
import { Resume } from './entity/resume.entity';
import { ResumeService } from './resume.service';

@Controller('resume')
@UsePipes(ValidationPipe)
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Get()
  get() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.resumeService.get();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<Resume> {
    // throw new Error('just kidding 😜');
    return this.resumeService.getOne(id);
  }

  @Post()
  create(@Body() resume: ResumeDto): Promise<Resume> {
    return this.resumeService.create(resume);
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
