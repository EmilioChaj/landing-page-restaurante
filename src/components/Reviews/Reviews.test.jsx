import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Reviews from './Reviews';
import reviewsData from '../../data/reviews.json';

const user = userEvent.setup();

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
});

describe('Reviews', () => {
  it('renders section title', () => {
    render(<Reviews />);

    expect(screen.getByText(/lo que dicen nuestros clientes/i)).toBeInTheDocument();
  });

  it('renders visible reviews', () => {
    render(<Reviews />);

    const firstReview = reviewsData[0];
    expect(screen.getByText(firstReview.nombre)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(firstReview.comentario.substring(0, 20)))).toBeInTheDocument();
  });

  it('renders star ratings', () => {
    render(<Reviews />);

    const firstReview = reviewsData[0];
    const stars = screen.getAllByText('★');
    expect(stars.length).toBeGreaterThanOrEqual(firstReview.estrellas);
  });

  it('renders navigation buttons', () => {
    render(<Reviews />);

    expect(screen.getByRole('button', { name: '‹' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '›' })).toBeInTheDocument();
  });

  it('navigates to next slide', async () => {
    render(<Reviews />);

    await user.click(screen.getByRole('button', { name: '›' }));

    const pageTwoReview = reviewsData[3];
    expect(screen.getByText(pageTwoReview.nombre)).toBeInTheDocument();
  });

  it('renders pagination dots', () => {
    render(<Reviews />);

    const dots = screen.getAllByRole('button', { name: /mostrar reseña/i });
    expect(dots.length).toBeGreaterThan(1);
  });

  it('navigates via pagination dots', async () => {
    render(<Reviews />);

    const dots = screen.getAllByRole('button', { name: /mostrar reseña/i });
    await user.click(dots[1]);

    expect(dots[1]).toHaveAttribute('aria-current', 'true');
  });
});
