
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { CreateUserDto } from './models/createUserDto';
import * as bcrypt from 'bcrypt';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { UploadPictureDto } from './models/uploadProfilePictureDto';
import { UploadPictureDtoAssembler } from './assemblers/UploadPictureDto.assembler';
import { UserProfileDtoAssembler } from './assemblers/userProfileDto.assembler';
import { UserProfileDto } from './models/userProfileDto';



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(UserProfile) private usersProfileRepository: Repository<UserProfile>,
        @InjectAwsService(S3) private readonly s3: S3,
        private userProfileAssembler: UserProfileDtoAssembler,
        private uploadPictureDtoAssembler: UploadPictureDtoAssembler
      ) {}

      async findAll(): Promise<UserProfileDto[]> {
        const users = await this.usersProfileRepository.find();
        return this.userProfileAssembler.assembleMany(users);
      }
    
      findOne(id: string): Promise<UserProfile> {
        return this.usersProfileRepository.findOneBy({id});
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

      async update(id:string, updatedUser: UserProfileDto): Promise<UserProfileDto> {

          const user = await this.usersProfileRepository.findOneBy({id});
          if(!user){
            throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
          }
          const profile = this.userProfileAssembler.disassembleInto(updatedUser,user);
          const updatedProfile = await this.usersProfileRepository.save(profile);
          return this.userProfileAssembler.assemble(updatedProfile);
      }

      updateProfilePicture(id: string): Promise<UploadPictureDto> {
        this.findOne(id);
        const Key = uuidv4();
        const Bucket = "project-pump-dev-pictures";
        const Fields =  {key: Key +'.png', 'Content-Type': 'image/png'};
        const responce = this.s3.createPresignedPost({ Bucket, Fields });
        console.log(responce);
        return Promise.resolve(this.uploadPictureDtoAssembler.assemble(Key,responce));
      }

      async getPictureUrl(key): Promise<string> {
        const Bucket = "project-pump-dev-pictures";
        console.log(key.key);
        const responce = await this.s3.getSignedUrlPromise('getObject',{Bucket,Key:key.key})
        console.log(responce);
        return responce
      }
}