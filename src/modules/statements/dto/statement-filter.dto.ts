import { IsOptional, IsDateString } from 'class-validator';

export class StatementFilterDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
