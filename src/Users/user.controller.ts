import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './models/createUserDto';
import { UpdateUserDto } from './models/updateUserDto';


@Controller('user')
export class UserController {

    @Get()
    findAll(): string {
      return 'This action returns all cats';
    }

    @Get(':id')
    findOneById(@Param('id') id: string): string {
        return 'one user'
    }

    @Post()
    create(@Body() user: CreateUserDto){
        return 'this creates a user'
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