import { Body, Controller, Post, Version } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
