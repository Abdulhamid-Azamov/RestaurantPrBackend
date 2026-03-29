import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Menu } from '../menu/menu.entity';
import { Reservation } from 'src/reservation/reservation.entity';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(Menu)
        private menuRepo: Repository<Menu>,
        @InjectRepository(Reservation)
        private reserRepo:Repository<Reservation>
    ) {}

    async getStats() {
        const users = await this.userRepo.count()
        const menus = await this.menuRepo.count()
        const order = await this.reserRepo.count()

        return {
            users,
            menus,
            order,
            messages: 0
        }
    }
}