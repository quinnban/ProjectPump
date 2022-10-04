import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { User } from './entities/user';
import { CreateUserDto } from './models/createUserDto';
import { UpdateUserDto } from './models/updateUserDto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

  constructor(private userService: UserService){}

    @Get()
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() user: CreateUserDto): Promise<User>{
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUser: UpdateUserDto ) {
      return `update user`;
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

}