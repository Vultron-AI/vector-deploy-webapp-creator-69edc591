/**
 * Input Component
 *
 * A versatile input component with label, error, and disabled states.
 *
 * Usage:
 *   <Input label="Email" type="email" placeholder="Enter email" />
 *   <Input label="Password" type="password" error="Password is required" />
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = 'text', id, ...props }, ref) => {
    const inputId = id || React.useId()

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium mb-1.5',
              'text-[var(--color-fg)]',
              props.disabled && 'opacity-50'
            )}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-[var(--radius-md)] px-3 py-2 text-sm',
            'border border-[var(--color-border)]',
            'bg-[var(--color-bg)] text-[var(--color-fg)]',
            'placeholder:text-[var(--color-muted)]',
            'focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-focus-ring)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-[var(--motion-fast)]',
            error && 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/20',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-[var(--color-error)]"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={`${inputId}-helper`}
            className="mt-1.5 text-sm text-[var(--color-muted)]"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
