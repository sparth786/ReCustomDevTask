import { Controller, Get, Param } from '@nestjs/common';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController {
  constructor(private readonly ActivityService: ActivityService) {}

  @Get(':id')
  async findByUser(@Param('id') id: number) {
    return this.ActivityService.getUsersMetrics(id);
  }
}
