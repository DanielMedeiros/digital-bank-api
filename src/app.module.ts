import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
})
export class AppModule {}
