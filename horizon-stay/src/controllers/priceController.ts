import { getPriceByCottageType } from '@/models/priceModel'

export const fetchCottagePrice = async (type: string): Promise<{ success: boolean; price?: number; error?: string }> => {
  if (!type) {
    return { success: false, error: "Tipo de cabaña requerido" }
  }

  const validTypes = ['lago', 'arbol', 'bosque']
  if (!validTypes.includes(type)) {
    return { success: false, error: "Tipo de cabaña inválido" }
  }

  const price = await getPriceByCottageType(type)
  if (price === null) {
    return { success: false, error: "Precio no encontrado" }
  }

  return { success: true, price }
}
