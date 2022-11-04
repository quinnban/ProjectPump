import { Team } from "src/Teams/entities/team";
import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne } from "typeorm"
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

    @Column()
    teamId: string;

    @OneToOne(() => User, (user) => user.profile) 
    user: Promise<User>;

    @ManyToOne(() => Team, (team) => team.users)
    team: Promise<Team>;


    public static newInstace(): UserProfile{
        const instance = new UserProfile();
        instance.id = uuidv4();
        return instance;
    }

}