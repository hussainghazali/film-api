import { Module } from '@nestjs/common';
import { FilmService } from './films.service';
import { FilmController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film])],
  providers: [FilmService],
  controllers: [FilmController],
})
export class FilmsModule {}
