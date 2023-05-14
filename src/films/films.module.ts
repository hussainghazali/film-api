import { Module } from '@nestjs/common';
import { FilmService } from './films.service';
import { FilmController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films.entity';
import { RatingModule } from 'src/rating/rating.module';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film]), RatingModule],
  controllers: [FilmController],
  providers: [FilmService, ElasticsearchService],
})
export class FilmsModule {}
