import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('team')
export class Team {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    fullName: string

    @Column()
    position: string

    @Column()
    image: string

    @CreateDateColumn()
    createdAt: Date
}