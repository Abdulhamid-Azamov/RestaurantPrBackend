import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { successRes } from "src/utils/success-res";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) { }

    async create(createCategoryDto: CreateCategoryDto) {
        const existCategory = await this.categoryRepository.findOne({
            where: { categoryName: createCategoryDto.categoryName }
        })

        if (existCategory) {
            throw new ConflictException('Bu kategory allaqachon bor')
        }

        const category = this.categoryRepository.create(createCategoryDto)
        await this.categoryRepository.save(category)

        return successRes(category, "Muvaffaqiyatli yaratildi", 201)
    }

    async findAll() {
        const category = await this.categoryRepository.find()

        return successRes(category, "Hamma Categoriyalar")
    }

    async findOne(id: string) {
        const menu = await this.categoryRepository.findOne({
            where: { id },
            relations: ['menus']
        })

        if (!menu) {
            throw new NotFoundException("Taomni topib bo'lmadi")
        }

        return successRes(menu)
    }
}