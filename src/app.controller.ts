import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTeamDto } from './Teams/models/createTeamDto';
import { TeamService } from './Teams/team.service';
import { User } from './Users/entities/user.entity';
import { CreateUserDto } from './Users/models/createUserDto';
import { UpdateUserProfileDto } from './Users/models/updateUserProfileDto';
import { UserService } from './Users/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UserService,private teamService: TeamService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/setup')
  async setup():Promise<void> {
    let tempUser: User;
    const user1 = new CreateUserDto();
    user1.email = 'abc@123.com';
    user1.password = 'qwerty123';
    tempUser = await this.userService.create(user1);

    const updateUser1 = new UpdateUserProfileDto();
    updateUser1.firstName = 'jimbo';
    updateUser1.lastName = 'slice';
    updateUser1.id = tempUser.profileId;
    await this.userService.update(updateUser1.id,updateUser1);

    const user2 = new CreateUserDto();
    user2.email = '123@abc.com';
    user2.password = 'qwerty123';
    tempUser = await this.userService.create(user2);

    const updateUser2 = new UpdateUserProfileDto();
    updateUser2.firstName = 'jam';
    updateUser2.lastName = 'slice';
    updateUser2.id = tempUser.profileId;
    await this.userService.update(updateUser2.id,updateUser2);

    const user3 = new CreateUserDto();
    user3.email = 'qwerty@123.com';
    user3.password = 'qwerty123';
    tempUser = await this.userService.create(user3);

    const updateUser3 = new UpdateUserProfileDto();
    updateUser3.firstName = 'jimmy';
    updateUser3.lastName = 'slice';
    updateUser3.id = tempUser.profileId;
    await this.userService.update(updateUser3.id,updateUser3);

    const user4 = new CreateUserDto();
    user4.email = 'aqws@abc.com';
    user4.password = 'qwerty123';
    tempUser = await this.userService.create(user4);

    const updateUser4 = new UpdateUserProfileDto();
    updateUser4.firstName = 'jane';
    updateUser4.lastName = 'slim';
    updateUser4.id = tempUser.profileId;
    await this.userService.update(updateUser4.id,updateUser4);

    const user5 = new CreateUserDto();
    user5.email = 'iopi@123.com';
    user5.password = 'qwerty123';
    tempUser = await this.userService.create(user5);

    const updateUser5 = new UpdateUserProfileDto();
    updateUser5.firstName = 'jamie';
    updateUser5.lastName = 'slim';
    updateUser5.id = tempUser.profileId;
    await this.userService.update(updateUser5.id,updateUser5);

    const user6 = new CreateUserDto();
    user6.email = 'ajkljs@abc.com';
    user6.password = 'qwerty123';
    tempUser = await this.userService.create(user6);

    const updateUser6 = new UpdateUserProfileDto();
    updateUser6.firstName = 'jenny';
    updateUser6.lastName = 'slim';
    updateUser6.id = tempUser.profileId;
    await this.userService.update(updateUser6.id,updateUser6);


    const team1 = new CreateTeamDto();
    team1.name = 'Slice Bois';
    team1.users = [updateUser1.id,updateUser2.id,updateUser3.id];
    await this.teamService.create(team1);

    const team2 = new CreateTeamDto();
    team2.name = 'Slice Girls';
    team2.users = [updateUser4.id,updateUser5.id,updateUser6.id];
    await this.teamService.create(team2);

  }
}
