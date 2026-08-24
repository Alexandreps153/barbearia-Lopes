import { CalendarCheck, Star, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-secondary-950"
    >
      {/* Cinematic video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        poster="https://images.pexels.com/photos/7447152/pexels-photo-7447152.jpeg?auto=compress&cs=tinysrgb&w=1920"
      >
        <source
          src="https://videos.pexels.com/video-files/3998440/3998440-sd_960_506_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-950/80 via-secondary-950/60 to-secondary-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-950/85 via-secondary-950/40 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div
            className="hero-fade-in mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary-400/30 bg-primary-950/40 px-5 py-2 text-sm font-medium tracking-wide text-primary-200 backdrop-blur-sm"
          >
            <Star size={14} className="fill-primary-400 text-primary-400" />
            Desde 2022 cuidando do seu estilo
          </div>

          <h1
            className="hero-fade-up font-display text-5xl font-semibold leading-[1.1] text-white sm:text-6xl lg:text-7xl"
          >
            Seu corte, sua
            <span className="block text-gradient-gold">autoestima</span>
            <span className="block text-3xl font-normal text-secondary-200 sm:text-4xl lg:text-5xl">
              em primeiro lugar
            </span>
          </h1>

          <p
            className="hero-fade-up mt-8 max-w-lg text-lg leading-relaxed text-secondary-300"
          >
            Na Barbearia Lopes você agenda seu horário em poucos passos, direto
            pelo site. Sem ligação, sem espera: escolha o dia, o horário e garanta
            seu lugar na cadeira.
          </p>

          <div className="hero-fade-up mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#agendar"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-900/40 transition-all duration-300 hover:shadow-primary-500/40 hover:brightness-110"
            >
              <CalendarCheck size={20} className="transition-transform duration-300 group-hover:scale-110" />
              Agendar meu corte
            </a>
            <a
              href="#trabalhos"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-primary-400/40 hover:bg-white/10"
            >
              Ver trabalhos
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-secondary-400 transition-colors hover:text-primary-300"
        aria-label="Rolar para baixo"
      >
        <ChevronDown size={28} className="animate-bounce" />
      </a>
    </section>
  );
}
