import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsUrl,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The ID of the film.' })
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The name of the film.' })
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The description of the film.' })
  description: string;

  @Column({ type: 'date' })
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ description: 'The release date of the film.' })
  releaseDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The ticket price of the film.' })
  ticketPrice: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The country of the film.' })
  country: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'The genre of the film.' })
  genre: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ description: 'The URL of the film photo.' })
  photo: string;

  // Other fields, constructors, and methods can be added here
}
