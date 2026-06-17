import { Controller, Get, Res, Version } from '@nestjs/common';
import { Response } from 'express';

import { register } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  @Version('1') // Aplique o @Version diretamente no método para evitar o erro TS1238/TS1270
  @Get()
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  }
}
