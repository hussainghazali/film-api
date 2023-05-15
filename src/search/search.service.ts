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

  async indexFilm(film: Film): Promise<boolean> {
    try {
      await this.esService.index({
        index: this.configService.get('ELASTICSEARCH_INDEX'),
        body: film,
      });

      return true; // Film was indexed successfully
    } catch (error) {
      console.error('Failed to index film:', error);
      return false; // Film failed to index
    }
  }

  async updateFilm(film: Film) {
    await this.esService.update({
      index: this.configService.get('ELASTICSEARCH_INDEX'),
      id: film.id.toString(),
      body: { doc: film },
    });
  }

  async deleteFilm(filmId: number) {
    console.log(filmId);
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
            fields: ['name'], // Adjust the fields based on your film entity structure
            fuzziness: 'AUTO', // Handle misspelled words
            operator: 'and', // Match all search terms
          },
        },
      },
    });
  }
}
