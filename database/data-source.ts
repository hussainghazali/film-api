import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateFilmTable1683919139346 } from './migrations/1683919139346-CreateFilmTable';
import { SeedFilmTable1683919139346 } from './migrations/1683978810184-SeedFilmTable1683919139346';
import { Film } from 'src/films/films.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreateUserTable1684027311883 } from './migrations/1684027311883-CreateUsersTable';
import { CreateRatingTable1684030454346 } from './migrations/1684030454346-CreateRatingTable';
import { RatingEntity } from 'src/rating/rating.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '0513',
  database: 'dream_drivers',
  entities: [Film, UserEntity, RatingEntity],
  migrations: [
    CreateFilmTable1683919139346,
    SeedFilmTable1683919139346,
    CreateUserTable1684027311883,
    CreateRatingTable1684030454346,
  ],
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
