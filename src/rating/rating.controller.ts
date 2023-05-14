import { Controller, UseGuards, Post, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './create-rating.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { AuthenticatedRequest } from 'src/auth/authenticated-request';

@ApiTags('Ratings')
@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiBody({ type: CreateRatingDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createRating(
    @Body() createRatingDto: CreateRatingDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.ratingService.createRating(createRatingDto, request);
  }
}
