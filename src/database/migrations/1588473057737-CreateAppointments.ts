import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1588473057737 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id', // UUID
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            /*
             * 'uuid_generate_v4()'
             * Necessary to assign value in id, like a construcctor method
             * for uuid value in id column
            */
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // Prop do Postgre
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
