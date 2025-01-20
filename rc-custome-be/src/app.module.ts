import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ActivityModule } from './activity/activity.module';
import { User } from './users/entities/users.entity';
import { Activity } from './activity/entities/activity.entity';
import { ReportModule } from './report/report.module';
import { ReportService } from './report/report.service';
import { ReportController } from './report/report.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Activity],
      synchronize: true,
    }),
    UsersModule,
    ActivityModule,
    ReportModule,
  ],
  controllers: [AppController, ReportController],
  providers: [AppService, ReportService],
})
export class AppModule {}
