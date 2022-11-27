import { forwardRef, Module } from '@nestjs/common';
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
import { UserTeamDtoAssembler } from './assemblers/userTeamDto.assembler';
import { TeamWorkoutService } from 'src/Teams/teamWorkout.service';
import { TeamModule } from 'src/Teams/team.module';


const ASSEMBLERS = [UserProfileDtoAssembler,UploadPictureDtoAssembler,UserTeamDtoAssembler]

@Module({
  imports: [TypeOrmModule.forFeature([User,UserProfile]), 
  JwtModule.register({ secret: 'hard!to-guess_secret',signOptions:{expiresIn: '1d'} }), forwardRef(() =>TeamModule)],
  controllers: [UserController,AuthController],
  providers: [UserService,AuthService, ...ASSEMBLERS],
  exports:[UserService, ...ASSEMBLERS]
})
export class UserModule {}