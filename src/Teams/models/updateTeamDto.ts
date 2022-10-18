import { IsArray, IsString } from "class-validator";

export class UpdateTeamDto {
    @IsString()
    name: string;
    @IsArray()
    users: string [];
}