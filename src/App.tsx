import { useEffect, useState } from 'react';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import LandingPage from '@/pages/LandingPage';
import AdminPage from '@/pages/AdminPage';

type Route = 'landing' | 'admin';

function getRouteFromPath(path: string): Route {
  return path.startsWith('/admin') ? 'admin' : 'landing';
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRouteFromPath(window.location.pathname));

  useEffect(() => {
    function handlePopState() {
      setRoute(getRouteFromPath(window.location.pathname));
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigate(to: Route) {
    const path = to === 'admin' ? '/admin' : '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setRoute(to);
    window.scrollTo(0, 0);
  }

  return (
    <AccessibilityProvider>
      {route === 'admin' ? (
        <AdminPage onBack={() => navigate('landing')} />
      ) : (
        <LandingPage />
      )}
    </AccessibilityProvider>
  );
}

export default App;
