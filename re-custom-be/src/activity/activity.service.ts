import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { User } from '../users/entities/users.entity'; // Assuming you have the User entity
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createLog(userId: number, activity: string, time: Date): Promise<void> {
    const newActivityLog = new Activity();
    newActivityLog.user = { id: userId } as any;
    newActivityLog.type = activity;
    newActivityLog.timestamp = time;

    await this.activityRepository.save(newActivityLog);
  }

  async getUsersMetrics(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['activityLogs'],
    });

    if (!user) {
      throw new Error('User Does not exist');
    }

    const totaLoginsCount = await this.activityRepository.count({
      where: { user: { id }, type: 'login' },
    });

    const totalDownloadsCount = await this.activityRepository.count({
      where: { user: { id }, type: 'generated_report' },
    });

    return {
      user,
      metrics: {
        logins: totaLoginsCount,
        downloads: totalDownloadsCount,
      },
    };
  }
}
