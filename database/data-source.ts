import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateFilmTable1683919139346 } from './migrations/1683919139346-CreateFilmTable';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '0513',
  database: 'dream_drivers',
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: [CreateFilmTable1683919139346],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
