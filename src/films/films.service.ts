import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './films.entity';
import { CreateFilmDto, UpdateFilmDto } from './films.dto';
import { ElasticsearchService } from './elasticsearch.service';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async getAllFilms() {
    return this.filmRepository.find();
  }

  async getFilmById(id: string) {
    return this.filmRepository.findOneById(id);
  }

  async createFilm(createFilmDto: CreateFilmDto) {
    const film = this.filmRepository.create(createFilmDto);
    const savedFilm = await this.filmRepository.save(film);
    await this.elasticsearchService.indexFilm(savedFilm);
    return savedFilm;
  }

  async updateFilm(id: string, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmRepository.findOneById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    const updatedFilm = { ...film, ...updateFilmDto };
    const savedFilm = await this.filmRepository.save(updatedFilm);
    await this.elasticsearchService.updateFilm(savedFilm);
    return savedFilm;
  }

  async deleteFilm(id: string) {
    const film = await this.filmRepository.findOneById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    await this.filmRepository.remove(film);
    await this.elasticsearchService.deleteFilm(film.id);
  }

  async getFilmRatings(filmId: number) {
    const film = await this.filmRepository.find({
      where: { id: filmId },
      relations: ['ratings'],
    });
    return film[0]?.ratings || [];
  }

  async searchFilms(query: string): Promise<Film[]> {
    const searchResponse = await this.elasticsearchService.searchFilms(query);
    const hits = searchResponse.hits.hits;
    const films = hits.map((hit) => hit._source as Film);
    return films;
  }
}
