/**
 * This interface represents an object containing statistical information
 * Used in stats.ts 
 */
interface Statistics {
    totalPcrTests: number | null;
    totalRecoveredCount: number | null;
    currentIcuCount: number | null;
    currentVentilatorCount: number | null;
    currentHospitalizationCount: number | null;
    date: string | null;
    rollingAverage: number | null;
}

export default Statistics;