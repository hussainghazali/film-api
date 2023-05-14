import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Film } from '../films/films.entity';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SearchService {
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService,
  ) {}

  async indexFilm(film: Film) {
    await this.esService.index({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body: film,
    });
  }

  async updateFilm(film: Film) {
    await this.esService.update({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      id: film.id.toString(),
      body: { doc: film },
    });
  }

  async deleteFilm(filmId: number) {
    await this.esService.delete({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      id: filmId.toString(),
    });
  }

  async searchFilms(query: string): Promise<SearchResponse<Film>> {
    return this.esService.search({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      body: {
        query: {
          multi_match: {
            query,
            fields: ['name', 'description'], // Adjust the fields based on your film entity structure
            fuzziness: 'AUTO', // Handle misspelled words
            operator: 'and', // Match all search terms
          },
        },
      },
    });
  }
}
