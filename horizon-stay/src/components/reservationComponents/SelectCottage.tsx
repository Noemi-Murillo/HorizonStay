import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    onChange: (value: string) => void
}

const SelectCottage: React.FC<Props> = ({ onChange }) => {
    return (
        <div>
            <label className="block font-medium text-gray-700">Cabaña:</label>
            <Select onValueChange={onChange} required>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione una opción" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="COT001">Cabaña del Árbol</SelectItem>
                    <SelectItem value="COT002">Cabaña del Bosque</SelectItem>
                    <SelectItem value="COT003">Cabaña del Lago</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectCottage
