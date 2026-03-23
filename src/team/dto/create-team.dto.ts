import { IsNotEmpty, IsString } from "class-validator";

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsString()
    @IsNotEmpty()
    image: string;
}