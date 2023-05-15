import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from './films.controller';
import { FilmService } from './films.service';
import { CreateFilmDto, UpdateFilmDto } from './films.dto';
import { Film } from './films.entity';

describe('FilmController', () => {
  let controller: FilmController;
  let service: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [FilmService],
    }).compile();

    controller = module.get<FilmController>(FilmController);
    service = module.get<FilmService>(FilmService);
  });

  describe('getAllFilms', () => {
    it('should return an array of films', async () => {
      const films: Film[] = [
        /* mock films */
      ];
      jest.spyOn(service, 'getAllFilms').mockResolvedValue(films);

      const result = await controller.getAllFilms();

      expect(result).toBe(films);
      expect(service.getAllFilms).toHaveBeenCalled();
    });
  });

  describe('getFilmById', () => {
    it('should return a film by ID', async () => {
      const filmId = 1;
      const film: Film = {
        id: 0,
        name: '',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
        ratings: []
      };
      jest.spyOn(service, 'getFilmById').mockResolvedValue(film);

      const result = await controller.getFilmById(filmId);

      expect(result).toBe(film);
      expect(service.getFilmById).toHaveBeenCalledWith(filmId);
    });
  });

  describe('createFilm', () => {
    it('should create a new film', async () => {
      const createFilmDto: CreateFilmDto = {
        name: '',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
        title: undefined,
        director: undefined
      };
      const createdFilm: Film = {
        id: 0,
        name: '',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
        ratings: []
      };
      jest.spyOn(service, 'createFilm').mockResolvedValue(createdFilm);

      const result = await controller.createFilm(createFilmDto);

      expect(result).toBe(createdFilm);
      expect(service.createFilm).toHaveBeenCalledWith(createFilmDto);
    });
  });

  describe('updateFilm', () => {
    it('should update a film', async () => {
      const filmId = 1;
      const updateFilmDto: UpdateFilmDto = {
        /* mock update film DTO */
      };
      const updatedFilm: Film = {
        id: 0,
        name: '',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
        ratings: []
      };
      jest.spyOn(service, 'updateFilm').mockResolvedValue(updatedFilm);

      const result = await controller.updateFilm(filmId, updateFilmDto);

      expect(result).toBe(updatedFilm);
      expect(service.updateFilm).toHaveBeenCalledWith(filmId, updateFilmDto);
    });
  });

  describe('deleteFilm', () => {
    it('should delete a film', async () => {
      const filmId = 1;
      jest.spyOn(service, 'deleteFilm').mockResolvedValue(undefined);

      const result = await controller.deleteFilm(filmId);

      expect(result).toBeUndefined();
      expect(service.deleteFilm).toHaveBeenCalledWith(filmId);
    });
  });

  describe('getFilmRatings', () => {
    it('should get ratings for a film', async () => {
      const filmId = 1;
      const filmRatings: any[] = [
        /* mock film ratings */
      ];
      jest.spyOn(service, 'getFilmRatings').mockResolvedValue(filmRatings);

      const result = await controller.getFilmRatings(filmId);

      expect(result).toBe(filmRatings);
      expect(service.getFilmRatings).toHaveBeenCalledWith(filmId);
    });
  });

  describe('searchFilms', () => {
    it('should search films by query', async () => {
      const query = 'search query';
      const films: Film[] = [
        /* mock films */
      ];
      jest.spyOn(service, 'searchFilms').mockResolvedValue(films);

      const result = await controller.searchFilms(query);

      expect(result).toBe(films);
      expect(service.searchFilms).toHaveBeenCalledWith(query);
    });
  });
});
