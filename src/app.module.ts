import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TurnosModule } from './turnos/turnos.module';

@Module({
  imports: [TurnosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
