import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  guests: number

  @Column({ type: 'date' })
  date: string

  @Column({ type: 'time' })
  time: string

  @Column()
  location: string

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus

  @CreateDateColumn()
  createdAt: Date
}