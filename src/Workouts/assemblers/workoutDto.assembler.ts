import { Injectable } from "@nestjs/common";
import { ExerciseDetailDtoAssembler } from "src/Exercises/assemblers/exerciseDetailsDto.assembler";
import { Workout } from "../entites/workout.entity";
import { WorkoutDto } from "../models/workoutDto";

@Injectable()
export class WorkoutDtoAssembler {
    constructor(private exerciseDetailsAssembler: ExerciseDetailDtoAssembler){}

    async assembleMany(workouts : Workout []): Promise<WorkoutDto[]>{
        const workoutDtos : WorkoutDto[] = [];
        
       for(const workout of workouts){
            const w = await this.assemble(workout);
            workoutDtos.push(w);
       }
        return Promise.resolve(workoutDtos);
    }

    async assemble(workout: Workout): Promise<WorkoutDto> {
        const w = new WorkoutDto();
        w.id = workout.id;
        w.description = workout.description;
        w.name = workout.name;
        const exercies = await workout.exercises;
        w.exercies = await this.exerciseDetailsAssembler.assembleMany(exercies)
        return Promise.resolve(w);
    }

    async disassembleInto(from : WorkoutDto, to: Workout): Promise<Workout> {
        to.name = from.name;
        to.description = to.description;
        const exercies = await to.exercises;
        to.exercises = Promise.resolve(this.exerciseDetailsAssembler.disassembleManyInto(from.exercies,exercies));
        return to;
    }
}