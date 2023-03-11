import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExerciseService } from "src/Exercises/exercise.service";
import { ExerciseDetailDto } from "src/Exercises/models/ExerciseDetailDto";
import { Repository } from "typeorm";
import { WorkoutDtoAssembler } from "./assemblers/workoutDto.assembler";
import { Workout } from "./entites/workout.entity";
import { WorkoutDto } from "./models/workoutDto";

@Injectable()
export class WorkoutService {
    constructor(
        @InjectRepository(Workout) private workoutRepository: Repository<Workout>,
        private workoutAssembler: WorkoutDtoAssembler,
        private exerciseService: ExerciseService
      ) {}

      async create(workout: WorkoutDto): Promise<WorkoutDto> {
        const w = Workout.newInstance();
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


     async setup(): Promise<void> {
      console.log('SETUP WORKOUTS');
      const exercises = await this.exerciseService.findAll();
      for(let x = 0; x < 10; x++){
        let workout = new WorkoutDto();
        const workoutExercises: ExerciseDetailDto [] = [];
        workout.name = "workout " + x;
        for(let i = 0; i < Math.floor( Math.random() * 10);i++){
          let exerciseDetail = new ExerciseDetailDto();
          exerciseDetail.exercise = exercises[Math.floor( Math.random() * exercises.length)];
          exerciseDetail.order = i;
          exerciseDetail.reps = [8,5,3]
          workoutExercises.push(exerciseDetail);
        }
        workout.exercises = workoutExercises;
        console.log(workout);
        await this.create(workout);
      }
      
     }

}