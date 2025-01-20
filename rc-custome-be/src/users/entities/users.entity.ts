import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Activity } from '../../activity/entities/activity.entity';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(2, 50)
  name: string;

  @Column()
  @IsEnum(['User', 'Admin'])
  role: string;

  @Column()
  @IsEmail()
  email: string;

  @OneToMany(() => Activity, (activityLog) => activityLog.user)
  activityLogs: Activity[];
}
