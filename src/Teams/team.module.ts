import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from 'src/Users/entities/userProfile.entity';
import { Team } from './entities/team';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';


@Module({
  imports: [TypeOrmModule.forFeature([Team,UserProfile])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}