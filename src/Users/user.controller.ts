import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './models/createUserDto';
import { UpdateUserProfileDto } from './models/updateUserProfileDto';
import { UserService } from './user.service';


@Controller('users')
export class UserController {

  constructor(private userService: UserService){}

    @Get()
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() user: CreateUserDto): Promise<User>{
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUser: UpdateUserProfileDto ) {
      return `update user`;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

}