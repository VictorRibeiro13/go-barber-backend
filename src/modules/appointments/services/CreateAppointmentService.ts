import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointments.model';
import AppointmentsRepository from '../repositories/Appoitments.repository';

interface RequestDTO {
  date: Date;
  provider: string;
}

class CreateAppointService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // hora com valor inicial ( 13:00 e naão 13:46)
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('Horário não disponível');
    }

    const appointment = appointmentsRepository.create({
      // eslint-disable-next-line @typescript-eslint/camelcase
      provider_id: provider,
      date: appointmentDate,
    });

    // Saving in the database the appointments created
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointService;
