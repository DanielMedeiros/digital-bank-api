import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Version('1')
  @Get()
  getHealth() {
    return this.healthService.getStatus();
  }

  @Version('1')
  @Get('database')
  async getDatabaseHealth() {
    return this.healthService.getDatabaseStatus();
  }
}

// FALTA A PARTIR DOS TESTES
