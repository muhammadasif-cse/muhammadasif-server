import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('longtext')
  description: string;

  @Column('simple-array')
  techStack: string[];

  @Column('simple-array')
  features: string[];

  @Column()
  liveUrl: string;

  @Column()
  githubUrl: string;

  @Column()
  image: string;

  @Column()
  highlightTitle: string;

  @Column('longtext')
  highlightDescription: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
