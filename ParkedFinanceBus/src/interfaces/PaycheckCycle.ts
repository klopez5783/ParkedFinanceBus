export interface PaycheckCycleData {
  uid: number;
  paycheckAmount: number;
  savingsGoal: number;
  savings: number;
  needs: number;
  wants: number;
  startDate: string;
  endDate: string;
  cycleId?: number;
}