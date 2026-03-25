import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import './StarBorder.css';

type StarBorderProps<T extends ElementType = 'button'> = {
  as?: T;
  className?: string;
  containerClassName?: string;
  animated?: boolean;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

const StarBorder = <T extends ElementType = 'button'>({
  as,
  className = '',
  containerClassName = '',
  animated = false,
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps<T>) => {
  const Component = (as || 'button') as ElementType;

  return (
    <Component
      className={`star-border-container ${containerClassName}`.trim()}
      style={{
        padding: `${thickness}px 0`,
        ...style,
      }}
      {...rest}
    >
      {animated && (
        <>
          <div
            className="border-gradient-bottom"
            style={{
              background: `radial-gradient(circle, ${color}, transparent 10%)`,
              animationDuration: speed,
            }}
          />
          <div
            className="border-gradient-top"
            style={{
              background: `radial-gradient(circle, ${color}, transparent 10%)`,
              animationDuration: speed,
            }}
          />
        </>
      )}
      <div className={`inner-content ${className}`.trim()}>{children}</div>
    </Component>
  );
};

export default StarBorder;