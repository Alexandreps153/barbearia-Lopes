import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Appointment, AppointmentStatus } from '@/types/appointment';

export function useAppointments(sessionReady: boolean) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true });

    if (fetchError) {
      setError('Não foi possível carregar os agendamentos.');
    } else {
      setError(null);
      setAppointments(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!sessionReady) return;
    fetchAppointments();
  }, [fetchAppointments, sessionReady]);

  async function updateStatus(id: string, status: AppointmentStatus) {
    const { error: updateError } = await supabase.from('appointments').update({ status }).eq('id', id);
    if (!updateError) {
      setAppointments((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    }
    return { error: updateError };
  }

  async function deleteAppointment(id: string) {
    const { error: deleteError } = await supabase.from('appointments').delete().eq('id', id);
    if (!deleteError) {
      setAppointments((current) => current.filter((item) => item.id !== id));
    }
    return { error: deleteError };
  }

  return { appointments, loading, error, refetch: fetchAppointments, updateStatus, deleteAppointment };
}
