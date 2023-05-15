import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmTable1683919139346 implements MigrationInterface {
  // Define the actions to be performed when running the migration
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'film', // Specify the table name
        columns: [
          {
            name: 'id', // Specify the column name
            type: 'int', // Specify the column type
            isPrimary: true, // Set the column as primary key
            isGenerated: true, // Enable auto generation of values for the column
            generationStrategy: 'increment', // Specify the generation strategy for the column
          },
          {
            name: 'name', // Specify the column name
            type: 'varchar', // Specify the column type
            isNullable: false, // Set the column as non-nullable
          },
          {
            name: 'description', // Specify the column name
            type: 'varchar', // Specify the column type
            isNullable: false, // Set the column as non-nullable
          },
          {
            name: 'releaseDate', // Specify the column name
            type: 'date', // Specify the column type
            isNullable: false, // Set the column as non-nullable
          },
          {
            name: 'ticketPrice', // Specify the column name
            type: 'decimal(10, 2)', // Specify the column type
            isNullable: false, // Set the column as non-nullable
          },
          {
            name: 'country', // Specify the column name
            type: 'varchar', // Specify the column type
            isNullable: false, // Set the column as non-nullable
          },
          {
            name: 'genre', // Specify the column name
            type: 'varchar', // Specify the column type
            isNullable: false, // Set the column as non-nullable
          },
          {
            name: 'photo', // Specify the column name
            type: 'varchar', // Specify the column type
            isNullable: false, // Set the column as non-nullable
          },
        ],
      }),
      true, // Specify that the table should be created with constraints
    );
  }

  // Define the actions to be performed when reverting the migration
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('film'); // Drop the 'film' table
  }
}
