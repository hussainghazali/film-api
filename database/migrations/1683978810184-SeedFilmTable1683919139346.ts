import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Film } from '../../src/films/films.entity';
import * as Chance from 'chance';
import dataSource from 'database/data-source';

export class SeedFilmTable1683919139346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const filmRepository = dataSource.getRepository(Film);

    const chance = new Chance();

    const filmsData = [];

    for (let i = 0; i < 10; i++) {
      const film = new Film();

      // Generate a random title with three words
      film.name = chance.sentence({ words: 2 });

      // Generate a random single sentence for description
      film.description = chance.sentence();

      // Generate a random release date in 2023
      film.releaseDate = chance.date({ year: 2023 });

      // Generate a random ticket price between 1 and 1,000,000
      film.ticketPrice = chance.floating({ min: 1, max: 100, fixed: 2 });

      // Generate a random country name
      film.country = chance.country();

      // Pick a random genre from the provided options
      film.genre = chance.pickone(['Action', 'Comedy', 'Drama', 'Fantasy']);

      // Generate a random URL for the photo
      film.photo = chance.url();

      filmsData.push(film);
    }

    // Save the films data to the film repository
    await filmRepository.save(filmsData);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const filmRepository = dataSource.getRepository(Film);

    // Delete all films from the film repository
    await filmRepository.delete({});
  }
}
