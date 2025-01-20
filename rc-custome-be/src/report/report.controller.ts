import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { Response } from 'express';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':userId')
  async downloadActivityReport(
    @Param('userId') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    await this.reportService.generateActivityReport(userId, res);
  }
}
