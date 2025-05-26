import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  onChange: (value: string) => void
  value?: string
  guests: number
}

const SelectCottage: React.FC<Props> = ({ onChange, value, guests }) => {
  const items = [
    { value: "COT001", label: "Cabaña del Lago", capacity: 4 },
    { value: "COT002", label: "Cabaña del Árbol", capacity: 6 },
    { value: "COT003", label: "Cabaña del Bosque", capacity: 8 },
  ]

  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">Cabaña:</label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full border rounded px-3 py-2 bg-white shadow">
          <SelectValue placeholder="Seleccione una opción" />
        </SelectTrigger>

        <SelectContent className="z-50 bg-white rounded shadow-md">
          {items.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              disabled={guests > item.capacity}
              className="group flex items-center justify-between px-3 py-2 cursor-pointer rounded-md transition-all duration-200 
                         data-[highlighted]:bg-green-100 
                         data-[state=checked]:bg-green-200 
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectCottage
