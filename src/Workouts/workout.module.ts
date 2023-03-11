import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseModule } from "src/Exercises/exersice.module";
import { WorkoutDtoAssembler } from "./assemblers/workoutDto.assembler";
import { Workout } from "./entites/workout.entity";
import { WorkoutController } from "./workout.controller";
import { WorkoutService } from "./workout.service";

const ASSEMBLERS = [WorkoutDtoAssembler]

@Module({
    imports: [TypeOrmModule.forFeature([Workout]),ExerciseModule,],
    controllers: [WorkoutController],
    providers: [WorkoutService,...ASSEMBLERS],
    exports:[WorkoutService,...ASSEMBLERS]
  })
  export class WorkoutModule {}