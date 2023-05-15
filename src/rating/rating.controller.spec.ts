import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './create-rating.dto';
import { AuthenticatedRequest } from 'src/auth/authenticated-request';

describe('RatingController', () => {
  let controller: RatingController;
  let service: RatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingController],
      providers: [RatingService],
    }).compile();

    controller = module.get<RatingController>(RatingController);
    service = module.get<RatingService>(RatingService);
  });

  describe('createRating', () => {
    it('should create a new rating', async () => {
      // Mock data
      const createRatingDto: CreateRatingDto = {
        filmId: 1,
        rating: 4.5,
        comment: 'Good Movie',
      };

      const request: AuthenticatedRequest = {
        user: { id: '1', username: 'testuser' },
      };

      // Mock service method
      const createRatingSpy = jest.spyOn(service, 'createRating');

      // Make the request to the controller
      const result = await controller.createRating(createRatingDto, request);

      // Check the result
      expect(result).toEqual({ id: 1, ...createRatingDto });
      expect(createRatingSpy).toHaveBeenCalledWith(
        createRatingDto,
        request.user,
      );
    });
  });
});
