import ApiDataItem from '.././types/ApiDataItem';
import Statistics from '../types/Statistics';

/**
 * This function takes in a date and the data array calculates some stats and then returns the Statistics object. The stats object
 * is then used in the InfoComponent.
 * @param apiData: ApiDataItem[] - the data from the covid19 api
 * @param date: string - the date hovered over by the user.
 * @returns Statistics object representing all stats calculated in the function.
 */
export async function calculateStats(
  apiData: ApiDataItem[],
  date: string
): Promise<Statistics> {
  const selectedDay: ApiDataItem | undefined = apiData.find(
    (day: ApiDataItem) => day.date === date
  );

  if (!selectedDay) {
    console.debug('No data for day: ' + date);
  }

  // extract data from the covid 19 api data if available.
  const totalPcrTests: number | null = selectedDay?.tests.pcr.total || null;
  const totalRecoveredCount: number | null =
    selectedDay?.outcomes.recovered || null;
  const currentIcuCount: number | null =
    selectedDay?.outcomes.hospitalized.in_icu.currently || null;
  const currentVentilatorCount: number | null =
    selectedDay?.outcomes.hospitalized.on_ventilator.currently || null;
  const currentHospitalizationCount: number | null =
    selectedDay?.outcomes.hospitalized.currently || null;

  // Calculate 7-day rolling average
  const rollingAverage = calculateRollingAverage(apiData, date);

  // returns if as the Statistics object.
  return {
    totalPcrTests: totalPcrTests || null,
    totalRecoveredCount: totalRecoveredCount || null,
    currentIcuCount: currentIcuCount || null,
    currentVentilatorCount: currentVentilatorCount || null,
    currentHospitalizationCount: currentHospitalizationCount || null,
    date: date || null,
    rollingAverage,
  };
}

/**
 * This function calculated a 7 day average of cases.
 * @param apiData: ApiDataItem[] - the data from the covid19 api
 * @param currentDate: string - the date hovered over by the user.
 * @returns number - the average.
 */
function calculateRollingAverage(
  apiData: ApiDataItem[],
  currentDate: string
): number {
  // go back 7 days...
  const sevenDaysAgo: Date = new Date(currentDate);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  // filter out the other days in the array.
  const dataWithinSevenDays: ApiDataItem[] = apiData.filter(
    (item) =>
      new Date(item.date) >= sevenDaysAgo && new Date(item.date) <= new Date(currentDate)
  );
  
  // calculate average and round to two decimals.
  const totalCases: number = dataWithinSevenDays.reduce((sum, item) => sum + item.cases.total, 0);
  const average: number = totalCases / 7;
  const roundedAverage: number = Number(average.toFixed(2));

  return roundedAverage;
}
