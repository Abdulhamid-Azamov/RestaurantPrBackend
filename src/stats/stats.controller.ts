import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.gurad';

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService) {}

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    getStats() {
        return this.statsService.getStats()
    }
}