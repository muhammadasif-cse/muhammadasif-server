import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1740158283934 implements MigrationInterface {
    name = ' $npmConfigName1740158283934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`techStack\` text NOT NULL, \`features\` text NOT NULL, \`liveUrl\` varchar(255) NOT NULL, \`githubUrl\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`highlightTitle\` varchar(255) NOT NULL, \`highlightDescription\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
