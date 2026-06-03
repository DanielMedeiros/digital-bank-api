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
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Version('1')
  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Version('1')
  @ApiOperation({
    summary: 'Get current user details',
  })
  @ApiResponse({
    status: 200,
    description: 'Current user details retrieved successfully',
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: any) {
    return req.user;
  }
}
