import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { successRes } from "src/utils/success-res";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    async findAll() {
        const team = await this.userRepo.find()
        return successRes(team, "Hamma Foydalanuvchilar")
    }

    async findOne(id: string) {
        const user = await this.userRepo.findOne({ where: { id } })
        if (!user) throw new NotFoundException("Bunday idli foydalanuvchi yo'q yo'q")
        return successRes(user, `Foydalanuvchi topildi`)
    }

    async makeAdmin(id: string) {
        const user = await this.userRepo.findOne({ where: { id } })
        if (!user) throw new NotFoundException("Foydalanuvchi topilmadi")
        user.role = 'admin'
        await this.userRepo.save(user)
        return successRes(user, "Foydalanuvchi admin qilindi")
    }

    async delete(id: string) {
        const user = await this.userRepo.findOne({ where: { id } })
        if (!user) throw new NotFoundException("Foydalanuvchi topilmadi")
        await this.userRepo.remove(user)
        return successRes({}, "Foydalanuvchi o'chirildi")
    }
}