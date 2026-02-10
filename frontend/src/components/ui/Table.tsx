/**
 * Table Component
 *
 * A flexible table component with header, body, sorting, and empty states.
 *
 * Usage:
 *   <Table>
 *     <TableHeader>
 *       <TableRow>
 *         <TableHead>Name</TableHead>
 *       </TableRow>
 *     </TableHeader>
 *     <TableBody>
 *       <TableRow>
 *         <TableCell>John</TableCell>
 *       </TableRow>
 *     </TableBody>
 *   </Table>
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('bg-[var(--color-surface)] [&_tr]:border-b', className)}
    {...props}
  />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-[var(--color-surface)] font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-[var(--color-border)]',
      'transition-colors duration-[var(--motion-fast)]',
      'hover:bg-[var(--color-surface)]/50',
      'data-[state=selected]:bg-[var(--color-accent)]/5',
      className
    )}
    {...props}
  />
))
TableRow.displayName = 'TableRow'

export type SortDirection = 'asc' | 'desc' | null

interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  sortDirection?: SortDirection
  onSort?: () => void
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable, sortDirection, onSort, ...props }, ref) => {
    const SortIcon = sortDirection === 'asc'
      ? ChevronUp
      : sortDirection === 'desc'
        ? ChevronDown
        : ChevronsUpDown

    return (
      <th
        ref={ref}
        className={cn(
          'h-12 px-4 text-left align-middle font-medium text-[var(--color-muted)]',
          '[&:has([role=checkbox])]:pr-0',
          sortable && 'cursor-pointer select-none hover:text-[var(--color-fg)]',
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        {sortable ? (
          <div className="flex items-center gap-1">
            {children}
            <SortIcon className="h-4 w-4" />
          </div>
        ) : (
          children
        )}
      </th>
    )
  }
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-4 align-middle text-[var(--color-fg)]',
      '[&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
))
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-[var(--color-muted)]', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

interface TableEmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

function TableEmptyState({
  title = 'No results found',
  description = 'No data available to display.',
  icon,
  action,
}: TableEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={100} className="h-48">
        <div className="flex flex-col items-center justify-center text-center">
          {icon && (
            <div className="mb-3 text-[var(--color-muted)]">{icon}</div>
          )}
          <h3 className="text-sm font-medium text-[var(--color-fg)]">{title}</h3>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{description}</p>
          {action && <div className="mt-4">{action}</div>}
        </div>
      </TableCell>
    </TableRow>
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmptyState,
}
