/**
 * Main App Component
 *
 * Pre-wrapped with DialogProvider and ToastProvider for notifications.
 * Renders the SearchResultsPage as the main content.
 */

import { DialogProvider, ToastProvider } from '@/components/ui'
import { SearchResultsPage } from '@/pages/SearchResultsPage'

function App() {
  return (
    <DialogProvider>
      <ToastProvider>
        <SearchResultsPage />
      </ToastProvider>
    </DialogProvider>
  )
}

export default App
