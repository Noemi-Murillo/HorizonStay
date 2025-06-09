import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onChange: (data: { value: string; label: string }) => void;
  value?: string;
  guests: number;
};

const SelectCottage: React.FC<Props> = ({ onChange, value, guests }) => {
  const items = [
    { value: "COT001", label: "Cabaña del Lago", capacity: 4 },
    { value: "COT002", label: "Cabaña del Árbol", capacity: 6 },
    { value: "COT003", label: "Cabaña del Bosque", capacity: 8 },
  ];

  const getSelectedLabel = (value?: string) => {
    const selected = items.find((item) => item.value === value);
    return selected?.label ?? "Seleccione una opción";
  };

  return (
    <div>
      <label className="block font-medium text-gray-700 mb-1">Cabaña:</label>
      <Select
        onValueChange={(val) => {
          const selected = items.find(item => item.value === val);
          if (selected) {
            onChange({ value: selected.value, label: selected.label });
          }
        }}
        value={value}
      >
        <SelectTrigger className="border p-2 rounded border-gray-200 w-full text-gray-700 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-150">
          <SelectValue placeholder="Seleccione una opción">
            {getSelectedLabel(value)}
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="z-50 bg-white rounded shadow-md border p-2 rounded border-gray-300 w-full text-gray-700 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 transition-all duration-150">
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
  );
};

export default SelectCottage;
