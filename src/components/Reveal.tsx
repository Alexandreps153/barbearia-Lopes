import { type ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  variant?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  className?: string;
}

export default function Reveal({ children, variant = 'up', delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const baseClass = {
    up: 'reveal',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[variant];

  return (
    <div
      ref={ref}
      className={`${baseClass} ${visible ? 'reveal-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
