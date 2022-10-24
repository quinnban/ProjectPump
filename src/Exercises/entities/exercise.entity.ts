import { Photo } from "src/Media/entites/photo";
import { Workout } from "src/Workouts/entites/workout.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Exercise {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    catergory: string;

    @OneToMany(() => Photo, (photo) => photo.exersize)
    @JoinColumn()
    photos: Promise<Photo []> 

    @ManyToMany(type => Workout)
    @JoinTable()
    workouts: Promise<Workout []>;


}