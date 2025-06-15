export interface ArrangementContext {
  resolveConflictsByMonth(month: string): Promise<void>
}
