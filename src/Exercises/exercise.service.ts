import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { readFileSync } from "fs";
import { Repository } from "typeorm";
import { Exercise } from "./entities/exercise.entity";
import * as Papa from "papaparse";
import { ExerciseDto } from "./models/ExerciseDto";
import { ExerciseDtoAssembler } from "./assemblers/exerciseDto.assembler";
import * as path from "path";

@Injectable()
export class ExerciseService {
    constructor(
        @InjectRepository(Exercise) private exerciseRepository: Repository<Exercise>,
        private exerciseAssembler: ExerciseDtoAssembler
      ) {}

      async create(exercise: ExerciseDto): Promise<ExerciseDto> {
        const e = Exercise.newInstace();
        const result = await this.exerciseRepository.save(this.exerciseAssembler.disassembleInto(exercise,e));
        return await this.exerciseAssembler.assemble(result);
      }

      async findAll() : Promise<ExerciseDto []>{
        const exercises = await this.exerciseRepository.find();
        return await this.exerciseAssembler.assembleMany(exercises);
      }

      async findOne(id:string) : Promise<ExerciseDto>{
        const exercise = await this.exerciseRepository.findOneBy({id:id});
        if(!exercise){
            throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND)
           }
        return await this.exerciseAssembler.assemble(exercise);
      }

      async update(updatedExercise: ExerciseDto): Promise<ExerciseDto> {
        const exercise = await this.exerciseRepository.findOneBy({id:updatedExercise.id});
        if(!exercise){
            throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND)
        }
        const result = await this.exerciseRepository.save(this.exerciseAssembler.disassembleInto(updatedExercise,exercise));
        return await this.exerciseAssembler.assemble(result);
     }

      async setup(): Promise<void> {
        const dir = path.resolve('./setup/exerciseList.csv');
        const csv = readFileSync(dir);
        const csvData = csv.toString();
        const data = await Papa.parse(csvData);
        data.data.forEach(async row => {
            const exercise = Exercise.newInstace(); 
            exercise.category = row[0];
            exercise.name = row[1];
            await this.exerciseRepository.save(exercise);
        });
        
      }

}