import { useState } from 'react';
import { Accessibility, Minus, Plus, Contrast, Gauge, RotateCcw, X } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const {
    fontSize,
    highContrast,
    reduceMotion,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
    toggleReduceMotion,
    resetAccessibility,
  } = useAccessibility();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div
          role="dialog"
          aria-label="Opções de acessibilidade"
          className="mb-3 w-72 rounded-2xl border border-secondary-200 bg-white p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-secondary-900">Acessibilidade</h3>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar opções de acessibilidade"
              className="rounded-full p-1 text-secondary-500 hover:bg-secondary-100"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-3">
            <p className="mb-2 text-sm font-medium text-secondary-700">Tamanho do texto</p>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize === 'normal'}
                aria-label="Diminuir texto"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-secondary-200 text-secondary-700 hover:bg-primary-50 disabled:opacity-40"
              >
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center text-sm text-secondary-600">
                {fontSize === 'normal' ? 'Padrão' : fontSize === 'large' ? 'Grande' : 'Muito grande'}
              </span>
              <button
                onClick={increaseFontSize}
                disabled={fontSize === 'x-large'}
                aria-label="Aumentar texto"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-secondary-200 text-secondary-700 hover:bg-primary-50 disabled:opacity-40"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            className={`mb-2 flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              highContrast
                ? 'border-primary-600 bg-primary-600 text-white'
                : 'border-secondary-200 text-secondary-700 hover:bg-primary-50'
            }`}
          >
            <Contrast size={16} />
            Alto contraste
          </button>

          <button
            onClick={toggleReduceMotion}
            aria-pressed={reduceMotion}
            className={`mb-3 flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              reduceMotion
                ? 'border-primary-600 bg-primary-600 text-white'
                : 'border-secondary-200 text-secondary-700 hover:bg-primary-50'
            }`}
          >
            <Gauge size={16} />
            Reduzir animações
          </button>

          <button
            onClick={resetAccessibility}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm text-secondary-500 hover:text-secondary-700"
          >
            <RotateCcw size={14} />
            Restaurar padrão
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((current) => !current)}
        aria-label="Abrir opções de acessibilidade"
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary-700"
      >
        <Accessibility size={26} />
      </button>
    </div>
  );
}
