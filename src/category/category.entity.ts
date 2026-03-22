import { Menu } from "src/menu/menu.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    categoryName: string;

    @CreateDateColumn()
    createdAt?: Date;



    @OneToMany(() => Menu, menu => menu.category)
    menus: Menu[]



}

