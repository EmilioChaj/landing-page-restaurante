import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Footer from './Footer';

const user = userEvent.setup();

describe('Footer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubEnv('VITE_API_URL', 'http://localhost:3001');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders restaurant name', () => {
    render(<Footer />);

    expect(screen.getByText('Corte Italiana')).toBeInTheDocument();
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

  it('renders newsletter form with email input and GDPR checkbox', () => {
    render(<Footer />);

    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu email/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(/política de privacidad/i)).toBeInTheDocument();
  });

  it('shows error when email is invalid', async () => {
    render(<Footer />);

    await user.type(screen.getByPlaceholderText(/tu email/i), 'invalido');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: '→' }));

    expect(screen.getByText('Email no válido')).toBeInTheDocument();
  });

  it('shows error when GDPR is not accepted', async () => {
    render(<Footer />);

    await user.type(screen.getByPlaceholderText(/tu email/i), 'test@test.com');
    await user.click(screen.getByRole('button', { name: '→' }));

    const errors = screen.getAllByText(/política de privacidad/i);
    expect(errors.some((el) => el.className.includes('error'))).toBe(true);
  });

  it('shows success message on successful newsletter submit', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<Footer />);

    await user.type(screen.getByPlaceholderText(/tu email/i), 'test@test.com');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: '→' }));

    expect(await screen.findByText(/revisa tu email/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/subscribe',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('shows error message when API request fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Error' }),
    });

    render(<Footer />);

    await user.type(screen.getByPlaceholderText(/tu email/i), 'test@test.com');
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: '→' }));

    expect(await screen.findByText(/error al suscribirse/i)).toBeInTheDocument();
  });

  it('renders current year in copyright', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
  });
});
