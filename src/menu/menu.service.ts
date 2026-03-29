import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { Category } from '../category/category.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { successRes } from 'src/utils/success-res';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async create(createMenuDto: CreateMenuDto) {
        const category = await this.categoryRepository.findOne({
            where: { id: createMenuDto.categoryId }
        })

        if (!category) {
            throw new NotFoundException("Kategoriyani  topib bo'lmadi")
        }

        const menu = this.menuRepository.create({
            ...createMenuDto,
            category,
        })

        await this.menuRepository.save(menu)
        return successRes(menu, "Muvaffaqiyatli bo'shildi")
    }

    async findAll() {
        const menu = await this.menuRepository.find({
            relations: ['category']
        })

        return successRes(menu, "Hamma mahsulotlar")
    }

    async findPopular() {
        const popularDishes = await this.menuRepository.find({
            where: { isPopular: true },
            relations: ['category']
        })

        return successRes(popularDishes, "Mashhur taomlar")
    }

    async findOne(id: string) {
        const menu = await this.menuRepository.findOne({
            where: { id },
            relations: ['category']
        })

        if (!menu) {
            throw new NotFoundException("Taomni topib bo'lmadi")
        }

        return successRes(menu)
    }

    async findByCategory(categoryId: string, excludeId: string) {
        const menus = await this.menuRepository.find({
            where: { category: { id: categoryId } },
            relations: ['category']
        })
        return successRes(
            menus.filter(menu => menu.id !== excludeId),
            "O'xshash taomlar"
        )
    }

    async update(id: string, updateMenuDto: UpdateMenuDto) {
        const menu = await this.menuRepository.findOne({
            where: { id },
            relations: ['category']
        })

        if (!menu) throw new NotFoundException("Taom topilmadi")

        if (updateMenuDto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: { id: updateMenuDto.categoryId }
            })
            if (!category) throw new NotFoundException("Kategoriya topilmadi")
            menu.category = category
        }

        Object.assign(menu, updateMenuDto)
        await this.menuRepository.save(menu)
        return successRes(menu, "Taom yangilandi")
    }

    async delete(id: string) {
        const menu = await this.menuRepository.findOne({
            where: { id }
        })

        if (!menu) {
            throw new NotFoundException('Taom topilmadi!')
        }

        await this.menuRepository.remove(menu)
        return successRes({}, "Muvaffaqiyatli o'chirib tashlandi")
    }
}