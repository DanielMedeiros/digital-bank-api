import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import { IdempotencyKey } from '@/shared/decorators/dempotency-key.decorator';

import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

import { TransferDto } from './dto/transfer.dto';

import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('transfer')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async transfer(
    @Req() req: any,
    @Body() body: TransferDto,
    @IdempotencyKey() idempotencyKey: string,
  ) {
    return this.transactionsService.transfer(
      req.user.userId,
      body.destinationAccountNumber,
      body.amount,
      idempotencyKey,
    );
  }
}
