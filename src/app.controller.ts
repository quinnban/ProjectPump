import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTeamDto } from './Teams/models/createTeamDto';
import { TeamService } from './Teams/team.service';
import { User } from './Users/entities/user.entity';
import { CreateUserDto } from './Users/models/createUserDto';
import { UserService } from './Users/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
