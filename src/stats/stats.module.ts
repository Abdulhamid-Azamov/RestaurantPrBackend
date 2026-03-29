import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Menu } from '../menu/menu.entity';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { Reservation } from 'src/reservation/reservation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Menu, Reservation])],
    controllers: [StatsController],
    providers: [StatsService],
})
export class StatsModule { }