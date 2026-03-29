import { IsString, IsNumber, IsBoolean, IsOptional, IsUUID } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateMenuDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    price?: number

    @IsString()
    @IsOptional()
    image?: string

    @IsBoolean()
    @IsOptional()
    isPopular?: boolean

    @IsUUID()
    @IsOptional()
    categoryId?: string
}