import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { VideoType } from "../models/videoType";
import { v4 as uuidv4 } from 'uuid';
import { Exercise } from "src/Exercises/entities/exercise.entity";

@Entity()
export class Video {

    @PrimaryColumn()
    id: string;

    @Column({ length: 100})
    name: string;

    @Column()
    key: string;

    @Column()
    size: number;

    @Column({
        type: "enum",
        enum: VideoType,
    })
    type: VideoType;

    @ManyToOne(() => Exercise, (exercise) => exercise.videos)
    exercise: Exercise;


    public static newInstance(): Video {
        const instance = new Video();
        instance.id = uuidv4();
        return instance;
    }
}