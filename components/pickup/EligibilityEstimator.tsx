'use client'
// Nonbinding eligibility estimator. It compares the visitor's list with the
// published pickup policy (lib/pickup.ts) — it never confirms service or price.
import { useEffect, useRef } from 'react'
import Icon from '@/components/Icon'
import { trackEvent } from '@/lib/analytics'
import { EQUIPMENT_CATEGORIES, PICKUP_MINIMUM, TV_FEE } from '@/lib/pickup'
import { usePickup } from './PickupContext'
import QuantityStepper from './QuantityStepper'

const STATUS_LABEL = {
  empty: 'Waiting for your list',
  meets: 'Appears to meet the minimum',
  below: 'Below the minimum',
  review: 'Needs individual review',
} as const

const STATUS_ICON = { empty: 'info', meets: 'check', below: 'alert', review: 'info' } as const

export default function EligibilityEstimator() {
  const { quantities, setQuantity, resetQuantities, estimate } = usePickup()
  const lastStatus = useRef(estimate.status)

  // Analytics: report only when the outcome changes, and only coarse counts —
  // never notes, contact details or anything typed into the form.
  useEffect(() => {
    if (estimate.status === lastStatus.current) return
    lastStatus.current = estimate.status
    if (estimate.status === 'empty') return
    trackEvent('eligibility_estimate', {
      result: estimate.status,
      meets_minimum: estimate.status === 'meets',
      has_tv_fee: estimate.tvCount > 0,
    })
  }, [estimate.status, estimate.tvCount])

  const filled = Math.min(estimate.majorCount, PICKUP_MINIMUM)

  return (
    <div className="ct-est">
      <div className="ct-est__list">
        <div className="ct-est__listhead">
          <h3 className="ct-h3">Approximate quantities</h3>
          <button type="button" className="ct-est__reset" onClick={resetQuantities} disabled={estimate.totalCount === 0}>
            Clear all
          </button>
        </div>
        <div className="ct-est__rows">
          {EQUIPMENT_CATEGORIES.map((cat) => (
            <QuantityStepper
              key={cat.id}
              category={cat}
              value={quantities[cat.id] ?? 0}
              onChange={(v) => setQuantity(cat.id, v)}
              idPrefix="est"
            />
          ))}
        </div>
      </div>

      <div className={`ct-est__result ct-est__result--${estimate.status}`}>
       <div className="ct-est__sticky">
        <p className="ct-est__kicker">Nonbinding estimate</p>

        <div className="ct-est__meter" aria-hidden="true">
          {Array.from({ length: PICKUP_MINIMUM }, (_, i) => (
            <span key={i} className={i < filled ? 'is-on' : undefined} />
          ))}
        </div>
        <p className="ct-est__count">
          <strong>{estimate.majorCount}</strong>
          <span> of {PICKUP_MINIMUM} qualifying major items</span>
        </p>

        {/* Screen readers hear the outcome whenever it changes */}
        <div className="ct-est__out" role="status" aria-live="polite" aria-atomic="true">
          <p className="ct-est__status">
            <Icon name={STATUS_ICON[estimate.status]} size={18} />
            <span>{STATUS_LABEL[estimate.status]}</span>
          </p>
          <ul className="ct-est__msgs">
            {estimate.messages.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>

        {estimate.tvCount > 0 && (
          <dl className="ct-est__fee">
            <dt>Estimated TV recycling fee</dt>
            <dd>${estimate.tvFee}<small> ({estimate.tvCount} × ${TV_FEE})</small></dd>
          </dl>
        )}

        <a href="#request" className="ct-btn ct-btn--primary" data-cta-location="estimator">
          Continue to the request form <Icon name="arrow" size={18} />
        </a>
        <p className="ct-est__fine">
          Your quantities carry over to the form. This estimate does not confirm service, pricing or a pickup date.
        </p>
       </div>
      </div>
    </div>
  )
}
