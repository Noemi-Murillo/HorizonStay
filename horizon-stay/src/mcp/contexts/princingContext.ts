export interface HighLowSeason {
  type_id: string // "lago" | "bosque" | "arbol"
  season: "alta" | "baja"
  suggested_price: number
}

export interface PricingContext {
  analyzeSeasons(): Promise<HighLowSeason[]>
  updatePricesBasedOnDemand(data: HighLowSeason[]): Promise<void>
}
