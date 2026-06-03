import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class DepositDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    example: 500,
  })
  amount: number;
}
