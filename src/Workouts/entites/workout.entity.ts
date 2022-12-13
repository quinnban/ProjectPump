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

    @Column({nullable:true})
    description: string;

    @OneToMany(() => WorkoutExercise, info => info.workout,{cascade:true, onDelete:'CASCADE'})
    @JoinColumn()
    exercises: WorkoutExercise []; 

    public static newInstace(): Workout{
        const instance = new Workout();
        instance.id = uuidv4();
        return instance;
    }

}