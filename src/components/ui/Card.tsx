import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = false }: CardProps) => {
  return (
    <div className={`saas-card rounded-2xl ${hover ? 'saas-card-hover' : ''} ${className}`.trim()}>
      {children}
    </div>
  );
};
