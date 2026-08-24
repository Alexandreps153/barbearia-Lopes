import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type FontSize = 'normal' | 'large' | 'x-large';

interface AccessibilityState {
  fontSize: FontSize;
  highContrast: boolean;
  reduceMotion: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
  toggleReduceMotion: () => void;
  resetAccessibility: () => void;
}

const STORAGE_KEY = 'barbearia-lopes-a11y';

const FONT_SIZES: FontSize[] = ['normal', 'large', 'x-large'];

const AccessibilityContext = createContext<AccessibilityState | null>(null);

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { fontSize: 'normal' as FontSize, highContrast: false, reduceMotion: false };
    const parsed = JSON.parse(raw);
    return {
      fontSize: FONT_SIZES.includes(parsed.fontSize) ? parsed.fontSize : 'normal',
      highContrast: Boolean(parsed.highContrast),
      reduceMotion: Boolean(parsed.reduceMotion),
    };
  } catch {
    return { fontSize: 'normal' as FontSize, highContrast: false, reduceMotion: false };
  }
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const initial = loadInitialState();
  const [fontSize, setFontSize] = useState<FontSize>(initial.fontSize);
  const [highContrast, setHighContrast] = useState(initial.highContrast);
  const [reduceMotion, setReduceMotion] = useState(initial.reduceMotion);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
    document.documentElement.setAttribute('data-reduce-motion', String(reduceMotion));
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontSize, highContrast, reduceMotion }));
  }, [fontSize, highContrast, reduceMotion]);

  const increaseFontSize = () =>
    setFontSize((current) => {
      const index = FONT_SIZES.indexOf(current);
      return FONT_SIZES[Math.min(index + 1, FONT_SIZES.length - 1)];
    });

  const decreaseFontSize = () =>
    setFontSize((current) => {
      const index = FONT_SIZES.indexOf(current);
      return FONT_SIZES[Math.max(index - 1, 0)];
    });

  const toggleHighContrast = () => setHighContrast((current) => !current);
  const toggleReduceMotion = () => setReduceMotion((current) => !current);
  const resetAccessibility = () => {
    setFontSize('normal');
    setHighContrast(false);
    setReduceMotion(false);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        reduceMotion,
        increaseFontSize,
        decreaseFontSize,
        toggleHighContrast,
        toggleReduceMotion,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility deve ser usado dentro de AccessibilityProvider');
  }
  return context;
}
