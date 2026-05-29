import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';

import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

import { AccountsService } from './accounts.service';

import { DepositDto } from './dto/deposit.dto';
import { WithdrawDto } from './dto/withdraw.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    return this.accountsService.findByUserId(req.user.userId);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('deposit')
  async deposit(@Req() req: any, @Body() body: DepositDto) {
    return this.accountsService.deposit(req.user.userId, body.amount);
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  async withdraw(@Req() req: any, @Body() body: WithdrawDto) {
    return this.accountsService.withdraw(req.user.userId, body.amount);
  }
}
