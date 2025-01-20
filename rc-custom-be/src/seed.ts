import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AccountsService } from 'src/users/users.service';
import { ActivityService } from 'src/activity/activity.service';
import { User } from './users/entities/users.entity';

async function runSeed() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(AccountsService);
  const activityLogsService = app.get(ActivityService);

  const getRandomActivityCount = (): number => {
    return Math.floor(Math.random() * 10) + 1;
  };

  const users: Partial<User>[] = [];

  for (let i = 1; i <= 10; i++) {
    const role = i <= 5 ? 'user' : 'admin';
    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role,
    });
  }

  for (const user of users) {
    const createdUser = await userService.addNewUser(user);

    const loginsCount = getRandomActivityCount();
    const downloadsCount = getRandomActivityCount();

    for (let i = 0; i < loginsCount; i++) {
      await activityLogsService.createLog(createdUser.id, 'login', new Date());
    }

    for (let i = 0; i < downloadsCount; i++) {
      await activityLogsService.createLog(
        createdUser.id,
        'generated_report',
        new Date(),
      );
    }
  }

  console.log('Seeding complete');
  await app.close();
}

// Run the seed function
runSeed().catch((error) => {
  console.error('Error during seeding:', error);
  process.exit(1);
});
