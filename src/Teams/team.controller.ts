import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTeamDto } from './models/createTeamDto';
import { TeamDto } from './models/teamDto';
import { UpdateTeamDto } from './models/updateTeamDto';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {

  constructor(private teamService: TeamService){}

    @Get()
    findAll(): Promise<TeamDto[]> {
     return this.teamService.findAll();
    }

    @Get(':id/setup')
    setup(): Promise<void> {
      return this.teamService.setup();
    }

    @Get(':id')
    findOneById(@Param('id') id: string): Promise<TeamDto> {
      return this.teamService.findOne(id);
    }

    @Post()
    create(@Body() team: CreateTeamDto): Promise<TeamDto>{
       return this.teamService.create(team);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updatedTeam: UpdateTeamDto):Promise<TeamDto> {
      return this.teamService.update(id,updatedTeam);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

}