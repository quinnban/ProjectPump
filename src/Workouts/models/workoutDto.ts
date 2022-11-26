import { ExerciseDetailDto } from "src/Exercises/models/ExerciseDetailDto";

export class WorkoutDto {
    id: string;
    name: string;
    description: string;
    exercises: ExerciseDetailDto [];
}