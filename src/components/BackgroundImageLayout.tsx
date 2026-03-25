import type { ReactNode } from 'react';

interface BackgroundImageLayoutProps {
  children: ReactNode;
  imageSrc?: string;
  contentClassName?: string;
  overlayClassName?: string;
  gradientClassName?: string;
  fixedImage?: boolean;
}

export const BackgroundImageLayout = ({
  children,
  imageSrc = '/images/saas-bg.svg',
  contentClassName = '',
  overlayClassName = 'bg-white/72 dark:bg-slate-900/78',
  gradientClassName = 'bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/20',
  fixedImage = false,
}: BackgroundImageLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden text-text-primary dark:text-slate-100">
      <div className={`absolute inset-0 ${fixedImage ? 'md:fixed' : ''}`}>
        <img
          src={imageSrc}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${gradientClassName}`}
        style={{ backgroundSize: '140% 140%' }}
      />

      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-indigo-500/14 blur-2xl" />
        <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-emerald-500/12 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-500/10 blur-2xl" />
      </div>

      <div className="relative z-10">
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
};
