import { render, screen } from '@testing-library/react';
import Location from './Location';
import restaurantData from '../../data/restaurant.json';

describe('Location', () => {
  it('renders section title', () => {
    render(<Location />);

    expect(screen.getByText(/encuéntranos/i)).toBeInTheDocument();
  });

  it('renders address', () => {
    render(<Location />);

    expect(screen.getByText('Dirección')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(restaurantData.direccion.calle))).toBeInTheDocument();
  });

  it('renders phone', () => {
    render(<Location />);

    expect(screen.getByText('Teléfono')).toBeInTheDocument();
    expect(screen.getByText(restaurantData.telefono)).toBeInTheDocument();
  });

  it('renders email', () => {
    render(<Location />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText(restaurantData.email)).toBeInTheDocument();
  });

  it('renders hours', () => {
    render(<Location />);

    expect(screen.getByText('Horarios')).toBeInTheDocument();
    expect(screen.getByText(/lunes - viernes/i)).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Location />);

    expect(screen.getByText('Síguenos')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
  });

  it('renders map iframe with accessible title', () => {
    render(<Location />);

    const iframe = screen.getByTitle(/ubicación del restaurante/i);
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('google.com/maps'));
  });
});
