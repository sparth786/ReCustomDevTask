import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/users.entity';
import { ActivityService } from 'src/activity/activity.service';
import { Response } from 'express';

@Injectable()
@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly activityService: ActivityService,
  ) {}

  async generateActivityReport(userId: number, res: Response): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['activityLogs'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const {
      metrics: { loginCount, downloadCount },
    } = await this.activityService.getUsersMetrics(userId);

    await this.activityService.createLog(
      userId,
      'generated_report',
      new Date(),
    );

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="activity_report_${user.name}.pdf"`,
    );

    doc.pipe(res);

    doc.fontSize(22).text('User Activity Report', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(14).text('User Information:', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Name: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Role: ${user.role}`);
    doc.moveDown(2);

    doc.fontSize(14).text('Activity Metrics:', { underline: true });
    doc.moveDown(0.5);
    doc.text(`Total Logins: ${loginCount || 0}`);
    doc.text(`Total Downloads: ${downloadCount || 0}`);
    doc.moveDown(2);

    doc.fontSize(14).text('Recent Activities:', { underline: true });
    doc.moveDown(0.5);

    const tableStartX = doc.x;
    const tableStartY = doc.y;
    const columnWidths = { date: 250, activityType: 200 };

    // Table Header
    doc
      .rect(
        tableStartX,
        tableStartY,
        columnWidths.date + columnWidths.activityType,
        20,
      )
      .fill('#f0f0f0');
    doc.fillColor('#000');
    doc.fontSize(12).text('Date', tableStartX + 5, tableStartY + 5, {
      width: columnWidths.date - 10,
      align: 'left',
    });
    doc.text('Activity', tableStartX + columnWidths.date + 5, tableStartY + 5, {
      width: columnWidths.activityType - 10,
      align: 'left',
    });
    doc.moveDown(1);

    doc
      .moveTo(tableStartX, tableStartY + 20)
      .lineTo(
        tableStartX + columnWidths.date + columnWidths.activityType,
        tableStartY + 20,
      )
      .stroke();

    let currentY = tableStartY + 30;
    user.activityLogs.forEach((log, index) => {
      if (currentY + 20 > doc.page.height - 50) {
        doc.addPage();
        currentY = 50;
      }

      if (index % 2 === 0) {
        doc
          .rect(
            tableStartX,
            currentY - 5,
            columnWidths.date + columnWidths.activityType,
            20,
          )
          .fill('#f9f9f9');
        doc.fillColor('#000');
      }

      const formattedDate = new Date(log.timestamp).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      doc.text(formattedDate, tableStartX + 5, currentY, {
        width: columnWidths.date - 10,
        align: 'left',
      });
      doc.text(log.type, tableStartX + columnWidths.date + 5, currentY, {
        width: columnWidths.activityType - 10,
        align: 'left',
      });

      currentY += 20;
    });

    doc
      .moveTo(tableStartX, currentY)
      .lineTo(
        tableStartX + columnWidths.date + columnWidths.activityType,
        currentY,
      )
      .stroke();

    doc.end();
  }
}
