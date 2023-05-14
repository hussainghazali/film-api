import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { Film } from './films.entity';
import { SearchResponse } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class ElasticsearchService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({ node: 'http://localhost:9200' });
  }

  getClient(): Client {
    return this.client;
  }

  async indexFilm(film: Film) {
    await this.client.index({
      index: 'film',
      body: film,
    });
  }

  async updateFilm(film: Film) {
    await this.client.update({
      index: 'film',
      id: film.id.toString(),
      body: { doc: film },
    });
  }

  async deleteFilm(filmId: number) {
    await this.client.delete({
      index: 'film',
      id: filmId.toString(),
    });
  }

  async searchFilms(query: string): Promise<SearchResponse<Film>> {
    return this.client.search({
      index: 'film',
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
