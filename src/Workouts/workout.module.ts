import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseDetailDtoAssembler } from "src/Exercises/assemblers/exerciseDetailsDto.assembler";
import { WorkoutExercise } from "src/Exercises/entities/workOutExerciseReps.entity";
import { WorkoutDtoAssembler } from "./assemblers/workoutDto.assembler";
import { Workout } from "./entites/workout.entity";
import { WorkoutController } from "./workout.controller";
import { WorkoutService } from "./workout.service";

@Module({
    imports: [TypeOrmModule.forFeature([Workout,WorkoutExercise])],
    controllers: [WorkoutController],
    providers: [WorkoutService,WorkoutDtoAssembler,ExerciseDetailDtoAssembler],
  })
  export class WorkoutModule {}