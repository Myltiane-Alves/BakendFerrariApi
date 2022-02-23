import {Column, MigrationInterface, QueryRunner} from "typeorm";
import { columnId } from "./columns/columnId";

export class Service1645580053914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable({
            name: 'services',
            columns: [columnId, {
            
            },    columnCreatedAt, ];
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
