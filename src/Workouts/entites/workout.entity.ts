import { Exercise } from "src/Exercises/entities/exercise.entity";
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Workout {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(type => Exercise)
    @JoinTable()
    exersizes: Promise<Exercise []>;

}