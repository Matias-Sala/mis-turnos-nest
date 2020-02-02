import { Injectable, Inject } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { TurnoAsignado, Servicio, Doctor, Paciente, PacienteParameters } from './models';
import { sequelize } from 'src/database/sequelize';

@Injectable()
export class TurnosService {

  async getTurnosAsignados(usuarioId: number): Promise<TurnoAsignado[]> {

    const query = `select T.Nro_Turno as turnoId, T.Orden_Prestacion , T.Fecha As fecha,T.Hora As hora, T.Nro_Servicio as servicioId ,
        S.Servicio as servicioNombre, T.Nro_Doctor as doctorId , D.Doctor as doctorNombre,
        T.Nro_Paciente as pacienteId , P.Paciente as pacienteNombre , T.Observaciones As observaciones
      from tb_Turnos T inner join tb_Servicios S on T.nro_servicio = S.nro_servicio
      inner join tb_Doctores D on T.nro_doctor  = D.nro_doctor
      inner join tb_Pacientes P on T.nro_paciente = P.nro_paciente
      left join tb_Turnos_Web TW on T.nro_turno = TW.nro_turno
      where ( T.nro_paciente = :usuarioId or tw.nro_usuario_entrego = :usuarioId)
          and T.fecha >= cast(getdate() As date)
          and T.hora >= getdate()`;

    let result: TurnoAsignado[] = [];

    await sequelize.query<TurnoAsignado>(query, { replacements: { usuarioId }, type: QueryTypes.SELECT })
      .then((users) => result = users);

    return result;
  }

  async getServicios(): Promise<Servicio[]> {

    const query = `Select nro_servicio as Id, servicio as Nombre From tb_Servicios
                   Where activo = 'true'`;

    let result: Servicio[] = [];

    await sequelize.query<Servicio>(query, { type: QueryTypes.SELECT })
      .then((servicios) => result = servicios);

    return result;
  }

  async getServiciosByDoctor(id: number): Promise<Servicio[]> {

    const query = `select DocServ.nro_servicio as Id, Serv.servicio as Nombre
                  from  tb_Doctores_Servicios DocServ
                  inner join tb_Servicios Serv on DocServ.nro_servicio = Serv.nro_servicio
                  inner join tb_Doctores Doc on DocServ.nro_doctor = Doc.nro_doctor
                  where Doc.activo = 'true' and Doc.nro_doctor =  :id`;

    let result: Servicio[] = [];

    await sequelize.query<Servicio>(query, { replacements: { id }, type: QueryTypes.SELECT })
      .then((servicios) => result = servicios);

    return result;
  }

  async getDoctores(): Promise<Doctor[]> {

    const query = `select nro_doctor as Id, doctor as Nombre from tb_Doctores
                   where activo = 'true'`;

    let result: Doctor[] = [];

    await sequelize.query<Doctor>(query, { type: QueryTypes.SELECT })
      .then((doctores) => result = doctores);

    return result;
  }

  async getDoctoresByServicio(id: number): Promise<Doctor[]> {

    const query = `select DocServ.nro_doctor as Id, doc.doctor as Nombre from  [tb_Doctores_Servicios] DocServ
                  inner join [tb_Servicios] Serv on DocServ.[nro_servicio] = Serv.[nro_servicio]
                  inner join [tb_Doctores] Doc on DocServ.[nro_doctor] = Doc.[nro_doctor]
                  where Serv.activo = 'true' /*and Serv.web = 'true' este campo aun no esta */
                  and Doc.activo = 'true' and Serv.nro_servicio = :id`;

    let result: Doctor[] = [];

    await sequelize.query<Doctor>(query, { replacements: { id }, type: QueryTypes.SELECT })
      .then((doctores) => result = doctores);

    return result;
  }

  async verificarTurnoDisponible(servicioId: number): Promise<boolean> {

    const query = `Select *
                   From tb_Turnos
                   Where orden_prestacion = '0' And fecha > getdate()-1 and nro_servicio = :servicioId `;

    let result = false;

    await sequelize.query(query, { replacements: { servicioId }, type: QueryTypes.SELECT })
      .then((rows) => result = rows.length > 0);

    return result;
  }

  async getPaciente({ dni = '', email = '' }): Promise<Paciente> {

    const query = `Select  pte.nro_paciente as id, pte.paciente as nombre, isnull(pweb.nro_documento, '') as dni
                  From tb_Pacientes pte
                  Left Join tb_Pacientes_Web pweb On pte.nro_documento = pweb.nro_documento
                  where (pweb.email =  :email or :email = '')
                      And (pte.nro_documento = :dni or :dni = '')`;

    let result: Paciente;

    await sequelize.query<Paciente>(query, {
      replacements: { email, dni },
      type: QueryTypes.SELECT,
    })
      .then((pacientes) => result = pacientes[0]);

    return result;
  }
}
