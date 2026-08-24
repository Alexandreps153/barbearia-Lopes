import { Scissors, Menu, X, Lock } from 'lucide-react';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#trabalhos', label: 'Trabalhos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#agendar', label: 'Agendar' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/10 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-400/40 bg-primary-950/60 text-primary-300 shadow-lg transition-all duration-300 hover:border-primary-300 hover:text-primary-200">
            <Scissors size={20} />
          </span>
          <span className="font-display text-xl font-semibold leading-tight tracking-wide text-white sm:text-2xl">
            BARBEARIA
            <span className="block text-sm font-medium uppercase tracking-[0.3em] text-primary-300">Lopes</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-secondary-200 transition-colors duration-300 hover:text-primary-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agendar"
            className="rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-900/30 transition-all duration-300 hover:shadow-primary-500/40 hover:brightness-110"
          >
            Agendar corte
          </a>
          <a
            href="/admin"
            aria-label="Acesso do barbeiro"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-secondary-300 transition-all duration-300 hover:border-primary-400/50 hover:text-primary-300"
            title="Acesso do barbeiro"
          >
            <Lock size={15} />
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="glass mt-2.5 border-t border-white/10 px-4 pb-6 pt-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-2 py-3 text-base font-medium text-secondary-200 transition-colors hover:bg-white/5 hover:text-primary-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agendar"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block rounded-full bg-gradient-to-r from-primary-500 to-primary-700 px-5 py-3 text-center text-base font-semibold text-white"
          >
            Agendar corte
          </a>
          <a
            href="/admin"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-center text-base font-medium text-secondary-300"
          >
            <Lock size={18} />
            Acesso do barbeiro
          </a>
        </nav>
      )}
    </header>
  );
}
