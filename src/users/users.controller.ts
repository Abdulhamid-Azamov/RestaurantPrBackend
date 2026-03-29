import { Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RoleGuard } from "src/auth/guards/role.gurad";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.usersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/make-admin')
    makeAdmin(@Param('id') id: string) {
        return this.usersService.makeAdmin(id)
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id)
    }
}