import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { RoleGuard } from "src/auth/guards/role.gurad";

@Controller('category')

export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto)
    }

    @Get()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id)
    }
}