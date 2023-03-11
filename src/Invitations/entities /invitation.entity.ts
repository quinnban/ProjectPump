import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity()
export class Invitation {

    @PrimaryColumn()
    id: string;
    
    @CreateDateColumn()
    createdDate: Date;

    @Column()
    accepted: boolean;

    @Column()
    email: string;

    public static newInstance(): Invitation{
        const instance = new Invitation();
        instance.id = uuidv4();
        instance.accepted = false;
        return instance;
    }
}