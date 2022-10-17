import { IsString, IsEmail } from "class-validator";

export class UpdateUserProfileDto {
    @IsString()
    id:string;
    firstName: string;
    lastName:string;
    email: string;
    team:string;
    pictureURl: string;
}