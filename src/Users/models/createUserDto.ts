import { IsString, IsEmail } from 'class-validator';


export class CreateUserDto {
    @IsString()
    fistName: string;
    @IsString()
    LastName: string;
    @IsEmail()
    email: string;
    @IsString()
    username:string;
    @IsString()
    password:string;
    @IsString()
    team: string;
  }