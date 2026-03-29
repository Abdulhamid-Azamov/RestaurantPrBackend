import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { successRes } from "src/utils/success-res";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private useRepo: Repository<User>,
        private jwtService: JwtService
    ) { }


    async register(registerDto: RegisterDto) {
        const existUser = await this.useRepo.findOne({ where: { username: registerDto.username } })
        if (existUser) {
            throw new ConflictException("Bu foydalanuvchi nomi allaqchon band")
        }

        const user = this.useRepo.create(registerDto)
        await this.useRepo.save(user)

        return successRes(user, "Muvofaqiyatli ro'yxatdan o'tdingiz", 201)
    }

    async login(loginDto: LoginDto) {
        const user = await this.useRepo.findOne({ where: { username: loginDto.username } })

        if (!user) {
            throw new UnauthorizedException("Userame yokida Parol noto'g'ri")
        }

        const isValidPassword = await bcrypt.compare(loginDto.password, user.password)

        if (!isValidPassword) {
            throw new UnauthorizedException("Username yoki parol noto'g'ri")
        }

        const token = this.jwtService.sign({
            id: user.id,
            username: user.username,
            role: user.role
        })

        return { token }
    }

}