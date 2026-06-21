import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AccountsModule } from './modules/accounts/accounts.module';
import { UsersModule } from './modules/users/users.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PrismaModule } from './shared/database/prisma/prisma.module';
import { StatementsModule } from './modules/statements/statements.module';
import { HealthModule } from './modules/health/health.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { MetricsModule } from './modules/metrics/metrics.module';
import { MetricsInterceptor } from './modules/metrics/metrics.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MetricsModule,
    AccountsModule,
    StatementsModule,
    HealthModule,
    TransactionsModule,

    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
              }
            : undefined,
      },
    }),

    PrismaModule,

    UsersModule,
  ],
  providers: [
    {
      // Registra o MetricsInterceptor globalmente
      provide: APP_INTERCEPTOR,
      useClass: MetricsInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
