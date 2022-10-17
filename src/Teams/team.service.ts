
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team';


@Injectable()
export class TeamService {

    constructor(
        @InjectRepository(Team) private teamsRepository: Repository<Team>,
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

    //   async create(user: CreateUserDto): Promise<User>{
    //     const profile = UserProfile.newInstace();
    //     const createdUser = User.newInstace();

    //     createdUser.email = user.email;
    //     createdUser.password = bcrypt.hashSync(user.password, 10);
    //     createdUser.profile = profile;
    //     console.log(bcrypt.compareSync(user.password, createdUser.password));
    //     return this.usersRepository.save(createdUser);
    //   }
  
}