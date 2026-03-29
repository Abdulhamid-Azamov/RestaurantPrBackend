import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news";
import { UpdateNewsDto } from "./dto/update-news";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { RoleGuard } from "src/auth/guards/role.gurad";

@Controller('news')
export class NewsController {
    constructor(private newsService: NewsService) { }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Post()
    create(@Body() createNewsDto: CreateNewsDto) {
        return this.newsService.create(createNewsDto)
    }

    @Get()
    findAll() {
        return this.newsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.findOne(id)
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
        return this.newsService.update(id, updateNewsDto)
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.newsService.delete(id)
    }
}