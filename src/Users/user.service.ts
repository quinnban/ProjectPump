
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
import { UploadPictureDto } from './models/uploadPictureDto';
import { UploadPictureDtoAssembler } from './assemblers/UploadPictureDto.assembler';
import { UserProfileDtoAssembler } from './assemblers/userProfileDto.assembler';
import { UserProfileDto } from './models/userProfileDto';
import { TeamWorkoutService } from 'src/Teams/teamWorkout.service';
import { WorkoutDto } from 'src/Workouts/models/workoutDto';



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(UserProfile) private usersProfileRepository: Repository<UserProfile>,
        @InjectAwsService(S3) private readonly s3: S3,
        private userProfileAssembler: UserProfileDtoAssembler,
        private uploadPictureDtoAssembler: UploadPictureDtoAssembler,
        private teamWorkoutService: TeamWorkoutService
      ) {}

      async findAll(): Promise<UserProfileDto[]> {
        const users = await this.usersProfileRepository.find();
        return this.userProfileAssembler.assembleMany(users);
      }
    
      async findOne(id: string): Promise<UserProfileDto> {
        const user =  await this.usersProfileRepository.findOne({
          where: {id},
          relations:{teams:true}
        });
        return this.userProfileAssembler.assemble(user);
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

        const user =  await this.usersProfileRepository.findOneBy({id});
          if(!user){
            throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
          }
          const profile = this.userProfileAssembler.disassembleInto(updatedUser,user);
          const updatedProfile = await this.usersProfileRepository.save(profile);
          return this.userProfileAssembler.assemble(updatedProfile);
      }

      async updateProfilePicture(id: string): Promise<UploadPictureDto> {
        const user = await this.findOne(id);
        if(!user){
          throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
        }
        let Key = uuidv4();
        if(user.pictureURl === null){
          Key = user.pictureURl;
        }
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

      async getWorkoutsByProfileId(id: string): Promise<WorkoutDto []>{
        const user = await this.findOne(id);
        if(!user){
          throw new HttpException('Profile not found', HttpStatus.NOT_FOUND)
        }
        return await this.teamWorkoutService.findWorkoutsByTeamId(user.teams.map(team => team.id));
      }

      async setup(): Promise<void> {
        let tempUser: User;
          const user1 = new CreateUserDto();
          user1.email = 'abc@123.com';
          user1.password = 'qwerty123';
          tempUser = await this.create(user1);
      
          const updateUser1 = new UserProfileDto();
          updateUser1.firstName = 'jimbo';
          updateUser1.lastName = 'slice';
          updateUser1.id = tempUser.profileId;
          await this.update(updateUser1.id,updateUser1);
      
          const user2 = new CreateUserDto();
          user2.email = '123@abc.com';
          user2.password = 'qwerty123';
          tempUser = await this.create(user2);
      
          const updateUser2 = new UserProfileDto();
          updateUser2.firstName = 'jam';
          updateUser2.lastName = 'slice';
          updateUser2.id = tempUser.profileId;
          await this.update(updateUser2.id,updateUser2);
      
          const user3 = new CreateUserDto();
          user3.email = 'qwerty@123.com';
          user3.password = 'qwerty123';
          tempUser = await this.create(user3);
      
          const updateUser3 = new UserProfileDto();
          updateUser3.firstName = 'jimmy';
          updateUser3.lastName = 'slice';
          updateUser3.id = tempUser.profileId;
          await this.update(updateUser3.id,updateUser3);
      
          const user4 = new CreateUserDto();
          user4.email = 'aqws@abc.com';
          user4.password = 'qwerty123';
          tempUser = await this.create(user4);
      
          const updateUser4 = new UserProfileDto();
          updateUser4.firstName = 'jane';
          updateUser4.lastName = 'slim';
          updateUser4.id = tempUser.profileId;
          await this.update(updateUser4.id,updateUser4);
      
          const user5 = new CreateUserDto();
          user5.email = 'iopi@123.com';
          user5.password = 'qwerty123';
          tempUser = await this.create(user5);
      
          const updateUser5 = new UserProfileDto();
          updateUser5.firstName = 'jamie';
          updateUser5.lastName = 'slim';
          updateUser5.id = tempUser.profileId;
          await this.update(updateUser5.id,updateUser5);
      
          const user6 = new CreateUserDto();
          user6.email = 'ajkljs@abc.com';
          user6.password = 'qwerty123';
          tempUser = await this.create(user6);
      
          const updateUser6 = new UserProfileDto();
          updateUser6.firstName = 'jenny';
          updateUser6.lastName = 'slim';
          updateUser6.id = tempUser.profileId;
          await this.update(updateUser6.id,updateUser6);
      }

}