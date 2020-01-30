import { Injectable, Inject } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { TurnoAsignado } from './models';
import { sequelize } from 'src/database/sequelize';

@Injectable()
export class TurnosService {

  async getTurnosAsignados(usuarioId: number): Promise<TurnoAsignado[]> {

    const query = `select T.Nro_Turno  as turnoId, T.Orden_Prestacion , T.Fecha ,T.Hora , T.Nro_Servicio as servicioId , S.Servicio as servicioNombre, T.Nro_Doctor as doctorId , D.Doctor as doctorNombre,
    T.Nro_Paciente as pacienteId , P.Paciente as pacienteNombre , T.Observaciones
      from tb_Turnos T inner join tb_Servicios S on T.nro_servicio = S.nro_servicio
      inner join tb_Doctores D on T.nro_doctor  = D.nro_doctor
      inner join tb_Pacientes P on T.nro_paciente = P.nro_paciente
      left join tb_Turnos_Web TW on T.nro_turno = TW.nro_turno
      where ( T.nro_paciente = :usuarioId or tw.nro_usuario_entrego = :usuarioId)
          and T.fecha >= cast(getdate() As date)
          and T.hora >= getdate()`;

    let result: TurnoAsignado[] = [];

    await sequelize.query<TurnoAsignado>(query, { replacements: { usuarioId: 3 }, type: QueryTypes.SELECT })
      .then((users) => result = users);

    return result;
  }
}
