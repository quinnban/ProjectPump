
import { Entity, Column, PrimaryColumn, JoinColumn, OneToOne } from "typeorm"
import { v4 as uuidv4 } from 'uuid';
import { RoleType } from "../models/RoleType";
import { UserProfile } from "./userProfile.entity";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: RoleType,
        default: RoleType.USER
    })
    role: RoleType;

    @Column()
    profileId: string;

    @OneToOne(() => UserProfile, (profile) => profile.user, {cascade:true, onDelete:"CASCADE"})
    @JoinColumn()
    profile: UserProfile

    public static newInstance(): User{
        const instance = new User();
        instance.id = uuidv4();
        instance.role = RoleType.USER;
        return instance;
    }
}