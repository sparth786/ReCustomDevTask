import { Module } from '@nestjs/common';
import { AccountsService } from './users.service';
import { AccountsController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ActivityModule],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService, TypeOrmModule],
})
export class UsersModule {}
