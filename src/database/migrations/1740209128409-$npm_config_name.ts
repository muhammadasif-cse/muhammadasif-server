import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1740209128409 implements MigrationInterface {
    name = ' $npmConfigName1740209128409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`skill\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`note\` longtext NOT NULL, \`message\` longtext NOT NULL, \`img\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`description\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`highlightDescription\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`highlightDescription\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`highlightDescription\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`highlightDescription\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`skill\``);
    }

}
