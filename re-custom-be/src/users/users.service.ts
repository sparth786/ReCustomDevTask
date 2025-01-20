import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly activityService: ActivityService,
  ) {}

  async retrieveAllUsers(
    currentPage: number,
    pageSize: number,
    orderField: string,
    sortDirection: 'asc' | 'desc',
    searchTerm: string,
  ): Promise<{ users: any[]; totalUsers: number }> {
    const queryBuilder = this.userRepo.createQueryBuilder('usr');

    if (searchTerm) {
      queryBuilder.where(
        'usr.name LIKE :searchTerm OR usr.email LIKE :searchTerm',
        {
          searchTerm: `%${searchTerm}%`,
        },
      );
    }

    queryBuilder.skip((currentPage - 1) * pageSize).take(pageSize);
    const [users, totalUsers] = await queryBuilder.getManyAndCount();

    const userMetrics = await Promise.all(
      users.map(async (user) => {
        const activityData = await this.activityService.getUsersMetrics(
          user.id,
        );
        return {
          ...user,
          logins: activityData?.metrics?.logins ?? 0,
          downloads: activityData?.metrics?.downloads ?? 0,
        };
      }),
    );

    userMetrics.sort((a, b) => {
      const aValue =
        orderField === 'logins' || orderField === 'downloads'
          ? a[orderField]
          : a[orderField];
      const bValue =
        orderField === 'logins' || orderField === 'downloads'
          ? b[orderField]
          : b[orderField];

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return { users: userMetrics, totalUsers };
  }

  async addNewUser(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepo.create(userData);
    return this.userRepo.save(newUser);
  }

  async modifyExistingUser(
    userId: number,
    updatedUserData: Partial<User>,
  ): Promise<User> {
    await this.userRepo.update(userId, updatedUserData);
    return this.userRepo.findOne({ where: { id: userId } });
  }

  async removeExistingUser(userId: number): Promise<void> {
    await this.userRepo.delete(userId);
  }
}
