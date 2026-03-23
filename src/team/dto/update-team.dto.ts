import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTeamDto {
    @IsString()
    @IsNotEmpty()
    fullName?: string;

    @IsString()
    @IsNotEmpty()
    position?: string;

    @IsString()
    @IsNotEmpty()
    image?: string;
}