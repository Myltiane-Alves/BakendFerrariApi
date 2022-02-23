import { type } from "os";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Address1645651259869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'address',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            }, {
                name: 'street',
                type: 'varchar',
                length: '191',
                isNullable: false
            }, {
                name: 'number',
                type: 'varchar',
                length: '16',
                isNullable: false,
            }, {
                name: 'complement',
                type: 'varchar',
                length: '191',
                isNullable: false
            }, {
                name: 'district',
                type: 'varchar',
                length: '191',
                isNullable: false
            }, {
                name: 'city',
                type: 'varchar',
                length: '191',
                isNullable: false
            }, {
                name: 'state',
                type: 'varchar',
                length: '191',
                isNullable: false
            }, {
                name: 'country',
                type: 'varchar',
                length: '191',
                isNullable: false
            }, {
                name: 'zipcode',
                type: 'varchar',
                length: '8',
                isNullable: false
            }, {
                name:'personId',
                type: 'int',
                isNullable: false
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
