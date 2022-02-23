import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class PaymentSituations1645655366784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'payment',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            }, {
                name: 'name',
                type: 'varchar',
                length: '45',
                isNullable: false,
            }, {
                name: 'createdAt',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP',
            }, {
                name: 'updatedAt',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP',
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
