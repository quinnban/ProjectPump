import { UserTeamDto } from "./userTeamDto";

export class UserProfileDto {
    id: string;
    firstName: string;
    lastName: string
    pictureURl: string;
    teams: UserTeamDto [];
}