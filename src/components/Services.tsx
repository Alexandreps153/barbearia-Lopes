import { Scissors, Sparkles, Droplet, Wind, Crown, Brush } from 'lucide-react';
import Reveal from '@/components/Reveal';

const SERVICES = [
  {
    icon: Scissors,
    title: 'Corte de Cabelo',
    description: 'Cortes clássicos e modernos pensados para valorizar seu rosto e personalidade.',
    price: 'R$ 45',
  },
  {
    icon: Brush,
    title: 'Barba Completa',
    description: 'Modelagem e acabamento de barba com toalha quente e produtos premium.',
    price: 'R$ 35',
  },
  {
    icon: Crown,
    title: 'Corte + Barba',
    description: 'O pacote completo para uma transformação total do visual.',
    price: 'R$ 70',
  },
  {
    icon: Droplet,
    title: 'Hidratação Capilar',
    description: 'Tratamento profundo para cabelos ressecados, devolvendo brilho e maciez.',
    price: 'R$ 30',
  },
  {
    icon: Wind,
    title: 'Pigmentação',
    description: 'Cobertura de fios brancos e definição de cor com produtos de alta qualidade.',
    price: 'R$ 40',
  },
  {
    icon: Sparkles,
    title: 'Sobrancelha',
    description: 'Design e limpeza de sobrancelhas para harmonizar o olhar.',
    price: 'R$ 20',
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-secondary-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="up">
          <div className="mx-auto max-w-2xl text-center">
            <span className="deco-line text-sm font-semibold uppercase tracking-[0.3em] text-primary-400">
              Serviços
            </span>
            <h2 className="mt-5 font-display text-4xl font-semibold text-white sm:text-5xl">
              O que fazemos por você
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-secondary-400">
              Cada serviço é executado com técnica, produtos selecionados e
              atenção aos detalhes que fazem toda a diferença.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} variant="up" delay={index * 100}>
              <div className="group card-glow relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-secondary-800/50 to-secondary-900/50 p-7 transition-all duration-500 hover:border-primary-400/30">
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-primary-500/5 blur-2xl transition-all duration-500 group-hover:bg-primary-500/10" />

                <div className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary-400/20 bg-primary-950/40 text-primary-300 transition-all duration-500 group-hover:border-primary-400/40 group-hover:bg-primary-900/40 group-hover:text-primary-200">
                    <service.icon size={26} />
                  </span>

                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-400">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 border-t border-white/5 pt-5">
                    <span className="text-2xl font-bold text-primary-300">{service.price}</span>
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
