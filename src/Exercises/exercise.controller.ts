import { Controller, Get, Param, Post, Body, Put, Delete } from "@nestjs/common"
import { CreateTeamDto } from "src/Teams/models/createTeamDto"
import { UpdateTeamDto } from "src/Teams/models/updateTeamDto"
import { ExerciseService } from "./exercise.service"
import { ExerciseDto } from "./models/ExerciseDto"

@Controller('exercise')
export class ExerciseController {

  constructor(private exerciseService: ExerciseService){}

    @Get()
    findAll(): Promise<ExerciseDto[]> {
     return Promise.resolve([]);
    }

    @Get(':id')
    findOneById(@Param('id') id: string): Promise<ExerciseDto> {
      return Promise.resolve(new ExerciseDto());
    }

    @Post()
    create(@Body() team: CreateTeamDto): Promise<ExerciseDto>{
       return  Promise.resolve(new ExerciseDto());
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatedTeam: UpdateTeamDto): Promise<ExerciseDto> {
      return  Promise.resolve(new ExerciseDto());
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

}