
import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from "typeorm"
import { v4 as uuidv4 } from 'uuid';
import { UserProfile } from "./userProfile.entity";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToOne(() => UserProfile, (profile) => profile.user, {cascade:true, onDelete:"CASCADE",eager:true})
    @JoinColumn()
    profile: UserProfile

    public static newInstace(): User{
        const instance = new User();
        instance.id = uuidv4();
        instance.role = 'user';
        return instance;
    }
}