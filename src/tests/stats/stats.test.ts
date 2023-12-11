import '@testing-library/jest-dom';
import { calculateStats } from '../../stats/stats';
import ApiDataItem from '../../types/ApiDataItem';

console.debug = jest.fn();

const mockApiData: ApiDataItem[] = [
    {
      date: '2021-03-08',
      state: 'md',
      meta: { data_quality_grade: 'A', updated: '2021-03-07T15:00:00Z', tests: { total_source: 'totalTestsViral' } },
      cases: { total: 387319, confirmed: 387319, probable: null },
      tests: {
        pcr: {
          total: 8097590,
          pending: null,
          encounters: { total: null },
          specimens: { total: 8097590, positive: 472716, negative: null },
          people: { total: 3421865, positive: 387319, negative: 3034546 },
        },
        antibody: { encounters: { total: null, positive: null, negative: null }, people: { total: 198139, positive: 28360, negative: 169779 } },
        antigen: { encounters: { total: null, positive: null, negative: null }, people: { total: null, positive: null, negative: null } },
      },
      outcomes: {
        recovered: 9703,
        hospitalized: { total: 35651, currently: 818, in_icu: { total: 34, currently: 215 }, on_ventilator: { total: 5, currently: null } },
        death: { total: 7955, confirmed: 7773, probable: 182 },
      },
    },
  
  ];

describe('calculateStats', () => {
  test('calculates stats correctly for a given date', async () => {
    const date = '2021-03-08'; // data for this date
    const stats = await calculateStats(mockApiData, date);

    expect(stats).toEqual({
      totalPcrTests: 8097590,
      totalRecoveredCount: 9703,
      currentIcuCount: 215,
      currentVentilatorCount: null,
      currentHospitalizationCount: 818,
      date,
      rollingAverage: 55331.29,
    });

    expect(console.debug).not.toHaveBeenCalledWith('No data for day: ' + date);
  });

  test('handles no data for the given date', async () => {
    const date = '2023-01-02'; // no data at this date
    const stats = await calculateStats(mockApiData, date);

    expect(stats).toEqual({
      totalPcrTests: null,
      totalRecoveredCount: null,
      currentIcuCount: null,
      currentVentilatorCount: null,
      currentHospitalizationCount: null,
      date: date,
      rollingAverage: 0,
    });

    expect(console.debug).toHaveBeenCalledWith('No data for day: ' + date);
  });

});
