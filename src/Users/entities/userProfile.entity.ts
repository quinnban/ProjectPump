import { Team } from "src/Teams/entities/team";
import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, ManyToMany } from "typeorm"
import { v4 as uuidv4 } from 'uuid';
import { User } from "./user.entity";

@Entity()
export class UserProfile {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ nullable: true })
    pictureURl: string;

    @OneToOne(() => User, (user) => user.profile) 
    user: Promise<User>;

    @ManyToMany(() => Team, (team) => team.users)
    teams: Team [];


    public static newInstace(): UserProfile{
        const instance = new UserProfile();
        instance.id = uuidv4();
        return instance;
    }

}