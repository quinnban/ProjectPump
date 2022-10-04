import { IsString, IsEmail } from 'class-validator';


export class CreateUserDto {
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsEmail()
    email: string;
    @IsString()
    username:string;
    @IsString()
    password:string;
    @IsString()
    team: string;
  }