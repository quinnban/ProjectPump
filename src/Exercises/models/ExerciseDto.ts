import { ExerciseCategory } from "./ExerciseCategory";

export class ExerciseDto {
    id: string;
    name: string;
    description: string;
    category: ExerciseCategory;
}