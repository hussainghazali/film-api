import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateFilmTable1683919139346 } from './migrations/1683919139346-CreateFilmTable';
import { SeedFilmTable1683919139346 } from './migrations/1683978810184-SeedFilmTable1683919139346';
import { Film } from 'src/films/films.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreateUserTable1684027311883 } from './migrations/1684027311883-CreateUsersTable';
import { CreateRatingTable1684030454346 } from './migrations/1684030454346-CreateRatingTable';
import { RatingEntity } from 'src/rating/rating.entity';

// Define the options for the data source
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql', // Specify the database type
  host: 'localhost', // Specify the database host
  port: 3306, // Specify the database port
  username: 'root', // Specify the database username
  password: '0513', // Specify the database password
  database: 'dream_drivers', // Specify the database name
  entities: [Film, UserEntity, RatingEntity], // Specify the entity classes to be used
  migrations: [
    // Specify the migration classes
    CreateFilmTable1683919139346,
    SeedFilmTable1683919139346,
    CreateUserTable1684027311883,
    CreateRatingTable1684030454346,
  ],
  synchronize: true, // Automatically synchronize the database schema with the entities
  logging: true, // Enable logging
};

// Create a new instance of the data source with the options
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
