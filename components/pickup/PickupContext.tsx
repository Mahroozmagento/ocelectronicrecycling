'use client'
// Shares equipment quantities between the eligibility estimator and the
// request form, so visitors never have to enter their list twice.
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { cleanQuantity, estimatePickup, type Estimate, type Quantities } from '@/lib/pickup'

interface PickupState {
  quantities: Quantities
  setQuantity: (id: string, value: number) => void
  resetQuantities: () => void
  estimate: Estimate
}

const PickupCtx = createContext<PickupState | null>(null)

export function PickupProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>({})

  const setQuantity = useCallback((id: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: cleanQuantity(value) }))
  }, [])
  const resetQuantities = useCallback(() => setQuantities({}), [])

  const estimate = useMemo(() => estimatePickup(quantities), [quantities])
  const value = useMemo(
    () => ({ quantities, setQuantity, resetQuantities, estimate }),
    [quantities, setQuantity, resetQuantities, estimate],
  )
  return <PickupCtx.Provider value={value}>{children}</PickupCtx.Provider>
}

export function usePickup(): PickupState {
  const ctx = useContext(PickupCtx)
  if (!ctx) throw new Error('usePickup must be used inside <PickupProvider>')
  return ctx
}
