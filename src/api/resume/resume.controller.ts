import {
  Body,
  // CacheInterceptor,
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
  // UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AutoCompleteService } from 'src/utils/autocomplete/autocomplete-redis';
import { GetUser } from 'src/utils/decorator/get-user.decorator';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ResumeDto } from './dto/resume.dto';
import { Resume } from './entity/resume.entity';
import { ResumeService } from './resume.service';


@Controller('resume')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard(), RolesGuard)
// @UseInterceptors(CacheInterceptor)
export class ResumeController {

  private logger = new Logger('ResumeController');

  constructor(private resumeService: ResumeService, private autocomplete: AutoCompleteService) { }

  @Get('/redis')
  async getRedis() {
    // const redis = await this.autocomplete.getClient();
    const addRes = await this.autocomplete.add('Hello world!', 100);
    this.logger.debug(addRes);
    // const redis = await AutocompleteService.getClient();
    let result = await this.autocomplete.get('He');
    this.logger.debug(result);
    return result;
  }

  @Get()
  @Roles('ADMIN')
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
