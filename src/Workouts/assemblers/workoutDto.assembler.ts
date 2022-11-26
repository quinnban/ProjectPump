import { Injectable } from "@nestjs/common";
import { ExerciseDetailDtoAssembler } from "src/Exercises/assemblers/exerciseDetailsDto.assembler";
import { Workout } from "../entites/workout.entity";
import { WorkoutDto } from "../models/workoutDto";

@Injectable()
export class WorkoutDtoAssembler {
    constructor(private exerciseDetailsAssembler: ExerciseDetailDtoAssembler){}

     assembleMany(workouts : Workout []): WorkoutDto[] {
        const workoutDtos : WorkoutDto[] = [];
        
       for(const workout of workouts){
            const w =  this.assemble(workout);
            workoutDtos.push(w);
       }
        return workoutDtos;
    }

     assemble(workout: Workout): WorkoutDto {
        const w = new WorkoutDto();
        w.id = workout.id;
        w.description = workout.description;
        w.name = workout.name;
        if(workout.exercises){
            w.exercises =  this.exerciseDetailsAssembler.assembleMany(workout.exercises)
        }
        return w;
    }

     async disassembleInto(from : WorkoutDto, to: Workout): Promise<Workout> {
        to.name = from.name;
        to.description = from.description;
        if(from.exercises){
            to.exercises = await this.exerciseDetailsAssembler.disassembleManyInto(from.exercises,to.exercises);
        }
        return to;
    }
}