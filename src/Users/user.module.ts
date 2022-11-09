import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadPictureDtoAssembler } from './assemblers/UploadPictureDto.assembler';
import { UserProfileDtoAssembler } from './assemblers/userProfileDto.assembler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/userProfile.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [TypeOrmModule.forFeature([User,UserProfile]), 
  JwtModule.register({ secret: 'hard!to-guess_secret',signOptions:{expiresIn: '1d'} })],
  controllers: [UserController,AuthController],
  providers: [UserService,UserProfileDtoAssembler,UploadPictureDtoAssembler,AuthService],
})
export class UserModule {}