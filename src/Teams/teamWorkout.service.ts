import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WorkoutDtoAssembler } from "src/Workouts/assemblers/workoutDto.assembler";
import { Workout } from "src/Workouts/entites/workout.entity";
import { WorkoutDto } from "src/Workouts/models/workoutDto";
import { In, Repository } from "typeorm";
import { TeamDtoAssembler } from "./assemblers/teamDto.assembler";
import { Team } from "./entities/team";
import { TeamDto } from "./models/teamDto";

@Injectable()
export class TeamWorkoutService {

    constructor(
        @InjectRepository(Team) private teamsRepository: Repository<Team>,
        private workoutAssember: WorkoutDtoAssembler,
        @InjectRepository(Workout) private workoutRepository: Repository<Workout>,
        private teamAssembler: TeamDtoAssembler,

      ) {}

    async findWorkoutsByTeamId(teamIds: string []): Promise<WorkoutDto []> {
        const workouts = [];
    
        const teams = await this.teamsRepository.find({
          where: { id: In( Array.isArray(teamIds) ? teamIds : Array(teamIds) ),},
          relations:{workouts:true}
        });
        teams.forEach(team => {
          workouts.push(...team.workouts);
        });
        return this.workoutAssember.assembleMany(Array.from(new Set(workouts)));
      }

      async updateTeamWorkouts(teamId: string, workoutIds: string []): Promise<TeamDto> {
        const team = await this.teamsRepository.findOne({where:{id:teamId},relations:{users:true}});
        if(!team){
            throw new HttpException('Team not found', HttpStatus.NOT_FOUND)
        }
        const workouts = await this.workoutRepository.find({where:{id:In(workoutIds)}});
        team.workouts =  workouts;
        await this.teamsRepository.save(team);

        return this.teamAssembler.assemble(team);
      }
}