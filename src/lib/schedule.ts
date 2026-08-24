export const BUSINESS_HOURS = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

export const CLOSED_WEEKDAY = 0;
export const MAX_ADVANCE_DAYS = 30;

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isDayOpen(date: Date): boolean {
  return date.getDay() !== CLOSED_WEEKDAY;
}

export function getBookableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < MAX_ADVANCE_DAYS; i++) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + i);
    if (isDayOpen(candidate)) {
      dates.push(candidate);
    }
  }
  return dates;
}

export function formatDateLabel(date: Date): { weekday: string; day: string; month: string } {
  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  const day = date.toLocaleDateString('pt-BR', { day: '2-digit' });
  const month = date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');
  return { weekday, day, month };
}

export function formatFullDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}

export function isTimeInPast(isoDate: string, time: string): boolean {
  const [year, month, day] = isoDate.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const slot = new Date(year, month - 1, day, hour, minute);
  return slot.getTime() < Date.now();
}
