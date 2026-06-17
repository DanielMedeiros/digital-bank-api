import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { httpCounter } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Incrementa o contador de requisições HTTP
    // Você pode adicionar labels aqui se quiser métricas mais detalhadas (e.g., por método, por rota)
    httpCounter.inc();

    // Continua o fluxo da requisição
    return next.handle();
  }
}
