import { ExerciseDto } from "./ExerciseDto"

export class ExerciseDetailDto {
    public id: string;
    public workoutId: string;
    public sets: number [];
    public reps: number [];
    public order: number;
    public exercise: ExerciseDto;
}