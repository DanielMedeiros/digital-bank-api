import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { AccountsModule } from './modules/accounts/accounts.module';
import { UsersModule } from './modules/users/users.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PrismaModule } from './shared/database/prisma/prisma.module';
import { StatementsModule } from './modules/statements/statements.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    AuthModule,
    AccountsModule,
    StatementsModule,
    HealthModule,
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

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
})
export class AppModule {}
