import { Workout } from "src/Workouts/entites/workout.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Exercise } from "./exercise.entity";

@Entity()
export class WorkoutExercise {
    @PrimaryColumn()
    public workoutExerciseRep!: string

    @Column()
    public workoutId!: string

    @Column()
    public exerciseId!: string

    @Column("simple-array")
    public sets!: number []

    @Column("simple-array")
    public reps!: number []

    @Column()
    public order!: number

    @ManyToOne(()=> Exercise, (exercise => exercise.info))
    public exercise!: Promise<Exercise>;

    @ManyToOne(()=> Workout, (workout => workout.exercises))
    public workout!: Promise<Workout>;
}