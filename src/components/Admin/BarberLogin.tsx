import { useState } from 'react';
import { Scissors, Lock, LoaderCircle, ArrowLeft, LogIn } from 'lucide-react';

const BARBER_EMAIL = 'barbeiro@lopes.com';
const BARBER_PASSWORD = 'BarbeariaLopes895232!';
const BARBER_PIN = '895232';

interface BarberLoginProps {
  onBack: () => void;
  onSignIn: (email: string, password: string) => Promise<{ error: unknown }>;
}

export default function BarberLogin({ onBack, onSignIn }: BarberLoginProps) {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    if (!password) {
      setError('Informe a senha.');
      return;
    }

    if (password !== BARBER_PIN) {
      setError('Senha incorreta.');
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await onSignIn(BARBER_EMAIL, BARBER_PASSWORD);
    if (signInError) {
      setError('Não foi possível entrar. Tente novamente.');
    }
    setSubmitting(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary-950 px-4 py-10">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-secondary-300 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar para o site
        </button>

        <div className="rounded-2xl bg-white p-7 shadow-2xl sm:p-8">
          <div className="mb-7 flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-700 text-white shadow-md">
              <Scissors size={28} />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-secondary-900">
              Entrar no painel
            </h1>
            <p className="mt-1 text-sm text-secondary-500">
              Acesso restrito ao barbeiro da Barbearia Lopes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-secondary-700">
                Senha
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite a senha"
                  autoComplete="current-password"
                  autoFocus
                  className="w-full rounded-xl border border-secondary-200 py-3 pl-11 pr-4 text-secondary-900 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-error-50 px-3 py-2 text-sm text-error-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting ? <LoaderCircle size={18} className="animate-spin" /> : <LogIn size={18} />}
              {submitting ? 'Aguarde...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
