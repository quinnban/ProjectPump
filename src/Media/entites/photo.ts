import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from "typeorm"
import { PhotoMetadata } from "./photoMetadata"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column("text")
    description: string

    @Column()
    filename: string

    @Column()
    isPublished: boolean

    @OneToOne(() => PhotoMetadata, (photoMetadata) => photoMetadata.photo)
    metadata: Relation<PhotoMetadata>
}