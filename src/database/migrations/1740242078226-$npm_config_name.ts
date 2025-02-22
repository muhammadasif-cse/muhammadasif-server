import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1740242078226 implements MigrationInterface {
    name = ' $npmConfigName1740242078226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`blogId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`parentCommentId\` varchar(255) NULL, \`comment\` mediumtext NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_42a37ec3be9f871d4e44dd21bf9\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4875672591221a61ace66f2d4f9\` FOREIGN KEY (\`parentCommentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4875672591221a61ace66f2d4f9\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_42a37ec3be9f871d4e44dd21bf9\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`comments\``);
    }

}
