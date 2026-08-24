import { Sparkles, Gem, Clock3, Award, Heart } from 'lucide-react';
import Reveal from '@/components/Reveal';

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: 'Cuidado no estilo',
    description: 'Cada corte é pensado para valorizar sua identidade, do clássico ao moderno.',
  },
  {
    icon: Gem,
    title: 'Produtos de qualidade',
    description: 'Trabalhamos com produtos selecionados para o melhor resultado e conforto.',
  },
  {
    icon: Clock3,
    title: 'Pontualidade',
    description: 'Seu horário é reservado só para você, sem atrasos e sem enrolação.',
  },
];

const STATS = [
  { icon: Award, value: '3+', label: 'Anos de história' },
  { icon: Heart, value: '1200+', label: 'Clientes satisfeitos' },
  { icon: Sparkles, value: '6', label: 'Serviços disponíveis' },
];

export default function About() {
  return (
    <section id="sobre" className="bg-secondary-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Image side */}
          <Reveal variant="left">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/7518736/pexels-photo-7518736.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Interior da Barbearia Lopes"
                  loading="lazy"
                  className="h-[500px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/40 to-transparent" />
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -right-4 rounded-2xl border border-secondary-200 bg-white p-5 shadow-xl sm:-right-6">
                <div className="flex items-center gap-4">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <stat.icon size={20} className="mx-auto text-primary-500" />
                      <p className="mt-1.5 text-xl font-bold text-secondary-900">{stat.value}</p>
                      <p className="text-xs text-secondary-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative border */}
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-3xl border-l-2 border-t-2 border-primary-400/40" />
            </div>
          </Reveal>

          {/* Text side */}
          <div>
            <Reveal variant="right">
              <span className="deco-line text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">
                Nossa história
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold text-secondary-900 sm:text-5xl">
                Sobre a Barbearia Lopes
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-secondary-600">
                Fundada em 2022, a Barbearia Lopes nasceu para cuidar não só do
                seu cabelo, mas da sua autoestima. Aqui, cada cliente é tratado
                com atenção aos detalhes e aquele trato no estilo que faz toda
                a diferença — do corte clássico ao mais moderno, sempre com
                cuidado, técnica e respeito ao seu tempo.
              </p>
            </Reveal>

            <div className="mt-10 space-y-5">
              {HIGHLIGHTS.map((item, index) => (
                <Reveal key={item.title} variant="right" delay={index * 120}>
                  <div className="flex items-start gap-4 rounded-2xl border border-secondary-200 bg-white p-5 transition-all duration-300 hover:border-primary-300 hover:shadow-md">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white">
                      <item.icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-secondary-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-secondary-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
