/**
 * Toast Provider
 *
 * Provides a toast notification system via React context.
 *
 * Usage:
 *   // In App.tsx
 *   <ToastProvider>
 *     <App />
 *   </ToastProvider>
 *
 *   // In any component
 *   const { toast } = useToast()
 *   toast({ variant: 'success', title: 'Saved!' })
 */

import * as React from 'react'
import { Toast, ToastVariant, ToastProps } from './Toast'
import { cn } from '@/lib/utils'

interface ToastItem extends ToastProps {
  id: string
}

interface ToastOptions {
  variant?: ToastVariant
  title: string
  description?: string
  duration?: number
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void
  dismiss: (id: string) => void
  dismissAll: () => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

const DEFAULT_DURATION = 5000

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const toast = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9)
    const duration = options.duration ?? DEFAULT_DURATION

    setToasts((prev) => [...prev, { ...options, id }])

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = React.useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      <div
        className={cn(
          'fixed top-4 right-4 z-[100] flex flex-col gap-2',
          'max-w-sm w-full pointer-events-none'
        )}
      >
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            title={t.title}
            description={t.description}
            onClose={() => dismiss(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export type { ToastOptions }
