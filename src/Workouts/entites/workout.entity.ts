import { Exercise } from "src/Exercises/entities/exercise.entity";
import { WorkoutExercise } from "src/Exercises/entities/workOutExerciseReps.entity";
import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Workout {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => WorkoutExercise, info => info.workout)
    @JoinColumn()
    exercises: Promise <WorkoutExercise []>;

}