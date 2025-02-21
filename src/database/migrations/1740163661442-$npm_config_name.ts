import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1740163661442 implements MigrationInterface {
    name = ' $npmConfigName1740163661442'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`social\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`href\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`description\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`social\``);
    }

}
