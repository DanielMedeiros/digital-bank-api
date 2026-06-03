import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class TransferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '260-123456',
  })
  destinationAccountNumber: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    example: 50,
  })
  amount: number;
}
