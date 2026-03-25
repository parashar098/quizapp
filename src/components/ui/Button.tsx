import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import StarBorder from '../StarBorder';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children?: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
};

export const Button = ({
  variant = 'primary',
  icon,
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <StarBorder as={motion.button}
      whileTap={{ scale: 0.98 }}
      className={`${variantClass[variant]} ${className}`.trim()}
      {...props}
    >
      {icon}
      {children}
    </StarBorder>
  );
};
