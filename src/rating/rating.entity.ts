import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { Film } from '../films/films.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('ratings')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The ID of the rating.' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The rating value.' })
  rating: number;

  @Column()
  @ApiProperty({ description: 'The comment for the rating.' })
  comment: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty({ description: 'The user who made the rating.' })
  user: UserEntity;

  @ManyToOne(() => Film)
  @JoinColumn({ name: 'film_id' })
  @ApiProperty({ description: 'The film being rated.' })
  film: Film;
}
