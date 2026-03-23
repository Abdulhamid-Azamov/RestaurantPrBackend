import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ReservationsService } from './reservation.service'
import { CreateReservationDto } from './dto/create-reservation.dto'

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateReservationDto) {
    const reservation = await this.reservationsService.create(dto)
    return {
      success: true,
      message: 'Стол успешно забронирован!',
      data: reservation,
    }
  }
}