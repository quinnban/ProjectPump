import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './models/createUserDto';
import { UploadPictureDto } from './models/uploadProfilePictureDto';
import { UserProfileDto } from './models/userProfileDto';
import { UserService } from './user.service';


@Controller('users')
export class UserController {

  constructor(private userService: UserService){}

    @Get()
    findAll(): Promise<UserProfileDto[]> {
      return this.userService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id') id: string): Promise<UserProfileDto> {
        return this.userService.findOne(id);
    }

    @Get(':id/uploadPicture')
    updateProfilePicture(@Param('id') id: string): Promise<UploadPictureDto> {
      return this.userService.updateProfilePicture(id);
    }

    @Post(':id/getPicture')
    getProfilePicture(@Body() key: string): Promise<string> {
      return this.userService.getPictureUrl(key);
    }

    @Post()
    create(@Body() user: CreateUserDto): Promise<User>{
        return this.userService.create(user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUser: UserProfileDto ) {
      return this.userService.update(id,updateUser);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return `delete user`;
    }

}