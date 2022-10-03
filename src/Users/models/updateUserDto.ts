import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    firstName: string;
    @IsString()
    lastName:string;
    @IsEmail()
    email: string;
    @IsString()
    team:string;
}