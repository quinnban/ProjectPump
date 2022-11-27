import { Injectable } from "@nestjs/common";
import { UserProfileDtoAssembler } from "src/Users/assemblers/userProfileDto.assembler";
import { WorkoutDtoAssembler } from "src/Workouts/assemblers/workoutDto.assembler";
import { Team } from "../entities/team";
import { TeamDto } from "../models/teamDto";

@Injectable()
export class TeamDtoAssembler{

    constructor(private userProfileAssembler: UserProfileDtoAssembler,
                private workoutDtoAssembler: WorkoutDtoAssembler){}

 async assembleMany(teams: Team []): Promise<TeamDto []>{
        const teamDtos = [];
        teams.forEach(team => {
            const teamDto = new TeamDto();
            teamDto.id = team.id;
            teamDto.name = team.name;
            teamDtos.push(teamDto);
        })
        return Promise.resolve(teamDtos);
    }

     async assemble(team: Team): Promise<TeamDto> {
        const teamDto = new TeamDto();
        teamDto.id = team.id;
        teamDto.name = team.name;
        if(team.users){
            teamDto.users = await this.userProfileAssembler.assembleMany(team.users);
        }
        if(team.workouts){
            teamDto.workouts = this.workoutDtoAssembler.assembleMany(team.workouts);
        }
        return Promise.resolve(teamDto);
    }

}