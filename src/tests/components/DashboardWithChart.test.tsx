import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardWithChart from '../../components/DashboardWithChart';
import ApiDataItem from '../../types/ApiDataItem';

console.error = jest.fn();

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

describe('DashboardWithChart', () => {
  test('renders DashboardWithChart correctly', () => {

    render(<DashboardWithChart stateCode="md" apiData={mockApiData} />);

    expect(screen.getByText('md')).toBeInTheDocument();
    expect(screen.getByLabelText('Select State')).toBeInTheDocument();
    expect(screen.getByText('Statistics')).toBeInTheDocument();
    expect(screen.getByLabelText('Total PCR Tests')).toBeInTheDocument();
  });

});
