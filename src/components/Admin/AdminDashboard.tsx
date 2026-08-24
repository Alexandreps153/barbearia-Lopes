import { useMemo, useState } from 'react';
import { Scissors, LogOut, Calendar, Phone, User, CheckCircle2, XCircle, Clock3, Trash2, Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppointments } from '@/hooks/useAppointments';
import type { Appointment, AppointmentStatus } from '@/types/appointment';
import { formatFullDate } from '@/lib/schedule';

const STATUS_META: Record<AppointmentStatus, { label: string; className: string; dot: string }> = {
  confirmado: {
    label: 'Confirmado',
    className: 'bg-primary-50 text-primary-700 border-primary-200',
    dot: 'bg-primary-500',
  },
  concluido: {
    label: 'Concluído',
    className: 'bg-success-50 text-success-700 border-success-500/30',
    dot: 'bg-success-500',
  },
  cancelado: {
    label: 'Cancelado',
    className: 'bg-error-50 text-error-700 border-error-500/30',
    dot: 'bg-error-500',
  },
};

type Filter = 'todos' | AppointmentStatus;

export default function AdminDashboard() {
  const { session, signOut } = useAuth();
  const { appointments, loading, error, updateStatus, deleteAppointment } = useAppointments(!!session);
  const [filter, setFilter] = useState<Filter>('todos');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return appointments.filter((item) => {
      const matchesFilter = filter === 'todos' || item.status === filter;
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        item.client_name.toLowerCase().includes(term) ||
        item.client_phone.replace(/\D/g, '').includes(term.replace(/\D/g, ''));
      return matchesFilter && matchesSearch;
    });
  }, [appointments, filter, search]);

  const counts = useMemo(() => {
    return {
      total: appointments.length,
      confirmado: appointments.filter((a) => a.status === 'confirmado').length,
      concluido: appointments.filter((a) => a.status === 'concluido').length,
      cancelado: appointments.filter((a) => a.status === 'cancelado').length,
    };
  }, [appointments]);

  const FILTERS: { value: Filter; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'confirmado', label: 'Confirmados' },
    { value: 'concluido', label: 'Concluídos' },
    { value: 'cancelado', label: 'Cancelados' },
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <header className="sticky top-0 z-30 border-b border-secondary-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-white">
              <Scissors size={18} />
            </span>
            <div>
              <p className="font-display text-base font-bold leading-tight text-secondary-900">BARBEARIA LOPES</p>
              <p className="text-xs text-secondary-500">Painel do barbeiro</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-secondary-200 px-4 py-2 text-sm font-medium text-secondary-700 transition-colors hover:bg-error-50 hover:text-error-700"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-secondary-900 sm:text-3xl">Agendamentos</h1>
        <p className="mt-1 text-secondary-600">Veja quem marcou, em qual horário e o telefone para contato.</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total" value={counts.total} icon={Calendar} tone="secondary" />
          <StatCard label="Confirmados" value={counts.confirmado} icon={Clock3} tone="primary" />
          <StatCard label="Concluídos" value={counts.concluido} icon={CheckCircle2} tone="success" />
          <StatCard label="Cancelados" value={counts.cancelado} icon={XCircle} tone="error" />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xs flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome ou telefone"
              className="w-full rounded-xl border border-secondary-200 bg-white py-2.5 pl-11 pr-4 text-sm text-secondary-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === item.value
                    ? 'bg-primary-600 text-white'
                    : 'border border-secondary-200 bg-white text-secondary-700 hover:bg-primary-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          {loading && (
            <div className="py-16 text-center text-secondary-500">Carregando agendamentos...</div>
          )}

          {error && (
            <div className="rounded-xl bg-error-50 px-4 py-6 text-center text-sm text-error-700">{error}</div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-secondary-200 bg-white px-4 py-16 text-center">
              <Calendar size={32} className="mx-auto text-secondary-300" />
              <p className="mt-3 text-secondary-500">Nenhum agendamento encontrado.</p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <ul className="space-y-3">
              {filtered.map((item) => (
                <AppointmentCard
                  key={item.id}
                  appointment={item}
                  onStatusChange={updateStatus}
                  onDelete={deleteAppointment}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: typeof Calendar;
  tone: 'primary' | 'success' | 'error' | 'secondary';
}) {
  const toneClasses = {
    primary: 'bg-primary-50 text-primary-700',
    success: 'bg-success-50 text-success-700',
    error: 'bg-error-50 text-error-700',
    secondary: 'bg-secondary-100 text-secondary-700',
  }[tone];

  return (
    <div className="rounded-2xl border border-secondary-100 bg-white p-4">
      <span className={`flex h-10 w-10 items-center justify-center rounded-full ${toneClasses}`}>
        <Icon size={18} />
      </span>
      <p className="mt-3 text-2xl font-bold text-secondary-900">{value}</p>
      <p className="text-sm text-secondary-500">{label}</p>
    </div>
  );
}

function AppointmentCard({
  appointment,
  onStatusChange,
  onDelete,
}: {
  appointment: Appointment;
  onStatusChange: (id: string, status: AppointmentStatus) => Promise<{ error: unknown }>;
  onDelete: (id: string) => Promise<{ error: unknown }>;
}) {
  const meta = STATUS_META[appointment.status];

  return (
    <li className="rounded-2xl border border-secondary-100 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.className}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
              {meta.label}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-secondary-900">
            <User size={16} className="shrink-0 text-secondary-400" />
            <span className="font-semibold">{appointment.client_name}</span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-secondary-600">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="shrink-0 text-primary-500" />
              <span className="capitalize">{formatFullDate(appointment.appointment_date)}</span>
            </span>
            <span className="flex items-center gap-2">
              <Clock3 size={15} className="shrink-0 text-primary-500" />
              {appointment.appointment_time.slice(0, 5)}
            </span>
            <a
              href={`https://wa.me/55${appointment.client_phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-secondary-600 transition-colors hover:text-success-600"
            >
              <Phone size={15} className="shrink-0 text-success-500" />
              {appointment.client_phone}
            </a>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {appointment.status !== 'concluido' && (
            <button
              onClick={() => onStatusChange(appointment.id, 'concluido')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-success-500/30 bg-success-50 px-3 py-2 text-xs font-semibold text-success-700 transition-colors hover:bg-success-100"
            >
              <CheckCircle2 size={15} />
              Concluir
            </button>
          )}
          {appointment.status !== 'cancelado' && (
            <button
              onClick={() => onStatusChange(appointment.id, 'cancelado')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-error-500/30 bg-error-50 px-3 py-2 text-xs font-semibold text-error-700 transition-colors hover:bg-error-100"
            >
              <XCircle size={15} />
              Cancelar
            </button>
          )}
          {appointment.status === 'cancelado' && (
            <button
              onClick={() => onStatusChange(appointment.id, 'confirmado')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-100"
            >
              <Clock3 size={15} />
              Reativar
            </button>
          )}
          <button
            onClick={() => onDelete(appointment.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-secondary-200 px-3 py-2 text-xs font-semibold text-secondary-500 transition-colors hover:bg-secondary-100 hover:text-secondary-700"
          >
            <Trash2 size={15} />
            Excluir
          </button>
        </div>
      </div>
    </li>
  );
}
