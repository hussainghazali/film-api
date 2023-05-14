import { Module } from '@nestjs/common';
import { FilmService } from './films.service';
import { FilmController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films.entity';
import { RatingModule } from 'src/rating/rating.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([Film]), RatingModule, SearchModule],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmsModule {}
