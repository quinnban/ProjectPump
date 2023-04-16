import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import { PhotoType } from "../models/photoType";
import { v4 as uuidv4 } from 'uuid';
import { Exercise } from "src/Exercises/entities/exercise.entity";
import e from "express";

@Entity()
export class Photo {
    @PrimaryColumn()
    id: string;

    @Column({ length: 100})
    name: string;

    @Column()
    key: string;

    @Column({
        type: "enum",
        enum: PhotoType,
    })
    type: PhotoType;

    @Column()
    size: number;

    @ManyToOne(() => Exercise, (exercise) => exercise.photos)
    exercise: Exercise;

    public static newInstance(): Photo {
        const instance = new Photo();
        instance.id = uuidv4();
        return instance;
    }
}