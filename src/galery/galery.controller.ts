import { Controller, Get, Post, Delete, Param, Body } from "@nestjs/common"
import { GalleryService } from "./galery.service"
import { CreateGalleryDto } from "./dto/galery.dto"

@Controller("gallery")
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    @Post()
    create(@Body() dto: CreateGalleryDto) {
        return this.galleryService.create(dto)
    }

    @Get()
    findAll() {
        return this.galleryService.findAll()
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.galleryService.delete(id)
    }
}