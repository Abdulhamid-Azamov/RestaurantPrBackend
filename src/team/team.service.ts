import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "./team.entity";
import { Repository } from "typeorm";
import { CreateTeamDto } from "./dto/create-team.dto";
import { successRes } from "src/utils/success-res";
import { UpdateTeamDto } from "./dto/update-team.dto";

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>
    ) { }

    async create(createTeamDto: CreateTeamDto) {
        const team = this.teamRepository.create(createTeamDto)
        await this.teamRepository.save(team)
        return successRes(team, "Yangi jamoa azosi yaratildi")
    }

    async findAll() {
        const team = await this.teamRepository.find()
        return successRes(team, "Hamma Jamoa azolari")
    }

    async findOne(id: string) {
        const team = await this.teamRepository.findOne({ where: { id } })
        if (!team) throw new NotFoundException("Bunday idli jamoa azosi yo'q")
        return successRes(team, `Jamoa a'zosi`)
    }

    async update(id: string, updateTeamDto: UpdateTeamDto) {
        const team = await this.teamRepository.findOne({ where: { id } })
        if (!team) throw new NotFoundException("Hech qanday jamoa azosi yo'q yo'q")
        Object.assign(team, updateTeamDto)
        await this.teamRepository.save(team)
        return successRes(team, "Yangilandi")
    }

    async delete(id: string) {
        const team = await this.teamRepository.findOne({ where: { id } })
        if (!team) throw new NotFoundException("Hech qanday Jamoa a'zosi yo'q yo'q")
        await this.teamRepository.remove(team)
        return successRes({}, "Siz jamoa a'zosini o'chirdingiz")
    }
}