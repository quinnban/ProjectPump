
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/Users/entities/userProfile.entity';
import { In, Repository } from 'typeorm';
import { TeamDtoAssembler } from './assemblers/teamDto.assembler';
import { Team } from './entities/team';
import { CreateTeamDto } from './models/createTeamDto';
import { TeamDto } from './models/teamDto';
import { UpdateTeamDto } from './models/updateTeamDto';


@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team) private teamsRepository: Repository<Team>,
        @InjectRepository(UserProfile) private usersProfileRepository: Repository<UserProfile>,
        private teamAssembler: TeamDtoAssembler
      ) {}

      async findAll(): Promise<TeamDto[]> {
        const teams = await this.teamsRepository.find();
        return this.teamAssembler.assembleMany(teams);
      }
    
      async findOne(id: string): Promise<TeamDto> {
         const team = await this.teamsRepository.findOneBy({ id });
         return this.teamAssembler.assemble(team); 
      }
    
      async remove(id: number): Promise<void> {
        await this.teamsRepository.delete(id);
      }

      async update(id: string ,updatedTeam : UpdateTeamDto): Promise<TeamDto> {
          const team = await this.teamsRepository.findOneBy({id});
          if(!team){
           throw new HttpException('Team not found', HttpStatus.NOT_FOUND)
          }
          const users = await this.usersProfileRepository.find({where:{id: In(updatedTeam.users)}})
          team.users = Promise.resolve(users);
          team.name = updatedTeam.name;
          await this.teamsRepository.save(team);

          return this.teamAssembler.assemble(team);
      }

      async create(team: CreateTeamDto): Promise<TeamDto>{
       const createdTeam = Team.newInstace();
       createdTeam.name = team.name;

       if(team.users?.length !=0){
        const users = await this.usersProfileRepository.find({where:{id: In(team.users)}})
        createdTeam.users = Promise.resolve(users);
       }
        await this.teamsRepository.save(createdTeam);
        return this.teamAssembler.assemble(createdTeam);
      }
  
}