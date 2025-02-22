import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1740240585631 implements MigrationInterface {
    name = ' $npmConfigName1740240585631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`comment\` \`comment\` mediumtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`comment\` \`comment\` mediumtext NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL`);
    }

}
