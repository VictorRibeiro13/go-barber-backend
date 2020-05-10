import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/Appoitments.repository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuth from '../middlewares/ensureAuth';

const appointmentRoutes = Router();

/**
 * Usando middleware de validação de token
 */
appointmentRoutes.use(ensureAuth);

/**
 *  List Appointments
 */
appointmentRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.status(200).json(appointments);
});

/**
 * Store Appointments: id, provider(barber), date
 */
appointmentRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider: provider_id,
  });

  return response.json(appointment);
});


export default appointmentRoutes;
