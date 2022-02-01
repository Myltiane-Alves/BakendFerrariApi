import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1643737310679 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'persons',
            columns:[{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            }, {
                name: 'name',
                type: 'varchar',
                length: '250',
                isNullable: false
            }, {
                name: 'birthAt',
                type: 'date',
                isNullable: true
            }, {
                name: 'phone',
                type: 'varchar',
                length: '16',
                isNullable: true
            }, {
                name: 'createdAt',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP'
            }, {
                name: 'updatedAt',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP'
            }]
        }));

        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [{
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                name: 'email',
                type: 'varchar',
                length: '250',
                isNullable: false,
                isUnique: true,
            }, {
                name: 'password',
                type: 'varchar',
                length: '255',
                isNullable: false,
            }, {
                name: 'photo',
                type: 'varchar',
                length: '255',
                isNullable: true
            }, {
                name: 'personId',
                type: 'detetime',
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
        await queryRunner.dropTable("persons")
        await queryRunner.dropTable("users")
    }

}
