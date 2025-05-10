import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectCottage: React.FC = () => {

    return (
        <div>
            <label className="block font-medium text-gray-700">Cabaña:</label>
            <Select required>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="CAB1">Cabaña del Árbol</SelectItem>
                    <SelectItem value="CAB2">Cabaña del Bosque</SelectItem>
                    <SelectItem value="CAB3">Cabaña del Lago</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectCottage;