import { User } from 'src/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.activityLogs, { onDelete: 'CASCADE' })
  user: User;
}
