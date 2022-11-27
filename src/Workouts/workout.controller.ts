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
    create(@Body() workout: WorkoutDto ): Promise<WorkoutDto>{
       return  this.workoutService.create(workout);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() workout: WorkoutDto): Promise<WorkoutDto> {
      return  this.workoutService.update(id,workout);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

    @Get(':id/setup')
    setup(){
      this.workoutService.setup();
    }

}