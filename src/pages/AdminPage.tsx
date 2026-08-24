import { useAuth } from '@/hooks/useAuth';
import BarberLogin from '@/components/Admin/BarberLogin';
import AdminDashboard from '@/components/Admin/AdminDashboard';

interface AdminPageProps {
  onBack: () => void;
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const { session, loading, signIn } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary-950 text-secondary-300">
        Carregando...
      </div>
    );
  }

  if (!session) {
    return <BarberLogin onBack={onBack} onSignIn={signIn} />;
  }

  return <AdminDashboard />;
}
