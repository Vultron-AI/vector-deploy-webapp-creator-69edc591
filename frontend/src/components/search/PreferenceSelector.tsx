/**
 * PreferenceSelector Component
 *
 * Preference selector with quick preset buttons and advanced custom weights.
 */

import * as React from 'react'
import { ChevronDown, Sliders } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import type { PresetType, PreferenceWeights, SearchPreset } from '@/types/product'
import { searchPresets, getPresetWeights } from '@/services/mockData'

export interface PreferenceSelectorProps {
  selectedPreset: PresetType
  customWeights?: PreferenceWeights
  onPreferenceChange: (preset: PresetType, weights: PreferenceWeights) => void
  className?: string
}

export function PreferenceSelector({
  selectedPreset,
  customWeights,
  onPreferenceChange,
  className,
}: PreferenceSelectorProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(selectedPreset === 'custom')
  const [weights, setWeights] = React.useState<PreferenceWeights>(
    customWeights || getPresetWeights(selectedPreset)
  )

  // Update weights when preset changes externally
  React.useEffect(() => {
    if (selectedPreset !== 'custom') {
      setWeights(getPresetWeights(selectedPreset))
    }
  }, [selectedPreset])

  const handlePresetClick = (preset: SearchPreset) => {
    if (preset.id === 'custom') {
      setShowAdvanced(true)
    } else {
      setShowAdvanced(false)
    }
    onPreferenceChange(preset.id, preset.weights)
  }

  const handleWeightChange = (key: keyof PreferenceWeights, value: number) => {
    const newWeights = { ...weights, [key]: value / 100 }
    setWeights(newWeights)
    onPreferenceChange('custom', newWeights)
  }

  const weightLabels: Record<keyof PreferenceWeights, { label: string; description: string }> = {
    value: { label: 'Value', description: 'Prioritize lowest price' },
    speed: { label: 'Speed', description: 'Prioritize fast delivery' },
    trust: { label: 'Trust', description: 'Prioritize reliable retailers' },
    quality: { label: 'Quality', description: 'Prioritize product quality' },
  }

  return (
    <div className={cn('w-full', className)} data-testid="preference-selector">
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2 mb-2">
        {searchPresets.slice(0, 3).map((preset) => (
          <Button
            key={preset.id}
            variant={selectedPreset === preset.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick(preset)}
            className="flex-1 min-w-[120px]"
            data-testid={`preset-${preset.id}`}
          >
            {preset.label}
          </Button>
        ))}
        <Button
          variant={showAdvanced || selectedPreset === 'custom' ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1"
          data-testid="preset-advanced"
        >
          <Sliders className="h-4 w-4" />
          Advanced
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              showAdvanced && 'rotate-180'
            )}
          />
        </Button>
      </div>

      {/* Preset description */}
      {!showAdvanced && selectedPreset !== 'custom' && (
        <p className="text-sm text-[var(--color-muted)]">
          {searchPresets.find((p) => p.id === selectedPreset)?.description}
        </p>
      )}

      {/* Advanced weights sliders */}
      {showAdvanced && (
        <div
          className={cn(
            'mt-4 p-4 rounded-[var(--radius-md)]',
            'bg-[var(--color-surface)] border border-[var(--color-border)]',
            'animate-in fade-in slide-in-from-top-2 duration-200'
          )}
        >
          <p className="text-sm font-medium text-[var(--color-fg)] mb-4">
            Customize your priorities
          </p>
          <div className="space-y-4">
            {(Object.keys(weightLabels) as Array<keyof PreferenceWeights>).map((key) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor={`weight-${key}`}
                    className="text-sm font-medium text-[var(--color-fg)]"
                  >
                    {weightLabels[key].label}
                  </label>
                  <span className="text-sm text-[var(--color-muted)]">
                    {Math.round(weights[key] * 100)}%
                  </span>
                </div>
                <input
                  id={`weight-${key}`}
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(weights[key] * 100)}
                  onChange={(e) => handleWeightChange(key, Number(e.target.value))}
                  className={cn(
                    'w-full h-2 rounded-full appearance-none cursor-pointer',
                    'bg-[var(--color-border)]',
                    '[&::-webkit-slider-thumb]:appearance-none',
                    '[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
                    '[&::-webkit-slider-thumb]:rounded-full',
                    '[&::-webkit-slider-thumb]:bg-[var(--color-accent)]',
                    '[&::-webkit-slider-thumb]:cursor-pointer',
                    '[&::-webkit-slider-thumb]:transition-transform',
                    '[&::-webkit-slider-thumb]:hover:scale-110',
                    '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4',
                    '[&::-moz-range-thumb]:rounded-full',
                    '[&::-moz-range-thumb]:bg-[var(--color-accent)]',
                    '[&::-moz-range-thumb]:border-0',
                    '[&::-moz-range-thumb]:cursor-pointer'
                  )}
                  aria-label={weightLabels[key].description}
                  data-testid={`weight-slider-${key}`}
                />
                <p className="text-xs text-[var(--color-muted)]">
                  {weightLabels[key].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
