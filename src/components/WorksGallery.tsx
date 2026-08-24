import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '@/components/Reveal';

const WORKS = [
  {
    url: 'https://images.pexels.com/photos/5584461/pexels-photo-5584461.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Barbeiro finalizando um corte com precisão',
  },
  {
    url: 'https://images.pexels.com/photos/33934111/pexels-photo-33934111.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Corte de cabelo tradicional em andamento',
  },
  {
    url: 'https://images.pexels.com/photos/7432343/pexels-photo-7432343.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Cliente satisfeito após o corte e a barba',
  },
  {
    url: 'https://images.pexels.com/photos/4307710/pexels-photo-4307710.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Barba bem cuidada e alinhada',
  },
  {
    url: 'https://images.pexels.com/photos/2033287/pexels-photo-2033287.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Perfil de cliente com corte finalizado',
  },
  {
    url: 'https://images.pexels.com/photos/26528738/pexels-photo-26528738.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Cliente com visual renovado',
  },
  {
    url: 'https://images.pexels.com/photos/13809247/pexels-photo-13809247.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Tesoura de barbeiro, ferramenta de trabalho',
  },
  {
    url: 'https://images.pexels.com/photos/13809242/pexels-photo-13809242.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Máquinas e acessórios usados nos cortes',
  },
];

export default function WorksGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function handleScroll() {
      if (!track) return;
      const cardWidth = track.firstElementChild?.clientWidth ?? 1;
      const index = Math.round(track.scrollLeft / (cardWidth + 16));
      setActiveIndex(Math.min(index, WORKS.length - 1));
    }

    track.addEventListener('scroll', handleScroll, { passive: true });
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.clientWidth ?? 0;
    track.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' });
  }

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstElementChild?.clientWidth ?? 0;
    track.scrollTo({ left: index * (cardWidth + 16), behavior: 'smooth' });
  }

  return (
    <section id="trabalhos" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="up">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <span className="deco-line text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">
                Portfólio
              </span>
              <h2 className="mt-5 font-display text-4xl font-semibold text-secondary-900 sm:text-5xl">
                Nossos trabalhos
              </h2>
              <p className="mt-4 max-w-md text-lg text-secondary-600">
                Deslize para o lado e veja alguns dos cortes e cuidados feitos
                por aqui.
              </p>
            </div>

            <div className="hidden shrink-0 gap-3 sm:flex">
              <button
                onClick={() => scrollByCard(-1)}
                aria-label="Trabalho anterior"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-200 bg-white text-secondary-700 transition-all duration-300 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => scrollByCard(1)}
                aria-label="Próximo trabalho"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-200 bg-white text-secondary-700 transition-all duration-300 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal variant="scale">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {WORKS.map((work) => (
              <div
                key={work.url}
                className="group aspect-square w-64 shrink-0 snap-center overflow-hidden rounded-2xl bg-secondary-100 shadow-md sm:w-80"
              >
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={work.url}
                    alt={work.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {work.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 flex justify-center gap-2">
          {WORKS.map((work, index) => (
            <button
              key={work.url}
              onClick={() => scrollToIndex(index)}
              aria-label={`Ir para o trabalho ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-400 ${
                index === activeIndex ? 'w-8 bg-primary-600' : 'w-2 bg-secondary-300 hover:bg-secondary-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
