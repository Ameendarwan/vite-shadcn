import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';
import TruncatedTextCell from '@app/components/TruncateText/TruncateText';

describe('TruncatedTextCell', () => {
  it('renders "No data" when value is null or undefined', () => {
    render(<TruncatedTextCell value={null} trimSize={5} />);
    expect(screen.getByTestId('no-data')).toHaveTextContent('No data');
  });

  it('renders truncated value when value length exceeds trimSize', () => {
    const longText = 'This is a very long text that should be truncated';
    render(<TruncatedTextCell value={longText} trimSize={10} />);

    const truncatedText = screen.getByText('This is a ...');
    expect(truncatedText).toBeInTheDocument();
  });

  it('displays the full value when the length is less than or equal to trimSize', () => {
    const shortText = 'Short text';
    render(<TruncatedTextCell value={shortText} trimSize={10} />);

    const fullText = screen.getByText(shortText);
    expect(fullText).toBeInTheDocument();
  });
});
