import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Gallery } from "./galery.entity"
import { GalleryController } from "./galery.controller"
import { GalleryService } from "./galery.service"

@Module({
    imports: [TypeOrmModule.forFeature([Gallery])],
    controllers: [GalleryController],
    providers: [GalleryService],
})
export class GalleryModule {}