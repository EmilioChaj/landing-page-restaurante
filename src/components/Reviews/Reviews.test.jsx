import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Reviews from './Reviews';
import reviewsData from '../../data/reviews.json';

const user = userEvent.setup();

beforeEach(() => {
  vi.restoreAllMocks();
  vi.stubEnv('VITE_API_URL', 'http://localhost:3001');
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Backend no disponible'));
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('Reviews', () => {
  it('renders section title', async () => {
    render(<Reviews />);

    expect(screen.getByText(/lo que dicen nuestros clientes/i)).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('renders visible reviews from static data when API fails', async () => {
    render(<Reviews />);

    const firstReview = reviewsData[0];
    expect(screen.getByText(firstReview.nombre)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(firstReview.comentario.substring(0, 20)))).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('renders star ratings', async () => {
    render(<Reviews />);

    const firstReview = reviewsData[0];
    const stars = screen.getAllByText('★');
    expect(stars.length).toBeGreaterThanOrEqual(firstReview.estrellas);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('renders navigation buttons', async () => {
    render(<Reviews />);

    expect(screen.getByRole('button', { name: '‹' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '›' })).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('navigates to next slide', async () => {
    render(<Reviews />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await user.click(screen.getByRole('button', { name: '›' }));

    const pageTwoReview = reviewsData[3];
    expect(screen.getByText(pageTwoReview.nombre)).toBeInTheDocument();
  });

  it('renders pagination dots', async () => {
    render(<Reviews />);

    const dots = screen.getAllByRole('button', { name: /mostrar reseña/i });
    expect(dots.length).toBeGreaterThan(1);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('navigates via pagination dots', async () => {
    render(<Reviews />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const dots = screen.getAllByRole('button', { name: /mostrar reseña/i });
    await user.click(dots[1]);

    expect(dots[1]).toHaveAttribute('aria-current', 'true');
  });

  it('renders review form fields', async () => {
    render(<Reviews />);

    expect(screen.getByText(/publica tu reseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comentario/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /publicar reseña/i })).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<Reviews />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await user.click(screen.getByRole('button', { name: /publicar reseña/i }));

    expect(await screen.findByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/selecciona una calificación/i)).toBeInTheDocument();
    expect(screen.getByText(/el comentario debe tener al menos 10 caracteres/i)).toBeInTheDocument();
  });

  it('shows error when name is too short', async () => {
    render(<Reviews />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await user.type(screen.getByLabelText(/nombre/i), 'A');
    await user.click(screen.getByRole('button', { name: '3 estrellas' }));
    await user.type(screen.getByLabelText(/comentario/i), 'Una experiencia fantástica.');
    await user.click(screen.getByRole('button', { name: /publicar reseña/i }));

    expect(await screen.findByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
  });

  it('publishes a review and shows it immediately on success', async () => {
    const newReview = {
      id: 7,
      nombre: 'Nuevo Cliente',
      foto: 'https://ui-avatars.com/api/?name=Nuevo',
      estrellas: 5,
      comentario: 'Excelente restaurante, volveré pronto.',
      fecha: '2026-09-23',
    };

    vi.spyOn(global, 'fetch').mockImplementation((url, options) => {
      if (options?.method === 'POST') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: true, review: newReview }),
        });
      }
      return Promise.reject(new Error('Backend no disponible'));
    });

    render(<Reviews />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await user.type(screen.getByLabelText(/nombre/i), 'Nuevo Cliente');
    await user.click(screen.getByRole('button', { name: '5 estrellas' }));
    await user.type(screen.getByLabelText(/comentario/i), 'Excelente restaurante, volveré pronto.');
    await user.click(screen.getByRole('button', { name: /publicar reseña/i }));

    expect(await screen.findByText(/tu reseña se publicó correctamente/i)).toBeInTheDocument();
    expect(screen.getByText('Nuevo Cliente')).toBeInTheDocument();
    expect(screen.getByText(/excelente restaurante, volveré pronto/i)).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/reviews',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: 'Nuevo Cliente',
          comentario: 'Excelente restaurante, volveré pronto.',
          estrellas: 5,
        }),
      })
    );
  });

  it('shows error message when publish fails', async () => {
    vi.spyOn(global, 'fetch').mockImplementation((url, options) => {
      if (options?.method === 'POST') {
        return Promise.resolve({
          ok: false,
          json: async () => ({ error: 'Demasiadas reseñas' }),
        });
      }
      return Promise.reject(new Error('Backend no disponible'));
    });

    render(<Reviews />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    await user.type(screen.getByLabelText(/nombre/i), 'Spammer');
    await user.click(screen.getByRole('button', { name: '1 estrella' }));
    await user.type(screen.getByLabelText(/comentario/i), 'Esto es un comentario de prueba.');
    await user.click(screen.getByRole('button', { name: /publicar reseña/i }));

    expect(await screen.findByText(/demasiadas reseñas/i)).toBeInTheDocument();
  });

  it('loads reviews from API when available', async () => {
    const apiReviews = [
      {
        id: 100,
        nombre: 'API Review',
        foto: 'https://example.com/avatar.png',
        estrellas: 5,
        comentario: 'Reseña cargada desde el backend del servidor.',
        fecha: '2026-09-20',
      },
    ];

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ reviews: apiReviews }),
    });

    render(<Reviews />);

    expect(await screen.findByText('API Review')).toBeInTheDocument();
    expect(screen.getByText(/reseña cargada desde el backend/i)).toBeInTheDocument();
  });
});
