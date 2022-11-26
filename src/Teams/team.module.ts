import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileDtoAssembler } from 'src/Users/assemblers/userProfileDto.assembler';
import { userTeamDtoAssembler } from 'src/Users/assemblers/userTeamDto.assembler';
import { UserProfile } from 'src/Users/entities/userProfile.entity';
import { TeamDtoAssembler } from './assemblers/teamDto.assembler';
import { Team } from './entities/team';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';


@Module({
  imports: [TypeOrmModule.forFeature([Team,UserProfile])],
  controllers: [TeamController],
  providers: [TeamService,TeamDtoAssembler, UserProfileDtoAssembler,userTeamDtoAssembler],
})
export class TeamModule {}