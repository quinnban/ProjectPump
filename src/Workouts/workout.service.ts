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
        const workouts = await this.workoutRepository.find();
        return await this.workoutAssembler.assembleMany(workouts);
      }

      async findOne(id:string) : Promise<WorkoutDto>{
        const workout = await this.workoutRepository.findOne({
          where:{id},
          relations:{exercises:true}
        });
        if(!workout){
            throw new HttpException('Workout not found', HttpStatus.NOT_FOUND)
           }
        return await this.workoutAssembler.assemble(workout);
      }

      async update(id:string ,updatedWorkout: WorkoutDto): Promise<WorkoutDto> {
        const workout = await this.workoutRepository.findOne({
          where:{id},
          relations:{exercises:true}
        });
        if(!workout){
            throw new HttpException('Workout not found', HttpStatus.NOT_FOUND)
        }
        const result = await this.workoutRepository.save(await this.workoutAssembler.disassembleInto(updatedWorkout,workout));
        return await this.workoutAssembler.assemble(result);
     }

}