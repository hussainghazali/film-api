import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './create-rating.dto';
import { RatingEntity } from './rating.entity';
import { Film } from 'src/films/films.entity';
import { UserEntity } from 'src/user/user.entity';
import { AuthenticatedRequest } from 'src/auth/authenticated-request';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createRating(
    createRatingDto: CreateRatingDto,
    request: AuthenticatedRequest,
  ) {
    const { filmId, ...ratingDto } = createRatingDto;

    const rating = this.ratingRepository.create(ratingDto);

    const userId = request.user.id;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['ratings'],
    });

    rating.user = user;
    rating.film = film;

    return await this.ratingRepository.save(rating);
  }
}
