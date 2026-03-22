import { Category } from "src/category/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('menu')
export class Menu {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('decimal')
    price: number;

    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    categoryId: string


    @ManyToOne(() => Category, category => category.menus)
    @JoinColumn()
    category: Category

    @Column({ default: false })
    isPopular: boolean

}