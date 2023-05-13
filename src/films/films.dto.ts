import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsUrl()
  photo: string;
}

export class UpdateFilmDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsDateString()
  releaseDate?: Date;

  @IsNumber()
  ticketPrice?: number;

  @IsString()
  country?: string;

  @IsString()
  genre?: string;

  @IsUrl()
  photo?: string;
}
