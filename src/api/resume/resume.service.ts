import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResumeDto } from './dto/resume.dto';
import { Resume } from './entity/resume.entity';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private resumeRepository: Repository<Resume>,
  ) {}

  async get() {
    return await this.resumeRepository.findAndCount();
  }

  async getOne(id: string): Promise<Resume> {
    return await this.resumeRepository.findOne(id);
  }

  async create(resume: ResumeDto): Promise<Resume> {
    const temp = this.resumeRepository.create(resume);
    // because of open issue #1980 in typeORM
    temp.employmentHistory = resume.employmentHistory ?? [];
    temp.courses = resume.courses ?? [];
    temp.education = resume.education ?? [];
    temp.links = resume.links ?? [];
    temp.projects = resume.projects ?? [];
    temp.references = resume.references ?? [];
    temp.languages = resume.languages ?? [];
    temp.skills = resume.skills ?? [];
    return await temp.save();
  }

  async update(id: string, resume: ResumeDto): Promise<Resume> {
    await this.resumeRepository.update(id, resume);
    return await this.resumeRepository.findOne(id);
  }

  async delete(id: string): Promise<number> {
    return (await this.resumeRepository.delete(id))?.affected;
  }
}
