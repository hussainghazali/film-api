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
      film.name = chance.sentence({ words: 2 }); // Generate a random title with three words
      film.description = chance.sentence(); // Generate a random single sentence for description
      film.releaseDate = chance.date({ year: 2023 }); // Generate a random release date in 2023
      film.ticketPrice = chance.floating({ min: 1, max: 100, fixed: 2 }); // Generate a random ticket price between 1 and 1,000,000
      film.country = chance.country(); // Generate a random country name
      film.genre = chance.pickone(['Action', 'Comedy', 'Drama', 'Fantasy']); // Pick a random genre from the provided options
      film.photo = chance.url(); // Generate a random URL for the photo

      filmsData.push(film);
    }

    await filmRepository.save(filmsData);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const filmRepository = dataSource.getRepository(Film);

    await filmRepository.delete({});
  }
}
