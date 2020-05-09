/**
 * Supondo que as migrates já estejam em produção ou em controle de versão, é
 * necessário criar uma nova migration.
 */
import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1588521187722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider_id',
      type: 'uuid',
      // Cascade
      isNullable: true,
    }));

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'appointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      // OPTIONS: RESTRICT, SET NULL, CASCADE
      onDelete: 'SET NULL',
      // if the UserId change
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar',
      isNullable: false,
    }));
  }
}
