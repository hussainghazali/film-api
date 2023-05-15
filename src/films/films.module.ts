import { Module } from '@nestjs/common';
import { FilmService } from './films.service';
import { FilmController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films.entity';
import { RatingModule } from 'src/rating/rating.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  // Importing the necessary modules and dependencies
  imports: [TypeOrmModule.forFeature([Film]), RatingModule, SearchModule],
  // Declaring the controller that will handle film-related routes
  controllers: [FilmController],
  // Providing the service responsible for handling film-related operations
  providers: [FilmService],
})
export class FilmsModule {}
