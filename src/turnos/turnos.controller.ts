import { Controller, Get, Param, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { TurnosService } from './turnos.service';
import { TurnoAsignado, Paciente, Doctor } from './models';

@Controller('turnos')
export class TurnosController {

  constructor(private turnosSvc: TurnosService) { }

  @Get('pacientess')
  getPacientes(@Query() query): Paciente {
    return new Paciente(1);
  }

  @Get('pacientes')
  getPaciente(@Query() query): Promise<Paciente> {
    return this.turnosSvc.getPaciente({ email: query.email });
  }

  @Get('asignados')
  getTurnosAsignados(@Req() request: Request): Promise<TurnoAsignado[]> {

    const email = request.firebaseUser.email;

    const turnos = this.turnosSvc.getPaciente({ dni: '', email })
      .then((paciente) => {
        return this.turnosSvc.getTurnosAsignados(paciente.id);
      });

    return turnos;
  }

  @Get('servicios')
  getServicios(): Promise<TurnoAsignado[]> {
    return this.turnosSvc.getServicios();
  }

  @Get('doctores/:id/servicios')
  getServiciosByDoctor(@Param() params): Promise<TurnoAsignado[]> {
    return this.turnosSvc.getServiciosByDoctor(params.id);
  }

  @Get('doctores')
  getDoctores(): Promise<Doctor[]> {
    return this.turnosSvc.getDoctores();
  }

  @Get('servicios/:id/doctores')
  getDoctoresByServicio(@Param() params): Promise<Doctor[]> {
    return this.turnosSvc.getDoctoresByServicio(params.id);
  }
}
