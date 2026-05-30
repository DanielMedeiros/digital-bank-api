import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransferDto {
  @IsString()
  @IsNotEmpty()
  destinationAccountNumber: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
