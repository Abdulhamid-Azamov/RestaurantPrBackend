import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "./news.entity";
import { Repository } from "typeorm";
import { CreateNewsDto } from "./dto/create-news";
import { successRes } from "src/utils/success-res";
import { UpdateNewsDto } from "./dto/update-news";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>
    ) { }

    async create(createNewsDto: CreateNewsDto) {
        const news = this.newsRepository.create(createNewsDto)
        await this.newsRepository.save(news)
        return successRes(news, "Yangilik qo'shildi")
    }

    async findAll() {
        const news = await this.newsRepository.find()
        return successRes(news, "Hamma yangiliklar")
    }

    async findOne(id: string) {
        const news = await this.newsRepository.findOne({ where: { id } })
        if (!news) throw new NotFoundException("Hech qanday yangilik yo'q")
        return successRes(news, `Yangilik`)
    }

    async update(id: string, updateNewsDto: UpdateNewsDto) {
        const news = await this.newsRepository.findOne({ where: { id } })
        if (!news) throw new NotFoundException("Hech qanday yangilik yo'q")
        Object.assign(news, updateNewsDto)
        await this.newsRepository.save(news)
        return successRes(news, "Yangilandi")
    }

    async delete(id: string) {
        const news = await this.newsRepository.findOne({ where: { id } })
        if (!news) throw new NotFoundException("Hech qanday yangilik yo'q")
        await this.newsRepository.remove(news)
        return successRes({}, "Siz yangilikni o'chirdingiz")
    }
}