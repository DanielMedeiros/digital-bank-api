import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    example: 'john@email.com',
  })
  email: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;
}
