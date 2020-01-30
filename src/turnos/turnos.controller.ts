import { Controller, Get } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnoAsignado } from './models';

@Controller('turnos')
export class TurnosController {

  constructor(private turnosSvc: TurnosService) { }

  @Get('asignados')
  getTurnosAsignados(): Promise<TurnoAsignado[]> {
    return this.turnosSvc.getTurnosAsignados(1);
  }
}
