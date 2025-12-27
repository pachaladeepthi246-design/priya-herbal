"use client"

interface VariantSelectorProps {
  variants: Array<{ id: number; name: string; price: number }>
  selectedVariant: { id: number; name: string; price: number }
  onChange: (variant: { id: number; name: string; price: number }) => void
}

export default function VariantSelector({ variants, selectedVariant, onChange }: VariantSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-3">Size</label>
      <div className="flex gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onChange(variant)}
            className={`px-4 py-2 border-2 rounded-lg font-medium transition ${
              selectedVariant.id === variant.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary"
            }`}
          >
            {variant.name}
          </button>
        ))}
      </div>
    </div>
  )
}
