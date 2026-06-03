import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class WithdrawDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    example: 100,
  })
  amount: number;
}
