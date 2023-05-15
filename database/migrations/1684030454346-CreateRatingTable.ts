import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRatingTable1684030454346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create ratings table
    await queryRunner.createTable(
      new Table({
        name: 'ratings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'rating',
            type: 'int',
          },
          {
            name: 'comment',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'film_id',
            type: 'int',
          },
        ],
      }),
      true,
    );

    // Create foreign key for user_id referencing users table
    await queryRunner.createForeignKey(
      'ratings',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    // Create foreign key for film_id referencing film table
    await queryRunner.createForeignKey(
      'ratings',
      new TableForeignKey({
        columnNames: ['film_id'],
        referencedTableName: 'film',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Retrieve ratings table
    const table = await queryRunner.getTable('ratings');

    // Find foreign key for user_id
    const foreignKeyUser = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );

    // Find foreign key for film_id
    const foreignKeyFilm = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('film_id') !== -1,
    );

    // Drop foreign keys
    await queryRunner.dropForeignKey('ratings', foreignKeyUser);
    await queryRunner.dropForeignKey('ratings', foreignKeyFilm);

    // Drop ratings table
    await queryRunner.dropTable('ratings');
  }
}
