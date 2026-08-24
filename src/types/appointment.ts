export type AppointmentStatus = 'confirmado' | 'concluido' | 'cancelado';

export interface Appointment {
  id: string;
  client_name: string;
  client_phone: string;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  created_at: string;
}

export interface NewAppointment {
  client_name: string;
  client_phone: string;
  appointment_date: string;
  appointment_time: string;
}
