
import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne, BaseEntity } from "typeorm"
import { v4 as uuidv4 } from 'uuid';
import { UserProfile } from "./userProfile.entity";

@Entity('users')
export class User extends BaseEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => UserProfile, (profile) => profile.user, {cascade:true, onDelete:"CASCADE",eager:true})
    @JoinColumn()
    profile: UserProfile

    public static newInstace(): User{
        const instance = new User();
        instance.id = uuidv4();
        return instance;
    }
}