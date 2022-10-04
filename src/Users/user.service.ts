
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user';
import { CreateUserDto } from './models/createUserDto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
      ) {}

      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }

      async create(user: CreateUserDto): Promise<User>{
        const createdUser = this.usersRepository.create(user);
        return this.usersRepository.save(createdUser);
      }
  
}