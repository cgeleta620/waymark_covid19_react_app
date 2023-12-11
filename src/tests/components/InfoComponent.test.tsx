import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfoComponent from '../../components/InfoComponent';
import { calculateStats } from '../../stats/stats';
import ApiDataItem from '../../types/ApiDataItem';

jest.mock('../../stats/stats');

describe('InfoComponent', () => {
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
            hospitalized: { total: 35651, currently: 818, in_icu: { total: null, currently: 215 }, on_ventilator: { total: null, currently: null } },
            death: { total: 7955, confirmed: 7773, probable: 182 },
          },
        },
      
      ];

  it('renders component with stats', async () => {
    const mockStats = {
      totalPcrTests: 1000,
      totalRecoveredCount: 500,
      currentIcuCount: 10,
      currentVentilatorCount: 5,
      currentHospitalizationCount: 20,
      date: '2023-01-01',
      rollingAverage: 45,
    };

    // Workaround to extend the type with mockResolvedValue
    const mockCalculateStats = calculateStats as jest.MockedFunction<typeof calculateStats>;
    mockCalculateStats.mockResolvedValue(mockStats);

    render(<InfoComponent apiData={mockApiData} date="2023-01-01" />);

    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Current Hospitalization Count')).toBeInTheDocument();

  });

});
