import { Controller, Get, Post, Delete, Param, Body, UseGuards } from "@nestjs/common"
import { GalleryService } from "./galery.service"
import { CreateGalleryDto } from "./dto/galery.dto"
import { JwtAuthGuard } from "src/auth/guards/jwt.guard"
import { RoleGuard } from "src/auth/guards/role.gurad"

@Controller("gallery")
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    @UseGuards(JwtAuthGuard, RoleGuard)
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