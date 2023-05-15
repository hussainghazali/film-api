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

  // Apply AuthGuard to protect the route
  @UseGuards(AuthGuard())
  // Specify the use of Bearer token authentication in Swagger
  @ApiBearerAuth()
  // Define the expected request body in Swagger
  @ApiBody({ type: CreateRatingDto })
  // Apply JwtAuthGuard to protect the route
  @UseGuards(JwtAuthGuard)
  @Post()
  async createRating(
    @Body() createRatingDto: CreateRatingDto,
    @Req() request: AuthenticatedRequest,
  ) {
    // Call the rating service to create a new rating
    return this.ratingService.createRating(createRatingDto, request);
  }
}
