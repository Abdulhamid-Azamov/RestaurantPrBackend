import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { TeamService } from "./team.service"
import { CreateTeamDto } from "./dto/create-team.dto"
import { UpdateTeamDto } from "./dto/update-team.dto"

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) { }

    @Post()
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamService.create(createTeamDto)
    }

    @Get()
    findAll() {
        return this.teamService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamService.update(id, updateTeamDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.teamService.delete(id)
    }
}