import { IsString, IsInt, IsDateString, Min, Max, Matches } from 'class-validator'

export class CreateReservationDto {
  @IsString()
  @Matches(/^\+?[0-9]{9,13}$/, { message: 'Неверный формат номера телефона' })
  phone: string

  @IsInt()
  @Min(1, { message: 'Минимум 1 человек' })
  @Max(20, { message: 'Максимум 20 человек' })
  guests: number

  @IsDateString()
  date: string // "2025-12-31"

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Неверный формат времени (HH:mm)' })
  time: string // "19:30"

  @IsString()
  location: string
}