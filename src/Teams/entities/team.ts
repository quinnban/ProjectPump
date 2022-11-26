import { UserProfile } from "src/Users/entities/userProfile.entity";
import { Entity, PrimaryColumn, Column , JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Team {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => UserProfile, (user) => user.team)
    @JoinTable()
    users:UserProfile [];

    public static newInstace(): Team{
        const instance = new Team();
        instance.id = uuidv4();
        return instance;
    }
}