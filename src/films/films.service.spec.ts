import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { FilmService } from './films.service';
import { Film } from './films.entity';
import { CreateFilmDto, UpdateFilmDto } from './films.dto';
import { SearchService } from '../search/search.service';

const mockFilmRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

const mockSearchService = {
  indexFilm: jest.fn(),
  updateFilm: jest.fn(),
  deleteFilm: jest.fn(),
  searchFilms: jest.fn(),
};

describe('FilmService', () => {
  let service: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmService,
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmRepository,
        },
        {
          provide: SearchService,
          useValue: mockSearchService,
        },
      ],
    }).compile();

    service = module.get<FilmService>(FilmService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllFilms', () => {
    it('should return an array of films', async () => {
      const mockFilms: Film[] = [
        {
          id: 1,
          name: 'Film 1',
          description: '',
          releaseDate: undefined,
          ticketPrice: 0,
          country: '',
          genre: '',
          photo: '',
          ratings: [],
        },
        {
          id: 2,
          name: 'Film 2',
          description: '',
          releaseDate: undefined,
          ticketPrice: 0,
          country: '',
          genre: '',
          photo: '',
          ratings: [],
        },
      ];
      mockFilmRepository.find.mockResolvedValue(mockFilms);

      const result = await service.getAllFilms();

      expect(result).toEqual(mockFilms);
      expect(mockFilmRepository.find).toHaveBeenCalled();
    });
  });

  describe('getFilmById', () => {
    it('should return a film by ID', async () => {
      const mockFilm: Film = {
        id: 1,
        name: 'Film 1',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
        ratings: [],
      };
      mockFilmRepository.findOne.mockResolvedValue(mockFilm);

      const result = await service.getFilmById(1);

      expect(result).toEqual(mockFilm);
      expect(mockFilmRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if film is not found', async () => {
      mockFilmRepository.findOne.mockResolvedValue(null);

      await expect(service.getFilmById(1)).rejects.toThrow(NotFoundException);
      expect(mockFilmRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('createFilm', () => {
    it('should create and return a new film', async () => {
      const createFilmDto: CreateFilmDto = {
        title: 'New Film',
        director: 'New Director',
        name: '',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
      };
      const mockFilm: Film = {
        id: 1,
        name: createFilmDto.name,
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
        ratings: [],
      };
      mockFilmRepository.create.mockReturnValue(mockFilm);
      mockFilmRepository.save.mockResolvedValue(mockFilm);
      mockSearchService.indexFilm.mockResolvedValue(true);

      const result = await service.createFilm(createFilmDto);

      expect(result).toEqual(mockFilm);
      expect(mockFilmRepository.create).toHaveBeenCalledWith(createFilmDto);
      expect(mockFilmRepository.save).toHaveBeenCalledWith(mockFilm);
      expect(mockSearchService.indexFilm).toHaveBeenCalledWith(mockFilm);
    });
  });

  describe('updateFilm', () => {
    it('should update and return the updated film', async () => {
      const filmId = 1;
      const updateFilmDto: UpdateFilmDto = {
        name: 'Update 1',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
      };
      const mockFilm: Film = {
        id: filmId,
        name: 'Film 1',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
        ratings: [],
      };
      const updatedFilm = {
        id: filmId,
        ...updateFilmDto,
        ratings: [],
      };
      mockFilmRepository.findOne.mockResolvedValue(mockFilm);
      mockFilmRepository.save.mockResolvedValue(updatedFilm);
      mockSearchService.updateFilm.mockResolvedValue(true);

      const result = await service.updateFilm(filmId, updateFilmDto);

      expect(result).toEqual(updatedFilm);
      expect(mockFilmRepository.findOne).toHaveBeenCalledWith({
        where: { id: filmId },
      });
      expect(mockFilmRepository.save).toHaveBeenCalledWith(updatedFilm);
      expect(mockSearchService.updateFilm).toHaveBeenCalledWith(updatedFilm);
    });

    it('should throw NotFoundException if film is not found', async () => {
      const filmId = 1;
      const updateFilmDto: UpdateFilmDto = {
        name: 'Updated Film',
      };
      mockFilmRepository.findOne.mockResolvedValue(null);

      await expect(service.updateFilm(filmId, updateFilmDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockFilmRepository.findOne).toHaveBeenCalledWith({
        where: { id: filmId },
      });
      expect(mockFilmRepository.save).not.toHaveBeenCalled();
      expect(mockSearchService.updateFilm).not.toHaveBeenCalled();
    });
  });

  describe('deleteFilm', () => {
    it('should delete a film', async () => {
      const filmId = 1;
      const mockFilm: Film = {
        id: filmId,
        name: 'Film 1',
        description: '',
        releaseDate: undefined,
        ticketPrice: 0,
        country: '',
        genre: '',
        photo: '',
        ratings: [],
      };
      mockFilmRepository.findOne.mockResolvedValue(mockFilm);
      mockSearchService.deleteFilm.mockResolvedValue(true);
      mockFilmRepository.remove.mockResolvedValue(undefined);

      await service.deleteFilm(filmId);

      expect(mockFilmRepository.findOne).toHaveBeenCalledWith({
        where: { id: filmId },
      });
      expect(mockSearchService.deleteFilm).toHaveBeenCalledWith(filmId);
      expect(mockFilmRepository.remove).toHaveBeenCalledWith(mockFilm);
    });

    it('should throw NotFoundException if film is not found', async () => {
      const filmId = 1;
      mockFilmRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteFilm(filmId)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockFilmRepository.findOne).toHaveBeenCalledWith({
        where: { id: filmId },
      });
      expect(mockSearchService.deleteFilm).not.toHaveBeenCalled();
      expect(mockFilmRepository.remove).not.toHaveBeenCalled();
    });
  });

  describe('getFilmRatings', () => {
    it('should return the ratings of a film', async () => {
      const filmId = 1;
      const mockFilm: Film = {
        id: filmId,
        title: 'Film 1',
        director: 'Director 1',
        ratings: [5, 4, 3],
      };
      mockFilmRepository.find.mockResolvedValue([mockFilm]);

      const result = await service.getFilmRatings(filmId);

      expect(result).toEqual(mockFilm.ratings);
      expect(mockFilmRepository.find).toHaveBeenCalledWith({
        where: { id: filmId },
        relations: ['ratings'],
      });
    });

    it('should return an empty array if film is not found', async () => {
      const filmId = 1;
      mockFilmRepository.find.mockResolvedValue([]);

      const result = await service.getFilmRatings(filmId);

      expect(result).toEqual([]);
      expect(result).toEqual([]);
      expect(mockFilmRepository.find).toHaveBeenCalledWith({
        where: { id: filmId },
        relations: ['ratings'],
      });
    });
  });

  describe('searchFilms', () => {
    it('should return an array of films matching the search query', async () => {
      const query = 'film';
      const mockFilms: Film[] = [
        {
          id: 1,
          name: 'Film 1',
          description: '',
          releaseDate: undefined,
          ticketPrice: 0,
          country: '',
          genre: '',
          photo: '',
          ratings: [],
        },
        {
          id: 2,
          name: 'Film 2',
          description: '',
          releaseDate: undefined,
          ticketPrice: 0,
          country: '',
          genre: '',
          photo: '',
          ratings: [],
        },
      ];
      const mockSearchResponse = {
        hits: {
          hits: mockFilms.map((film) => ({ _source: film })),
        },
      };
      mockSearchService.searchFilms.mockResolvedValue(mockSearchResponse);

      const result = await service.searchFilms(query);

      expect(result).toEqual(mockFilms);
      expect(mockSearchService.searchFilms).toHaveBeenCalledWith(query);
    });
  });
});
