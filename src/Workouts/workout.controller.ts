import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common";
import { WorkoutDto } from "./models/workoutDto";
import { WorkoutService } from "./workout.service";

@Controller('workout')
export class WorkoutController {

  constructor(private workoutService: WorkoutService){}

    @Get()
    findAll(): Promise<WorkoutDto[]> {
     return this.workoutService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string): Promise<WorkoutDto> {
      return this.workoutService.findOne(id);
    }

    @Post()
    create(@Body() exercise: WorkoutDto ): Promise<WorkoutDto>{
       return  this.workoutService.create(exercise);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() exercise: WorkoutDto): Promise<WorkoutDto> {
      return  this.workoutService.update(exercise);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

}