import { UserProfileDto } from "src/Users/models/userProfileDto";

export class TeamDto {
    id: string;
    name: string;
    users: UserProfileDto [];
}