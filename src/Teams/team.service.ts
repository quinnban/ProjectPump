
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/Users/entities/userProfile.entity';
import { WorkoutDtoAssembler } from 'src/Workouts/assemblers/workoutDto.assembler';
import { WorkoutDto } from 'src/Workouts/models/workoutDto';
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
        private teamAssembler: TeamDtoAssembler,
        private workoutAssember: WorkoutDtoAssembler
      ) {}

      async findAll(): Promise<TeamDto[]> {
        const teams = await this.teamsRepository.find();
        return await this.teamAssembler.assembleMany(teams);
      }
    
      async findOne(id: string): Promise<TeamDto> {
         const team = await this.teamsRepository.findOne({
          where: {
           id:id
          }, 
          relations: {
            users:true,
            workouts:true
          }
         });
         if(!team){
          throw new HttpException('Team not found', HttpStatus.NOT_FOUND)
         }

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
          team.users = users;
          team.name = updatedTeam.name;
          const newteam = await this.teamsRepository.save(team);
          return this.teamAssembler.assemble(newteam);
      }

      async create(team: CreateTeamDto): Promise<TeamDto>{
        const createdTeam = Team.newInstace();
        createdTeam.name = team.name;
        console.log(team);
        if(team.users && team.users?.length !=0){
          console.log('here somehow', team.users)
          const users = await this.usersProfileRepository.find({where:{id: In(team.users)}})
          createdTeam.users = users;
        }
        const saved = await this.teamsRepository.save(createdTeam);
        return this.teamAssembler.assemble(saved);
      } 

      async setup():Promise<void> {
      const users = await this.usersProfileRepository.find();
      const team1 = new CreateTeamDto();
      team1.name = 'Slice Bois';
      team1.users = [users[0].id,users[1].id,users[2].id];
      await this.create(team1);

      const team2 = new CreateTeamDto();
      team2.name = 'Slice Girls';
      team2.users =[users[3].id,users[4].id,users[5].id];
      await this.create(team2);
      }

  
}