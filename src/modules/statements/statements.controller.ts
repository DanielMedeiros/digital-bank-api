import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';

import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

import { StatementFilterDto } from './dto/statement-filter.dto';

import { StatementsService } from './statements.service';

@Controller('statements')
export class StatementsController {
  constructor(private readonly statementsService: StatementsService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get()
  async getStatement(@Req() req: any, @Query() query: StatementFilterDto) {
    return this.statementsService.getStatement(
      req.user.userId,
      query.startDate,
      query.endDate,
    );
  }
}
