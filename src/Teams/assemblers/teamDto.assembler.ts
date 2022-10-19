import { Injectable } from "@nestjs/common";
import { UserProfileDtoAssembler } from "src/Users/assemblers/userProfileDto.assembler";
import { Team } from "../entities/team";
import { TeamDto } from "../models/teamDto";

@Injectable()
export class TeamDtoAssembler{

    constructor(private userProfileAssembler: UserProfileDtoAssembler){}

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
        const profiles = await team.users;
        console.log('found users',profiles);
        teamDto.users = await this.userProfileAssembler.assembleMany(profiles);
        
        console.log('assembled team', teamDto);
        return Promise.resolve(teamDto);
    }

}