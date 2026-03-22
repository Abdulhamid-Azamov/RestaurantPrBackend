import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    price: number;

    @IsString()
    @IsNotEmpty()
    image: string;


    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsBoolean()
    @IsOptional()
    isPopular: boolean

}