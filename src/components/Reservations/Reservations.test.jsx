import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Reservations from './Reservations';

const user = userEvent.setup();

describe('Reservations', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all form fields', () => {
    render(<Reservations />);

    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/personas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fecha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hora/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notas/i)).toBeInTheDocument();
  });

  it('renders restaurant info', () => {
    render(<Reservations />);

    expect(screen.getByText('Horarios')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Política de Cancelación')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const { container } = render(<Reservations />);

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(await screen.findByText(/nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/email no válido/i)).toBeInTheDocument();
    expect(screen.getByText(/teléfono no válido/i)).toBeInTheDocument();
    expect(screen.getByText(/selecciona una fecha futura/i)).toBeInTheDocument();
    expect(screen.getByText(/selecciona una hora/i)).toBeInTheDocument();
  });

  it('shows error for invalid email', async () => {
    const { container } = render(<Reservations />);

    await user.type(screen.getByLabelText(/nombre/i), 'Mario');
    await user.type(screen.getByLabelText(/email/i), 'invalido');
    await user.type(screen.getByLabelText(/teléfono/i), '+502 12345678');

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const dateStr = futureDate.toISOString().split('T')[0];
    await user.type(screen.getByLabelText(/fecha/i), dateStr);
    await user.type(screen.getByLabelText(/hora/i), '19:00');

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(await screen.findByText(/email no válido/i)).toBeInTheDocument();
  });

  it('shows error for short name', async () => {
    const { container } = render(<Reservations />);

    await user.type(screen.getByLabelText(/nombre/i), 'A');

    const form = container.querySelector('form');
    fireEvent.submit(form);

    expect(await screen.findByText(/nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
  });

  it('submits form and shows success message', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: true });

    render(<Reservations />);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const dateStr = futureDate.toISOString().split('T')[0];

    await user.type(screen.getByLabelText(/nombre/i), 'Mario');
    await user.type(screen.getByLabelText(/email/i), 'mario@test.com');
    await user.type(screen.getByLabelText(/teléfono/i), '+502 12345678');
    await user.type(screen.getByLabelText(/fecha/i), dateStr);
    await user.type(screen.getByLabelText(/hora/i), '19:00');
    await user.click(screen.getByRole('button', { name: /confirmar reserva/i }));

    expect(await screen.findByText(/reserva enviada correctamente/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it('shows WhatsApp link', () => {
    render(<Reservations />);

    const whatsappLink = screen.getByText(/reserva por whatsapp/i);
    expect(whatsappLink).toBeInTheDocument();
    expect(whatsappLink.closest('a')).toHaveAttribute('href', expect.stringContaining('wa.me'));
  });
});
