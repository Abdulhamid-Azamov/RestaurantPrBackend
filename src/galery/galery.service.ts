import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Gallery } from "./galery.entity"
import { CreateGalleryDto } from "./dto/galery.dto"

@Injectable()
export class GalleryService {
    constructor(
        @InjectRepository(Gallery)
        private galleryRepository: Repository<Gallery>
    ) {}

    async create(dto: CreateGalleryDto): Promise<Gallery> {
        const gallery = this.galleryRepository.create(dto)
        return this.galleryRepository.save(gallery)
    }

    async findAll(): Promise<Gallery[]> {
        return this.galleryRepository.find()
    }

    async delete(id: string): Promise<void> {
        await this.galleryRepository.delete(id)
    }
}