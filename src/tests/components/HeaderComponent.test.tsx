import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderComponent from '../../components/HeaderComponent'; // Adjust the path accordingly

const mockOnStatesChanged = jest.fn();

describe('HeaderComponent', () => {

  test('renders HeaderComponent correctly', () => {
    render(<HeaderComponent onStatesChanged={mockOnStatesChanged} />);

    expect(screen.getByLabelText('Select State')).toBeInTheDocument();
  });

  

});
