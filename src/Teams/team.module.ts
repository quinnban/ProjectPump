import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseModule } from 'src/Exercises/exersice.module';
import { UserProfile } from 'src/Users/entities/userProfile.entity';
import { UserModule } from 'src/Users/user.module';
import { Workout } from 'src/Workouts/entites/workout.entity';
import { WorkoutModule } from 'src/Workouts/workout.module';
import { TeamDtoAssembler } from './assemblers/teamDto.assembler';
import { Team } from './entities/team';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamWorkoutController } from './teamWorkout.controller';
import { TeamWorkoutService } from './teamWorkout.service';

const ASSEMBLERS = [TeamDtoAssembler];




@Module({
  imports: [
    TypeOrmModule.forFeature([Team,UserProfile,Workout]),
    forwardRef(()=>UserModule),
    ExerciseModule,
    WorkoutModule
  ],
  controllers: [TeamController,TeamWorkoutController],
  providers: [TeamService,TeamWorkoutService, ...ASSEMBLERS],
  exports:[TeamService,TeamWorkoutService, ...ASSEMBLERS]
})
export class TeamModule {}