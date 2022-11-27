import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { WorkoutDto } from "src/Workouts/models/workoutDto";
import { TeamDto } from "./models/teamDto";
import { TeamWorkoutService } from "./teamWorkout.service";

@Controller('teamsWorkouts')
export class TeamWorkoutController {

    constructor(private teamService: TeamWorkoutService){}

    @Get()
    findWorkoutsByTeamsId(@Query('ids') teamIds: string []): Promise<WorkoutDto []> {
      return this.teamService.findWorkoutsByTeamId(teamIds);
    }

    @Put(':id')
    updateTeamWorks(@Param('id') id: string, @Body() workoutIds: string []): Promise<TeamDto>{
        return this.teamService.updateTeamWorkouts(id,workoutIds)
    }


    @Get(':id/setup')
    setup(){
      this.teamService.setup();
    }


}