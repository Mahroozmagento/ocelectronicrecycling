'use client'
import Icon from '@/components/Icon'
import { MAX_QUANTITY, cleanQuantity, type EquipmentCategory } from '@/lib/pickup'

/** Accessible quantity control: − / number input / +, 44px touch targets. */
export default function QuantityStepper({
  category,
  value,
  onChange,
  idPrefix,
}: {
  category: EquipmentCategory
  value: number
  onChange: (value: number) => void
  idPrefix: string
}) {
  const inputId = `${idPrefix}-${category.id}`
  const name = category.label.toLowerCase()
  return (
    <div className={`ct-qty${value > 0 ? ' is-set' : ''}`}>
      <span className="ct-qty__icon" aria-hidden="true"><Icon name={category.icon} size={20} /></span>
      <label className="ct-qty__label" htmlFor={inputId}>
        <span>{category.label}</span>
        <small>{category.hint}</small>
      </label>
      <div className="ct-qty__ctrl">
        <button
          type="button"
          aria-label={`Decrease ${name}`}
          disabled={value <= 0}
          onClick={() => onChange(Math.max(0, value - 1))}
        >
          <Icon name="minus" size={16} />
        </button>
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          min={0}
          max={MAX_QUANTITY}
          step={1}
          value={value === 0 ? '' : value}
          placeholder="0"
          onChange={(e) => onChange(cleanQuantity(e.target.value))}
        />
        <button
          type="button"
          aria-label={`Increase ${name}`}
          disabled={value >= MAX_QUANTITY}
          onClick={() => onChange(Math.min(MAX_QUANTITY, value + 1))}
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
    </div>
  )
}
