import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Exercise } from "../entities/exercise.entity";
import { WorkoutExercise } from "../entities/workOutExerciseReps.entity";
import { ExerciseDetailDto } from "../models/ExerciseDetailDto";
import { ExerciseDtoAssembler } from "./exerciseDto.assembler";

@Injectable()
export class ExerciseDetailDtoAssembler {
    constructor(private exerciseDtoAssembler: ExerciseDtoAssembler,
                @InjectRepository(Exercise) private exerciseRepository: Repository<Exercise>){}

     assembleMany(exercises : WorkoutExercise []): ExerciseDetailDto []{
        const exerciseDtos : ExerciseDetailDto[] = [];
        
       for(const exercise of exercises){
            const e = this.assemble(exercise);
            exerciseDtos.push(e);
       }
        return exerciseDtos;
    }

     assemble(exercise: WorkoutExercise): ExerciseDetailDto {
        const e = new ExerciseDetailDto();
        e.id = exercise.id;
        e.exercise =  this.exerciseDtoAssembler.assemble(exercise.exercise);
        e.reps = exercise.reps;
        e.order = exercise.order;
        e.workoutId = exercise.workoutId;
        e.exerciseId = exercise.exerciseId;
        return e;
    }

    async disassembleManyInto(froms : ExerciseDetailDto [], tos: WorkoutExercise []):  Promise<WorkoutExercise[]>{
        const exercises : WorkoutExercise[] = [];
        for(const from of froms){
            const exerciseDetail = tos ? tos.find(t => t.id === from.id) : false;
            if(exerciseDetail){
                exercises.push( await this.disassembleInto(from,exerciseDetail))
            } else {
                const newExercise =  WorkoutExercise.newInstace();
                exercises.push(await this.disassembleInto(from,newExercise))
            }
        }
        return exercises;
    }

    async disassembleInto(from : ExerciseDetailDto, to: WorkoutExercise): Promise<WorkoutExercise> {
        console.log(from, to)
        to.order = from.order;
        to.reps = from.reps;
        const exercies = await  this.findExercise(from.exerciseId);
        to.exercise =  exercies;
        return to;
    }

    private async findExercise(id:string): Promise<Exercise>{
        const exercise = await this.exerciseRepository.findOneBy({id});
        if(!exercise){
            throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND)
        }
        return exercise;
    }
}