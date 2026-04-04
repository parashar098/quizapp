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
  overlayClassName = 'bg-slate-950/0',
  gradientClassName = '',
  fixedImage = false,
}: BackgroundImageLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b1220] text-text-primary dark:text-slate-100">
      <div className={`absolute inset-0 ${overlayClassName}`} />

      <div aria-hidden="true" className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.08), transparent 40%)',
          }}
        />
        <div
          className="absolute left-1/2 top-[-220px] h-[420px] w-[820px] -translate-x-1/2 rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(rgba(59,130,246,0.15), transparent 70%)' }}
        />
      </div>

      <div className="relative z-10">
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
};
