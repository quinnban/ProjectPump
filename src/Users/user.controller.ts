import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import { CreateUserDto } from './models/createUserDto';
import { UploadPictureDto } from './models/uploadPictureDto';
import { UserProfileDto } from './models/userProfileDto';
import { UserService } from './user.service';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Roles('user')
@UseGuards(AuthGuard,RolesGuard)
@Controller('users')
export class UserController {

  constructor(private userService: UserService){}

    @Get()
    findAll(): Promise<UserProfileDto[]> {
      return this.userService.findAll();
    }

    @Get(':id/setup')
    setup(): Promise<void> {
      return this.userService.setup();
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