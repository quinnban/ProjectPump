import { UserProfileDto } from "src/Users/models/userProfileDto";
import { WorkoutDto } from "src/Workouts/models/workoutDto";

export class TeamDto {
    id: string;
    name: string;
    users: UserProfileDto [];
    workouts: WorkoutDto [];
}