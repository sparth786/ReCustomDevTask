import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { UsersModule } from 'src/users/users.module';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  imports: [UsersModule, ActivityModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
