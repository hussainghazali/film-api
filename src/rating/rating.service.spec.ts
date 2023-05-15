import { Test, TestingModule } from '@nestjs/testing';
import { RatingService } from './rating.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RatingEntity } from './rating.entity';
import { Film } from 'src/films/films.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreateRatingDto } from './create-rating.dto';
import { AuthenticatedRequest } from 'src/auth/authenticated-request';

describe('RatingService', () => {
  let ratingService: RatingService;
  let ratingRepository: Repository<RatingEntity>;
  let filmRepository: Repository<Film>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        {
          provide: getRepositoryToken(RatingEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Film),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    ratingService = module.get<RatingService>(RatingService);
    ratingRepository = module.get<Repository<RatingEntity>>(
      getRepositoryToken(RatingEntity),
    );
    filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('createRating', () => {
    it('should create a new rating', async () => {
      // Mock data
      const createRatingDto: CreateRatingDto = {
        filmId: 1,
        rating: 4,
        comment: '',
      };
      const request: AuthenticatedRequest = {
        user: {
          id: 1,
        },
      };
      const ratingEntity = new RatingEntity();
      ratingEntity.rating = createRatingDto.rating;
      const userEntity = new UserEntity();
      const filmEntity = new Film();
      filmEntity.ratings = [ratingEntity];

      // Mock repository methods
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(userEntity);
      jest.spyOn(filmRepository, 'findOne').mockResolvedValue(filmEntity);
      jest.spyOn(ratingRepository, 'create').mockReturnValue(ratingEntity);
      jest.spyOn(ratingRepository, 'save').mockResolvedValue(ratingEntity);

      // Create rating
      const result = await ratingService.createRating(createRatingDto, request);

      // Assertions
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(filmRepository.findOne).toHaveBeenCalledWith({
        where: { id: createRatingDto.filmId },
        relations: ['ratings'],
      });
      expect(ratingRepository.create).toHaveBeenCalledWith(createRatingDto);
      expect(ratingRepository.save).toHaveBeenCalledWith(ratingEntity);
      expect(result).toEqual(ratingEntity);
    });
  });
});
