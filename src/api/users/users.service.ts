import { BadRequestException, ConflictException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async findOne(email: string) {
        return await this.userRepository.findOne({ email });
    }

    async create(user: RegisterDto) {
        const result = this.userRepository.create(user);
        try {
            await result.save();
        } catch (e) {
            if (e.code == 11000) {
                throw new BadRequestException('Email already exists');

            }
        }
    }

}
