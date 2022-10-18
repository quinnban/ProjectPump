import { User } from "src/Users/entities/user.entity";
import { UserProfile } from "src/Users/entities/userProfile.entity";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Team {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => UserProfile, (user) => user.team)
    users: Promise<UserProfile []>;

    public static newInstace(): Team{
        const instance = new Team();
        instance.id = uuidv4();
        return instance;
    }
}