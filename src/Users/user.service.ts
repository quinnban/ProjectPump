
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { CreateUserDto } from './models/createUserDto';
import * as bcrypt from 'bcrypt';
import { UpdateUserProfileDtoAssembler } from './assemblers/updateUserProfileDto.assembler';
import { UpdateUserProfileDto } from './models/updateUserProfileDto';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(UserProfile) private usersProfileRepository: Repository<UserProfile>,
        @InjectAwsService(S3) private readonly s3: S3,
        private userProfileAssembler: UpdateUserProfileDtoAssembler
      ) {}

      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findOne(id: string): Promise<User> {
        return this.usersRepository.findOneBy({id});
      }
    
      async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
      }

      async create(user: CreateUserDto): Promise<User>{
        const createdUser = User.newInstace();
         const profile = UserProfile.newInstace();
         createdUser.profile = profile;
         await this.usersProfileRepository.save(profile);

        createdUser.email = user.email;
        createdUser.password = bcrypt.hashSync(user.password, 10);

        return this.usersRepository.save(createdUser);
      }

      async update(id:string, updatedUser: UpdateUserProfileDto): Promise<UserProfile> {

          const user = await this.usersProfileRepository.findOneBy({id});
          if(!user){
            throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
          }
          
          const profile = this.userProfileAssembler.disasemblyInto(updatedUser);

          return this.usersProfileRepository.save(profile);
      }

       async updateProfilePicture(): Promise<S3.PresignedPost> {
        const Bucket = "project-pump-dev-pictures";
         return await this.s3.createPresignedPost({ Bucket})
      }
}