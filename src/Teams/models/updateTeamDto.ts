import { IsArray, IsString } from "class-validator";

export class UpdateTeamDto {
    @IsString()
    id: string;
    @IsString()
    name: string;
    @IsArray()
    users: string [];
}