import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmTable1623423540000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'film',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'releaseDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'ticketPrice',
            type: 'decimal(10, 2)',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'genre',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'photo',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('film');
  }
}
