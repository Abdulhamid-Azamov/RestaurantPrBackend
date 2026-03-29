import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.gurad';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) { }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    create(@Body() createMenuDto: CreateMenuDto) {
        return this.menuService.create(createMenuDto)
    }

    @Get()
    findAll() {
        return this.menuService.findAll()
    }

    @Get('popular')
    findPopular() {
        return this.menuService.findPopular()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.menuService.findOne(id)
    }

    @Get('category/:categoryId')
    findByCategory(
        @Param('categoryId') categoryId: string,
        @Query('excludeId') excludeId: string
    ) {
        return this.menuService.findByCategory(categoryId, excludeId)
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
        return this.menuService.update(id, updateMenuDto)
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.menuService.delete(id)
    }
}