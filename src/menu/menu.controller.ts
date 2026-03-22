import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) { }

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

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.menuService.delete(id)
    }
}