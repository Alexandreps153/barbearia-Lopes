import { useEffect, useMemo, useState } from 'react';
import { CalendarCheck, CheckCircle2, LoaderCircle, Calendar, Clock3 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BUSINESS_HOURS, formatDateLabel, formatFullDate, getBookableDates, isTimeInPast, toISODate } from '@/lib/schedule';
import BookingModal from '@/components/Booking/BookingModal';
import Reveal from '@/components/Reveal';

export default function BookingSection() {
  const dates = useMemo(() => getBookableDates(), []);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirmedSlot, setConfirmedSlot] = useState<{ date: string; time: string } | null>(null);
  const [slotTakenNotice, setSlotTakenNotice] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    let active = true;
    setLoadingTimes(true);
    setFetchError(false);

    supabase
      .rpc('get_booked_times', { p_date: selectedDate })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setFetchError(true);
          setBookedTimes([]);
        } else {
          setBookedTimes((data ?? []).map((row: { appointment_time: string }) => row.appointment_time.slice(0, 5)));
        }
        setLoadingTimes(false);
      });

    return () => {
      active = false;
    };
  }, [selectedDate]);

  function refreshBookedTimes() {
    if (!selectedDate) return;
    supabase
      .rpc('get_booked_times', { p_date: selectedDate })
      .then(({ data }) => {
        setBookedTimes((data ?? []).map((row: { appointment_time: string }) => row.appointment_time.slice(0, 5)));
      });
  }

  function handleSelectDate(iso: string) {
    setSelectedDate(iso);
    setSelectedTime(null);
    setSlotTakenNotice(false);
  }

  function handleSlotTaken() {
    setShowModal(false);
    setSelectedTime(null);
    setSlotTakenNotice(true);
    refreshBookedTimes();
  }

  function handleConfirmed() {
    if (!selectedDate || !selectedTime) return;
    setConfirmedSlot({ date: selectedDate, time: selectedTime });
    setShowModal(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookedTimes([]);
  }

  function startNewBooking() {
    setConfirmedSlot(null);
  }

  if (confirmedSlot) {
    return (
      <section id="agendar" className="bg-secondary-50 py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <Reveal variant="scale">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success-100 text-success-600">
              <CheckCircle2 size={40} />
            </span>
            <h2 className="mt-6 font-display text-4xl font-semibold text-secondary-900">
              Agendamento confirmado!
            </h2>
            <p className="mt-4 capitalize text-xl text-secondary-600">
              {formatFullDate(confirmedSlot.date)} às {confirmedSlot.time}
            </p>
            <p className="mt-3 text-secondary-500">
              Te esperamos na Barbearia Lopes. Chegue com alguns minutos de
              antecedência.
            </p>
            <button
              onClick={startNewBooking}
              className="mt-8 rounded-full border border-primary-300 px-6 py-3 text-sm font-semibold text-primary-700 transition-all duration-300 hover:bg-primary-50"
            >
              Fazer outro agendamento
            </button>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="agendar" className="bg-secondary-50 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal variant="up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="deco-line text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">
              Agende seu horário
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold text-secondary-900 sm:text-5xl">
              Escolha o dia e o horário
            </h2>
            <p className="mt-5 text-lg text-secondary-600">
              Selecione uma data disponível, depois um horário livre para
              garantir seu corte.
            </p>
          </div>
        </Reveal>

        <Reveal variant="scale" delay={200}>
          <div className="mt-12 rounded-3xl border border-secondary-200 bg-white p-6 shadow-xl sm:p-8">
            {/* Step 1: Date */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">1</span>
                <p className="text-sm font-semibold text-secondary-700">Escolha a data</p>
              </div>
              <div className="flex gap-2.5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {dates.map((date) => {
                  const iso = toISODate(date);
                  const { weekday, day, month } = formatDateLabel(date);
                  const isSelected = iso === selectedDate;
                  return (
                    <button
                      key={iso}
                      onClick={() => handleSelectDate(iso)}
                      className={`flex shrink-0 flex-col items-center rounded-2xl border px-5 py-4 transition-all duration-300 ${
                        isSelected
                          ? 'border-primary-600 bg-gradient-to-b from-primary-500 to-primary-700 text-white shadow-lg'
                          : 'border-secondary-200 bg-white text-secondary-700 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-wide">{weekday}</span>
                      <span className="my-0.5 text-xl font-bold">{day}</span>
                      <span className="text-xs uppercase">{month}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Time */}
            <div className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  selectedDate ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-secondary-400'
                }`}>2</span>
                <p className="text-sm font-semibold text-secondary-700">Escolha o horário</p>
              </div>

              {!selectedDate && (
                <div className="flex items-center gap-3 rounded-xl bg-secondary-50 px-5 py-8 text-center">
                  <Clock3 size={20} className="shrink-0 text-secondary-400" />
                  <p className="text-sm text-secondary-500">
                    Selecione uma data acima para ver os horários disponíveis.
                  </p>
                </div>
              )}

              {selectedDate && loadingTimes && (
                <div className="flex items-center justify-center gap-2 py-8 text-secondary-500">
                  <LoaderCircle size={18} className="animate-spin" />
                  Carregando horários...
                </div>
              )}

              {selectedDate && !loadingTimes && fetchError && (
                <p className="rounded-xl bg-error-50 px-4 py-4 text-center text-sm text-error-700">
                  Não foi possível carregar os horários. Tente selecionar a data novamente.
                </p>
              )}

              {selectedDate && !loadingTimes && !fetchError && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {BUSINESS_HOURS.map((time) => {
                    const disabled = bookedTimes.includes(time) || isTimeInPast(selectedDate, time);
                    const isSelected = time === selectedTime;
                    return (
                      <button
                        key={time}
                        disabled={disabled}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-xl border py-3.5 text-sm font-medium transition-all duration-300 ${
                          isSelected
                            ? 'border-primary-600 bg-gradient-to-b from-primary-500 to-primary-700 text-white shadow-md'
                            : disabled
                              ? 'cursor-not-allowed border-secondary-100 bg-secondary-50 text-secondary-300 line-through'
                              : 'border-secondary-200 bg-white text-secondary-700 hover:border-primary-300 hover:bg-primary-50 hover:shadow-sm'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              )}

              {slotTakenNotice && (
                <p role="alert" className="mt-4 rounded-lg bg-warning-50 px-4 py-3 text-sm text-warning-700">
                  Esse horário acabou de ser reservado por outra pessoa. Escolha outro horário disponível.
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowModal(true)}
                disabled={!selectedDate || !selectedTime}
                className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-600/20 transition-all duration-300 hover:shadow-primary-500/30 hover:brightness-110 disabled:cursor-not-allowed disabled:bg-secondary-200 disabled:text-secondary-400 disabled:shadow-none"
              >
                <CalendarCheck size={20} className="transition-transform duration-300 group-hover:scale-110" />
                Continuar agendamento
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {showModal && selectedDate && selectedTime && (
        <BookingModal
          date={selectedDate}
          time={selectedTime}
          onClose={() => setShowModal(false)}
          onConfirmed={handleConfirmed}
          onSlotTaken={handleSlotTaken}
        />
      )}
    </section>
  );
}
