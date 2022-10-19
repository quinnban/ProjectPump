import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateUserProfileDtoAssembler } from './assemblers/updateUserProfileDto.assembler';
import { UserProfileDtoAssembler } from './assemblers/userProfileDto.assembler';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [TypeOrmModule.forFeature([User,UserProfile])],
  controllers: [UserController],
  providers: [UserService,UserProfileDtoAssembler,UpdateUserProfileDtoAssembler],
})
export class UserModule {}