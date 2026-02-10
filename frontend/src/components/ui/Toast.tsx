/**
 * Toast Component
 *
 * A notification component with success, error, warning, info variants and auto-dismiss.
 *
 * Usage:
 *   <Toast variant="success" title="Success" description="Action completed" />
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

const variantConfig: Record<
  ToastVariant,
  {
    icon: React.ElementType
    iconColor: string
    borderColor: string
  }
> = {
  success: {
    icon: CheckCircle,
    iconColor: 'text-[var(--color-success)]',
    borderColor: 'border-l-[var(--color-success)]',
  },
  error: {
    icon: AlertCircle,
    iconColor: 'text-[var(--color-error)]',
    borderColor: 'border-l-[var(--color-error)]',
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-[var(--color-warning)]',
    borderColor: 'border-l-[var(--color-warning)]',
  },
  info: {
    icon: Info,
    iconColor: 'text-[var(--color-info)]',
    borderColor: 'border-l-[var(--color-info)]',
  },
}

export interface ToastProps {
  id?: string
  variant?: ToastVariant
  title: string
  description?: string
  onClose?: () => void
  className?: string
}

function Toast({
  variant = 'info',
  title,
  description,
  onClose,
  className,
}: ToastProps) {
  const config = variantConfig[variant]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'pointer-events-auto relative flex w-full items-start gap-3',
        'rounded-[var(--radius-md)] border border-[var(--color-border)] border-l-4',
        'bg-[var(--color-surface)] p-4 shadow-[var(--shadow-md)]',
        config.borderColor,
        'animate-in fade-in slide-in-from-top-2 duration-300',
        className
      )}
      role="alert"
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', config.iconColor)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-fg)]">{title}</p>
        {description && (
          <p className="mt-1 text-sm text-[var(--color-muted)]">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn(
            'flex-shrink-0 rounded-sm p-1',
            'text-[var(--color-muted)] hover:text-[var(--color-fg)]',
            'hover:bg-[var(--color-surface)]',
            'transition-colors'
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  )
}

export { Toast }
