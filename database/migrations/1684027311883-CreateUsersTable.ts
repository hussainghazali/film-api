import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1684027311883 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users', // Name of the table
        columns: [
          {
            name: 'id', // Name of the column
            type: 'varchar', // Data type of the column
            length: '36', // Length of the column
            isPrimary: true, // Indicates if it's a primary key
            generationStrategy: 'increment', // Generation strategy for the column
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false, // Indicates if the column is nullable
            isUnique: true, // Indicates if the column has a unique constraint
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdOn',
            type: 'timestamp',
            default: 'NOW()', // Default value for the column
            isNullable: false,
          },
          {
            name: 'updatedOn',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true, // Indicates if the table should be created or updated
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users'); // Drop the 'users' table
  }
}
