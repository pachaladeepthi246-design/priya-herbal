"use client"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onChange: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onChange }: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`block w-full text-left px-4 py-2 rounded-lg transition ${
            selectedCategory === category ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
