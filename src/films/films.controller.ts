import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { FilmService } from './films.service';
import { CreateFilmDto, UpdateFilmDto } from './films.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Film } from './films.entity';

@ApiTags('films')
@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieved all films successfully.',
    type: Film,
    isArray: true,
  })
  getAllFilms() {
    return this.filmService.getAllFilms();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Film ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved film by ID successfully.',
    type: Film,
  })
  getFilmById(@Param('id') id: string) {
    return this.filmService.getFilmById(id);
  }

  @Post()
  @ApiBody({ type: CreateFilmDto })
  @ApiResponse({
    status: 201,
    description: 'Film created successfully.',
    type: Film,
  })
  createFilm(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.createFilm(createFilmDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Film ID' })
  @ApiBody({ type: UpdateFilmDto })
  @ApiResponse({
    status: 200,
    description: 'Film updated successfully.',
    type: Film,
  })
  updateFilm(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.updateFilm(id, updateFilmDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Film ID' })
  @ApiResponse({
    status: 200,
    description: 'Film deleted successfully.',
  })
  deleteFilm(@Param('id') id: string) {
    return this.filmService.deleteFilm(id);
  }

  @Get(':id/ratings')
  @ApiParam({ name: 'id', description: 'The ID of the film' })
  @ApiResponse({
    status: 200,
    description: 'Retrieved film by ID successfully.',
  })
  async getFilmRatings(@Param('id') id: number) {
    return this.filmService.getFilmRatings(id);
  }
}
