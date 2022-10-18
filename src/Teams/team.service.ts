
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/Users/entities/userProfile.entity';
import { In, Repository } from 'typeorm';
import { Team } from './entities/team';
import { CreateTeamDto } from './models/createTeamDto';
import { UpdateTeamDto } from './models/updateTeamDto';


@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team) private teamsRepository: Repository<Team>,
        @InjectRepository(UserProfile) private usersProfileRepository: Repository<UserProfile>
      ) {}

      findAll(): Promise<Team[]> {
        return this.teamsRepository.find();
      }
    
      findOne(id: string): Promise<Team> {
        return this.teamsRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.teamsRepository.delete(id);
      }

      async update(updatedTeam : UpdateTeamDto){

      }

      async create(team: CreateTeamDto): Promise<Team>{
       const createdTeam = Team.newInstace();
       createdTeam.name = team.name;

       if(team.users?.length !=0){
        const users = await this.usersProfileRepository.find({where:{id: In(team.users)}})
        createdTeam.users = users;
       }
        return this.teamsRepository.save(createdTeam);
      }
  
}