import { Column, Entity, PrimaryColumn } from "typeorm"
import { PhotoType } from "../models/photoType";
import { v4 as uuidv4 } from 'uuid';

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

    public static newInstance(): Photo {
        const instance = new Photo();
        instance.id = uuidv4();
        return instance;
    }
}