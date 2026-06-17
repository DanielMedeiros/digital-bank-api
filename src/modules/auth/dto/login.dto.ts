import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    example: 'john@email.com',
  })
  @IsEmail({}, { message: 'O e-mail deve ser um endereço válido.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString({ message: 'A senha deve ser uma string.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}
