import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadPictureDtoAssembler } from './assemblers/UploadPictureDto.assembler';
import { UserProfileDtoAssembler } from './assemblers/userProfileDto.assembler';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [TypeOrmModule.forFeature([User,UserProfile])],
  controllers: [UserController],
  providers: [UserService,UserProfileDtoAssembler,UploadPictureDtoAssembler ],
})
export class UserModule {}