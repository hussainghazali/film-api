import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './films.entity';
import { CreateFilmDto, UpdateFilmDto } from './films.dto';
import { SearchService } from '../search/search.service';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    private readonly elasticsearchService: SearchService,
  ) {}

  /**
   * Get all films
   * @returns A list of films
   */
  async getAllFilms() {
    return this.filmRepository.find();
  }

  /**
   * Get a film by ID
   * @param id The ID of the film
   * @returns The film with the specified ID
   */
  async getFilmById(id: number) {
    return this.filmRepository.findOne({ where: { id } });
  }

  /**
   * Create a new film
   * @param createFilmDto The data for creating a film
   * @returns The created film
   */
  async createFilm(createFilmDto: CreateFilmDto) {
    const film = this.filmRepository.create(createFilmDto);
    const savedFilm = await this.filmRepository.save(film);
    const data = await this.elasticsearchService.indexFilm(savedFilm);
    console.log('check data', data);
    return savedFilm;
  }

  /**
   * Update a film by ID
   * @param id The ID of the film to update
   * @param updateFilmDto The updated data for the film
   * @returns The updated film
   * @throws NotFoundException if the film is not found
   */
  async updateFilm(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmRepository.findOne({ where: { id } });
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    const updatedFilm = { ...film, ...updateFilmDto };
    const savedFilm = await this.filmRepository.save(updatedFilm);
    await this.elasticsearchService.updateFilm(savedFilm);
    return savedFilm;
  }

  /**
   * Delete a film by ID
   * @param id The ID of the film to delete
   * @throws NotFoundException if the film is not found
   */
  async deleteFilm(id: number) {
    const film = await this.filmRepository.findOne({ where: { id } });
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    // Delete the document from Elasticsearch
    await this.elasticsearchService.deleteFilm(film.id);

    // Remove the record from the local database
    await this.filmRepository.remove(film);
  }

  /**
   * Get the ratings of a film
   * @param filmId The ID of the film
   * @returns The ratings of the film
   */
  async getFilmRatings(filmId: number) {
    const film = await this.filmRepository.find({
      where: { id: filmId },
      relations: ['ratings'],
    });
    return film[0]?.ratings || [];
  }

  /**
   * Search films by query
   * @param query The search query
   * @returns A list of films matching the query
   */
  async searchFilms(query: string): Promise<Film[]> {
    const searchResponse = await this.elasticsearchService.searchFilms(query);
    const hits = searchResponse.hits.hits;
    const films = hits.map((hit) => hit._source as Film);
    return films;
  }
}
