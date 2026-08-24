import { useState } from 'react';
import { X, User, Phone as PhoneIcon, LoaderCircle, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { formatPhoneInput, isValidPhone } from '@/lib/phone';
import { formatFullDate } from '@/lib/schedule';

interface BookingModalProps {
  date: string;
  time: string;
  onClose: () => void;
  onConfirmed: () => void;
  onSlotTaken: () => void;
}

export default function BookingModal({ date, time, onClose, onConfirmed, onSlotTaken }: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      setError('Informe seu nome completo.');
      return;
    }
    if (!isValidPhone(phone)) {
      setError('Informe um telefone válido com DDD.');
      return;
    }

    setSubmitting(true);
    const { error: insertError } = await supabase.from('appointments').insert({
      client_name: trimmedName,
      client_phone: phone,
      appointment_date: date,
      appointment_time: time,
    });
    setSubmitting(false);

    if (insertError) {
      if (insertError.code === '23505') {
        onSlotTaken();
        return;
      }
      setError('Não foi possível concluir o agendamento. Tente novamente.');
      return;
    }

    onConfirmed();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Confirmar agendamento"
      className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-950/70 p-4 backdrop-blur-sm"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">Finalizar agendamento</h3>
              <div className="mt-2 flex items-center gap-2 text-primary-100">
                <Calendar size={15} />
                <p className="text-sm capitalize">{formatFullDate(date)} às {time}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-secondary-700">
              Nome completo
            </label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                autoComplete="name"
                className="w-full rounded-xl border border-secondary-200 bg-secondary-50 py-3.5 pl-12 pr-4 text-secondary-900 outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-secondary-700">
              Telefone (WhatsApp)
            </label>
            <div className="relative">
              <PhoneIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-400" />
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(event) => setPhone(formatPhoneInput(event.target.value))}
                placeholder="(00) 00000-0000"
                autoComplete="tel"
                className="w-full rounded-xl border border-secondary-200 bg-secondary-50 py-3.5 pl-12 pr-4 text-secondary-900 outline-none transition-all duration-300 focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-error-50 px-3 py-2.5 text-sm text-error-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:brightness-110 disabled:opacity-60"
          >
            {submitting ? <LoaderCircle size={18} className="animate-spin" /> : null}
            {submitting ? 'Confirmando...' : 'Confirmar agendamento'}
          </button>
        </form>
      </div>
    </div>
  );
}
