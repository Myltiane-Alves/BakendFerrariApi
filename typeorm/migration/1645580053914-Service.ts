import { MigrationInterface, QueryRunner, Table} from "typeorm";
import { columnCreatedAt, columnUpdatedAt, columnVarchar, columnId } from "./columns";

export class Service1645580053914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "services",
            columns: [
                columnId,
                columnVarchar('45'),
                {
                    name: "description",
                    type: "mediumtext",
                },
                {
                    name: "price",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                },
                columnCreatedAt,
                columnUpdatedAt
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('services');
    }

}
