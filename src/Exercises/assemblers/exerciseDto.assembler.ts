import { Injectable } from "@nestjs/common";
import { Exercise } from "../entities/exercise.entity";
import { ExerciseDto } from "../models/ExerciseDto";

@Injectable()
export class ExerciseDtoAssembler {

    async assembleMany(exercises : Exercise []): Promise<ExerciseDto []>{
        const exerciseDtos : ExerciseDto[] = [];
        
       for(const exercise of exercises){
            const e = await this.assemble(exercise);
            exerciseDtos.push(e);
       }
        return Promise.resolve(exerciseDtos);
    }

    async assemble(exercise: Exercise): Promise<ExerciseDto> {
        const e = new ExerciseDto();
        e.id = exercise.id;
        e.category  = exercise.category;
        e.description = exercise.description;
        e.name = exercise.name;
       
        return Promise.resolve(e);
    }

    disassembleInto(from : ExerciseDto, to: Exercise): Exercise {
        to.name = from.name;
        to.category = from.category;
        to.description = from.description;
        return to;
    }
}