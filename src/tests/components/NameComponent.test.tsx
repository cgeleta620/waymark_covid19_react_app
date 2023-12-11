import { render, screen } from '@testing-library/react';
import NameComponent from '../../components/NameComponent';

describe('NameComponent', () => {
  it('renders state name correctly', () => {
    const stateName = 'Maryland';
    render(<NameComponent stateName={stateName} />);

    const stateNameElement = screen.getByText(`State: ${stateName}`);
    expect(stateNameElement).toBeInTheDocument();
  });

});
