import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1740322700767 implements MigrationInterface {
    name = ' $npmConfigName1740322700767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`skills\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`note\` longtext NOT NULL, \`message\` longtext NOT NULL, \`img\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`socials\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`href\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` varchar(36) NOT NULL, \`blogId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`parentCommentId\` varchar(255) NULL, \`comment\` mediumtext NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`likes\` (\`id\` varchar(36) NOT NULL, \`blogId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_9ec63b432f7715ca38af5d0f6b\` (\`blogId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blogs\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` longtext NULL, \`authorId\` varchar(255) NULL, \`status\` enum ('draft', 'published', 'archived') NOT NULL DEFAULT 'draft', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ratings\` (\`id\` varchar(36) NOT NULL, \`blogId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, \`rating\` enum ('1', '2', '3', '4', '5') NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_19bb40112239c43ba77b1b8c4e\` (\`blogId\`, \`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`techStack\` text NOT NULL, \`features\` text NOT NULL, \`liveUrl\` varchar(255) NOT NULL, \`githubUrl\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`highlightTitle\` varchar(255) NOT NULL, \`highlightDescription\` longtext NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_42a37ec3be9f871d4e44dd21bf9\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4875672591221a61ace66f2d4f9\` FOREIGN KEY (\`parentCommentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_f9a631b0c487820ee8d5df0cce2\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ratings\` ADD CONSTRAINT \`FK_f9a33d1e1038bb8749631712b17\` FOREIGN KEY (\`blogId\`) REFERENCES \`blogs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ratings\` DROP FOREIGN KEY \`FK_f9a33d1e1038bb8749631712b17\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_f9a631b0c487820ee8d5df0cce2\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4875672591221a61ace66f2d4f9\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_42a37ec3be9f871d4e44dd21bf9\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_19bb40112239c43ba77b1b8c4e\` ON \`ratings\``);
        await queryRunner.query(`DROP TABLE \`ratings\``);
        await queryRunner.query(`DROP TABLE \`blogs\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ec63b432f7715ca38af5d0f6b\` ON \`likes\``);
        await queryRunner.query(`DROP TABLE \`likes\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`socials\``);
        await queryRunner.query(`DROP TABLE \`skills\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
