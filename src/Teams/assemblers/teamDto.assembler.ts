import { Injectable } from "@nestjs/common";
import { Team } from "../entities/team";
import { TeamDto } from "../models/teamDto";

@Injectable()
export class TeamDtoAssembler{

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
        teamDto.users = await team.users;
        return teamDto;
    }

}