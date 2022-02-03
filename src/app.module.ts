import { PrismaModule } from './prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';

@Module({
  imports: [
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
