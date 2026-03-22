import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('news')
export class News {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    image: string;

    @Column()
    about: string;

    @Column()
    authorImage: string;


    @Column()
    author: string;
}