import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';
import restaurantData from '../../data/restaurant.json';

const user = userEvent.setup();

describe('Footer', () => {
  it('renders restaurant name', () => {
    render(<Footer />);

    expect(screen.getByText('La Dolce Vita')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    render(<Footer />);

    expect(screen.getByText('Enlaces Rápidos')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /menú/i })).toBeInTheDocument();
  });

  it('renders contact info', () => {
    render(<Footer />);

    expect(screen.getAllByText('Contacto').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/58621717/)).toBeInTheDocument();
    expect(screen.getByText(/emichg5862@gmail\.com/)).toBeInTheDocument();
  });

  it('renders newsletter form', () => {
    render(<Footer />);

    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu email/i)).toBeInTheDocument();
  });

  it('shows success message on newsletter submit', async () => {
    render(<Footer />);

    await user.type(screen.getByPlaceholderText(/tu email/i), 'test@test.com');
    await user.click(screen.getByRole('button', { name: '→' }));

    expect(screen.getByText(/gracias por suscribirte/i)).toBeInTheDocument();
  });

  it('renders current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
  });
});
