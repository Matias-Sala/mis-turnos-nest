import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { TurnosService } from './turnos.service';
import { TurnoAsignado } from './models';

@Controller('turnos')
export class TurnosController {

  constructor(private turnosSvc: TurnosService) { }

  @Get('asignados')
  getTurnosAsignados(@Req() request: Request): Promise<TurnoAsignado[]> {

    const mail = request.firebaseUser.email;

    return this.turnosSvc.getTurnosAsignados(3);
  }

  @Get('servicios')
  getServicios(): Promise<TurnoAsignado[]> {
    return this.turnosSvc.getServicios();
  }

  @Get('doctores/:id/servicios')
  getServiciosByDoctor(@Param() params): Promise<TurnoAsignado[]> {
    return this.turnosSvc.getServiciosByDoctor(params.id);
  }
}
