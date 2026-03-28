import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as nodemailer from 'nodemailer'
import { Reservation } from './reservation.entity'
import { CreateReservationDto } from './dto/create-reservation.dto'

@Injectable()
export class ReservationsService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) { }

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const existing = await this.reservationRepo.findOne({
      where: { date: dto.date, time: dto.time, location: dto.location },
    })

    if (existing) {
      throw new BadRequestException(
        'Это время уже занято. Пожалуйста, выберите другое время или место.',
      )
    }

    const reservation = this.reservationRepo.create(dto)
    const saved = await this.reservationRepo.save(reservation)

    this.sendConfirmationEmail(saved).catch((err) =>
      console.error('Email send failed:', err),
    )

    return saved
  }

  private async sendConfirmationEmail(reservation: Reservation): Promise<void> {
    await this.transporter.sendMail({
      from: `"FoodLove Restaurant" <${process.env.MAIL_USER}>`,
      to: [process.env.ADMIN_EMAIL!, reservation.email], // ✅
      subject: '🍽️ Новое бронирование стола',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; border-radius: 12px; border: 1px solid #e5e7eb;">
          <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px;">Новое бронирование</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280;">📧 Email</td><td style="font-weight: 600;">${reservation.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">👥 Гостей</td><td style="font-weight: 600;">${reservation.guests} человек</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">📅 Дата</td><td style="font-weight: 600;">${reservation.date}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">🕐 Время</td><td style="font-weight: 600;">${reservation.time}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">📍 Место</td><td style="font-weight: 600;">${reservation.location}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 13px; color: #9ca3af;">ID: ${reservation.id}</p>
        </div>
      `,
    })
  }
}