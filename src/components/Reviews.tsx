import { Star, Quote } from 'lucide-react';
import Reveal from '@/components/Reveal';

const REVIEWS = [
  {
    name: 'Rafael Mendes',
    initials: 'RM',
    rating: 5,
    comment:
      'Melhor barbearia da região! Atendimento impecável e o corte sempre sai exatamente como eu peço. Recomendo demais.',
    role: 'Cliente desde 2022',
  },
  {
    name: 'Carlos Eduardo',
    initials: 'CE',
    rating: 5,
    comment:
      'Profissionalismo do início ao fim. Pontual, atencioso e com uma técnica incrível. Saio de lá sempre renovado.',
    role: 'Cliente fiel',
  },
  {
    name: 'João Pedro',
    initials: 'JP',
    rating: 5,
    comment:
      'O cuidado com cada detalhe é o que diferencia. Desde a recepção até o corte final, tudo perfeito. Parabéns!',
    role: 'Cliente novo',
  },
  {
    name: 'André Souza',
    initials: 'AS',
    rating: 5,
    comment:
      'Barba mais alinhada e caprichada que já fiz. Ambiente limpo, confortável e com produtos de primeira.',
    role: 'Cliente desde 2023',
  },
  {
    name: 'Lucas Ferreira',
    initials: 'LF',
    rating: 5,
    comment:
      'Agendar pelo site é prático e rápido. O corte é sempre de altíssima qualidade. Não troco mais!',
    role: 'Cliente fiel',
  },
  {
    name: 'Bruno Almeida',
    initials: 'BA',
    rating: 5,
    comment:
      'Sai daqui com a melhor transformação que já fiz. Atendimento personalizado e resultado impecável.',
    role: 'Cliente desde 2024',
  },
];

export default function Reviews() {
  return (
    <section id="avaliacoes" className="bg-secondary-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="deco-line text-sm font-semibold uppercase tracking-[0.3em] text-primary-400">
              Avaliações
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
              O que dizem nossos clientes
            </h2>
            <div className="mt-6 flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={20} className="fill-primary-400 text-primary-400" />
              ))}
              <span className="ml-2 text-lg font-medium text-secondary-300">5.0</span>
              <span className="text-secondary-500">·</span>
              <span className="text-secondary-400">1200+ avaliações</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <Reveal key={review.name} variant="up" delay={index * 80}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-secondary-800/40 to-secondary-900/40 p-7 transition-all duration-500 hover:border-primary-400/30">
                <Quote size={32} className="absolute right-5 top-5 text-primary-400/15 transition-all duration-500 group-hover:text-primary-400/25" />

                <div className="relative">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i <= review.rating ? 'fill-primary-400 text-primary-400' : 'text-secondary-600'}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-secondary-300">
                    {review.comment}
                  </p>

                  <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white">
                      {review.initials}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{review.name}</p>
                      <p className="text-xs text-secondary-500">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
