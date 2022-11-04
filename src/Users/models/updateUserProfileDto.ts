import { IsString } from "class-validator";

export class UpdateUserProfileDto {
    @IsString()
    id:string;
    @IsString()
    firstName: string;
    @IsString()
    lastName:string;
    @IsString()
    teamId:string;
    @IsString()
    pictureURl: string;
}