import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Blog } from './blog.entity';

@Entity('ratings')
@Unique(['blogId', 'userId'])
@Check('"rating" BETWEEN 1 AND 5')
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  blogId: string;

  @Column()
  userId: string;

  @Column({ type: 'enum', enum: [1, 2, 3, 4, 5], nullable: false })
  rating: number;

  @ManyToOne(() => Blog, (blog) => blog.ratings, { onDelete: 'CASCADE' })
  blog: Blog;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
