import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = ({ label, hint, error, className = '', ...props }: InputProps) => {
  return (
    <label className="block space-y-2">
      {label && <span className="text-sm font-semibold text-muted">{label}</span>}
      <input className={`input-modern ${className}`.trim()} {...props} />
      {error ? <p className="text-xs text-ui-error">{error}</p> : hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </label>
  );
};

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = ({ label, hint, error, className = '', ...props }: TextareaProps) => {
  return (
    <label className="block space-y-2">
      {label && <span className="text-sm font-semibold text-muted">{label}</span>}
      <textarea className={`input-modern resize-none ${className}`.trim()} {...props} />
      {error ? <p className="text-xs text-ui-error">{error}</p> : hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </label>
  );
};
