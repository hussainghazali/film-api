import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsUrl,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({ description: 'The name of the film.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the film.' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The release date of the film.' })
  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @ApiProperty({ description: 'The ticket price of the film.' })
  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

  @ApiProperty({ description: 'The country of the film.' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({ description: 'The genre of the film.' })
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty({ description: 'The URL of the film photo.' })
  @IsNotEmpty()
  @IsUrl()
  photo: string;
}

export class UpdateFilmDto {
  @ApiProperty({ description: 'The name of the film.' })
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The description of the film.' })
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The release date of the film.' })
  @IsDateString()
  releaseDate?: Date;

  @ApiProperty({ description: 'The ticket price of the film.' })
  @IsNumber()
  ticketPrice?: number;

  @ApiProperty({ description: 'The country of the film.' })
  @IsString()
  country?: string;

  @ApiProperty({ description: 'The genre of the film.' })
  @IsString()
  genre?: string;

  @ApiProperty({ description: 'The URL of the film photo.' })
  @IsUrl()
  photo?: string;
}
