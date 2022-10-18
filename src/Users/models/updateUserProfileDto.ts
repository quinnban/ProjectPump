import { IsString, IsEmail } from "class-validator";

export class UpdateUserProfileDto {
    @IsString()
    id:string;
    @IsString()
    firstName: string;
    @IsString()
    lastName:string;
    @IsString()
    team:string;
    @IsString()
    pictureURl: string;
    email: string;
}