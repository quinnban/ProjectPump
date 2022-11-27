import { Injectable } from "@nestjs/common";
import { Team } from "src/Teams/entities/team";
import { UserTeamDto } from "../models/userTeamDto";

@Injectable()
export class UserTeamDtoAssembler {
    assemble(team: Team): UserTeamDto {
        const teamDto = new UserTeamDto();
        teamDto.id = team.id;
        teamDto.name = team.name;
        return teamDto;
    }

    assembleMany(teams: Team []): UserTeamDto []{
        const teamDtos = [];
        teams.forEach(team => teamDtos.push(this.assemble(team)));
        return teamDtos;
    }
}