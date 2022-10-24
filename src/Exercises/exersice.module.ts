import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseService } from "./exercise.service";

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [],
    providers: [ExerciseService],
  })
  export class ExerciseModule {}