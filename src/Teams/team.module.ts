import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseDetailDtoAssembler } from 'src/Exercises/assemblers/exerciseDetailsDto.assembler';
import { ExerciseDtoAssembler } from 'src/Exercises/assemblers/exerciseDto.assembler';
import { Exercise } from 'src/Exercises/entities/exercise.entity';
import { UserProfileDtoAssembler } from 'src/Users/assemblers/userProfileDto.assembler';
import { userTeamDtoAssembler } from 'src/Users/assemblers/userTeamDto.assembler';
import { UserProfile } from 'src/Users/entities/userProfile.entity';
import { WorkoutDtoAssembler } from 'src/Workouts/assemblers/workoutDto.assembler';
import { Workout } from 'src/Workouts/entites/workout.entity';
import { TeamDtoAssembler } from './assemblers/teamDto.assembler';
import { Team } from './entities/team';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamWorkoutController } from './teamWorkout.controller';
import { TeamWorkoutService } from './teamWorkout.service';

const ASSEMBLERS = [TeamDtoAssembler,UserProfileDtoAssembler,WorkoutDtoAssembler,userTeamDtoAssembler,ExerciseDetailDtoAssembler,ExerciseDtoAssembler];




@Module({
  imports: [TypeOrmModule.forFeature([Team,UserProfile,Exercise,Workout])],
  controllers: [TeamController,TeamWorkoutController],
  providers: [TeamService,TeamWorkoutService, ...ASSEMBLERS  ],
})
export class TeamModule {}