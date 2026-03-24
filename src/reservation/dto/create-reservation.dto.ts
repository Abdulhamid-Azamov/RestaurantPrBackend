import { IsString, IsInt, IsDateString, IsEmail, Min, Max, Matches } from 'class-validator'

export class CreateReservationDto {
  @IsEmail({}, { message: 'Неверный формат email' })
  email: string

  @IsInt()
  @Min(1, { message: 'Минимум 1 человек' })
  @Max(20, { message: 'Максимум 20 человек' })
  guests: number

  @IsDateString()
  date: string

  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Неверный формат времени (HH:mm)' })
  time: string

  @IsString()
  location: string
}