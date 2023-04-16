import { Photo } from "src/Media/entites/photo";
import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { ExerciseCategory } from "../models/ExerciseCategory";
import { WorkoutExercise } from "./workOutExerciseReps.entity";
import { v4 as uuidv4 } from 'uuid';
import { Video } from "src/Media/entites/video";


@Entity()
export class Exercise {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column()
    category: ExerciseCategory;

    @OneToMany(() => Photo, (photo) => photo.exercise)
    @JoinColumn()
    photos: Photo [];

    @OneToMany(() => Video, (video) =>video.exercise, {orphanedRowAction: 'delete'})
    videos: Video [];

    @OneToMany(() => WorkoutExercise, info => info.exercise)
    info: WorkoutExercise [];

    public static newInstace(): Exercise{
        const instance = new Exercise();
        instance.id = uuidv4();
        return instance;
    }

}