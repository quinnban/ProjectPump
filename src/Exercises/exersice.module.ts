import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseDetailDtoAssembler } from "./assemblers/exerciseDetailsDto.assembler";
import { ExerciseDtoAssembler } from "./assemblers/exerciseDto.assembler";
import { Exercise } from "./entities/exercise.entity";
import { WorkoutExercise } from "./entities/workOutExerciseReps.entity";
import { ExerciseService } from "./exercise.service";

@Module({
    imports: [TypeOrmModule.forFeature([Exercise,WorkoutExercise])],
    controllers: [],
    providers: [ExerciseService, ExerciseDetailDtoAssembler, ExerciseDtoAssembler],
  })
  export class ExerciseModule {}