import { Injectable } from "@nestjs/common";
import { WorkoutExercise } from "../entities/workOutExerciseReps.entity";
import { ExerciseDetailDto } from "../models/ExerciseDetailDto";

@Injectable()
export class ExerciseDetailDtoAssembler {
    async assembleMany(exercises : WorkoutExercise []): Promise<ExerciseDetailDto []>{
        const exerciseDtos : ExerciseDetailDto[] = [];
        
       for(const exercise of exercises){
            const e = await this.assemble(exercise);
            exerciseDtos.push(e);
       }
        return Promise.resolve(exerciseDtos);
    }

    async assemble(exercise: WorkoutExercise): Promise<ExerciseDetailDto> {
        const e = new ExerciseDetailDto();
        e.id = exercise.id;
        e.exercise = await exercise.exercise;
        e.reps = exercise.reps;
        e.order = exercise.order;
        e.workoutId = exercise.workoutId;
        return Promise.resolve(e);
    }

    disassembleManyInto(froms : ExerciseDetailDto [], tos: WorkoutExercise []):  WorkoutExercise []{
        const exercises : WorkoutExercise[] = [];
        tos.forEach(to => {
            const from = froms.find(f => f.id === to.id);
            if(from){
                exercises.push(this.disassembleInto(from,to))
            }
        })
        return exercises;
    }

    disassembleInto(from : ExerciseDetailDto, to: WorkoutExercise): WorkoutExercise {
        to.order = from.order;
        to.reps = from.reps;
        return to;
    }
}