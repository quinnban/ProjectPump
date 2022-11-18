import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common"
import { ExerciseService } from "./exercise.service"
import { ExerciseDto } from "./models/ExerciseDto"

@Controller('exercise')
export class ExerciseController {

  constructor(private exerciseService: ExerciseService){}

    @Get()
    findAll(): Promise<ExerciseDto[]> {
     return this.exerciseService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string): Promise<ExerciseDto> {
      return this.exerciseService.findOne(id);
    }

    @Post()
    create(@Body() exercise: ExerciseDto ): Promise<ExerciseDto>{
       return  this.exerciseService.create(exercise);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() exercise: ExerciseDto): Promise<ExerciseDto> {
      return  this.exerciseService.update(exercise);
    }

    @Get(':id/setup')
    setup(): Promise<void> {
      return this.exerciseService.setup();
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

}