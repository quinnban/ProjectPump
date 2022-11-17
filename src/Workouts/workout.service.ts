import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WorkoutDtoAssembler } from "./assemblers/workoutDto.assembler";
import { Workout } from "./entites/workout.entity";
import { WorkoutDto } from "./models/workoutDto";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout) private workoutRepository: Repository<Workout>,
        private workoutAssembler: WorkoutDtoAssembler
      ) {}

      async create(workout: WorkoutDto): Promise<WorkoutDto> {
        const w = Workout.newInstace();
        const result = await this.workoutRepository.save(await this.workoutAssembler.disassembleInto(workout,w));
        return await this.workoutAssembler.assemble(result);
      }

      async findAll() : Promise<WorkoutDto []>{
        const exercises = await this.workoutRepository.find();
        return await this.workoutAssembler.assembleMany(exercises);
      }

      async findOne(id:string) : Promise<WorkoutDto>{
        const exercise = await this.workoutRepository.findOneBy({id:id});
        if(!exercise){
            throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND)
           }
        return await this.workoutAssembler.assemble(exercise);
      }

      async update(updatedWorkout: WorkoutDto): Promise<WorkoutDto> {
        const exercise = await this.workoutRepository.findOneBy({id:updatedWorkout.id});
        if(!exercise){
            throw new HttpException('Exercise not found', HttpStatus.NOT_FOUND)
        }
        const result = await this.workoutRepository.save(await this.workoutAssembler.disassembleInto(updatedWorkout,exercise));
        return await this.workoutAssembler.assemble(result);
     }

}