import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({ description: 'The ID of the film', example: 1 })
  filmId: number;

  @ApiProperty({ description: 'The rating value', example: 4.5 })
  rating: number;

  @ApiProperty({ description: 'The comment', example: 'Great film!' })
  comment: string;
}
