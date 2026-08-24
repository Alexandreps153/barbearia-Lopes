import { Scissors, MapPin, Phone, Instagram, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-secondary-950 pt-20 text-secondary-300">
      {/* Decorative gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/40 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-400/30 bg-primary-950/40 text-primary-300">
              <Scissors size={20} />
            </span>
            <div>
              <span className="font-display text-xl font-semibold tracking-wide text-white">
                BARBEARIA LOPES
              </span>
              <p className="text-xs uppercase tracking-[0.3em] text-primary-400">Estilo & Autoestima</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-secondary-400">
            Cuidando do seu estilo e da sua autoestima desde 2022. Agende seu
            horário online e garanta seu lugar na cadeira.
          </p>

          <a
            href="#agendar"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:brightness-110"
          >
            Agendar agora
          </a>
        </div>

        <div>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-400">
            Contato
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-primary-500" />
              Rua das Tesouras, 123 — Centro
            </li>
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 shrink-0 text-primary-500" />
              (11) 99999-9999
            </li>
            <li className="flex items-start gap-3">
              <Instagram size={16} className="mt-0.5 shrink-0 text-primary-500" />
              @barbearialopes
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary-400">
            Horário
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-primary-500" />
              Seg–Sáb: 09h às 19h
            </li>
            <li className="pl-7 text-secondary-500">Domingo: fechado</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-secondary-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Barbearia Lopes. Todos os direitos reservados.</p>
          <a href="/admin" className="transition-colors hover:text-primary-400">
            Acesso do barbeiro
          </a>
        </div>
      </div>
    </footer>
  );
}
