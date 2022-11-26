import { Workout } from "src/Workouts/entites/workout.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Exercise } from "./exercise.entity";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class WorkoutExercise {
    @PrimaryColumn()
    public id!: string

    @Column()
    public workoutId!: string

    @Column()
    public exerciseId!: string

    @Column("simple-array")
    public reps!: number []

    @Column()
    public order!: number

    @ManyToOne(()=> Exercise, (exercise => exercise.info), {eager:true})
    public exercise!: Exercise;

    @ManyToOne(()=> Workout, (workout => workout.exercises))
    public workout!: Workout;

    public static newInstace(): WorkoutExercise{
        const instance = new WorkoutExercise();
        instance.id = uuidv4();
        return instance;
    }
}