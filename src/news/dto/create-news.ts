import { IsNotEmpty, IsString } from "class-validator";

export class CreateNewsDto {
    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    about: string;

    @IsString()
    @IsNotEmpty()
    authorImage: string;


    @IsString()
    @IsNotEmpty()
    author: string;
}