import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { AccountsService } from './users.service';
import { User } from './entities/users.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get('list')
  async fetchAllUsers(
    @Query('page') currentPage: number = 1,
    @Query('limit') pageSize: number = 10,
    @Query('orderBy') orderField: string = 'name',
    @Query('direction') sortDirection: 'asc' | 'desc' = 'asc',
    @Query('query') searchTerm: string = '',
  ): Promise<{
    data: User[];
    meta: {
      currentPage: number;
      nextPage: number | null;
      total: number;
      remaining: number;
    };
  }> {
    const { users, totalUsers } = await this.accountService.retrieveAllUsers(
      currentPage,
      pageSize,
      orderField,
      sortDirection,
      searchTerm,
    );

    const remainingUsers =
      users.length > 0 ? totalUsers - currentPage * pageSize : 0;
    const nextPage = remainingUsers > 0 ? currentPage + 1 : null;

    return {
      data: users,
      meta: {
        currentPage,
        nextPage,
        total: totalUsers,
        remaining: remainingUsers,
      },
    };
  }

  @Post('create')
  async addUser(@Body() newUser: Partial<User>): Promise<User> {
    return this.accountService.addNewUser(newUser);
  }

  @Patch('update/:id')
  async modifyUser(
    @Param('id') userId: number,
    @Body() updatedUser: Partial<User>,
  ): Promise<User> {
    return this.accountService.modifyExistingUser(userId, updatedUser);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') userId: number): Promise<void> {
    return this.accountService.removeExistingUser(userId);
  }
}
