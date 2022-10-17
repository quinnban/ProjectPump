import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from 'src/Users/models/createUserDto';
import { UpdateUserProfileDto } from 'src/Users/models/updateUserProfileDto';
import { Team } from './entities/team';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {

  constructor(private teamService: TeamService){}

    @Get()
    findAll(): Promise<Team[]> {
     return this.teamService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string): Promise<Team> {
      return this.teamService.findOne(id);
    }

    @Post()
    create(@Body() user: CreateUserDto): Promise<Team>{
       return Promise.resolve(Team.newInstace());
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUser: UpdateUserProfileDto ) {
      return `update user`;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

}