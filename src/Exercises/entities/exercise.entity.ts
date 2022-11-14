import { Photo } from "src/Media/entites/photo";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { WorkoutExercise } from "./workOutExerciseReps.entity";


@Entity()
export class Exercise {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @OneToMany(() => Photo, (photo) => photo.exersize)
    @JoinColumn()
    photos: Promise<Photo []> 

    @OneToMany(() => WorkoutExercise, info => info.exercise)
    info: Promise<WorkoutExercise []>;

}