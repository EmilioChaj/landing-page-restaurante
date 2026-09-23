import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from './Menu';
import menuData from '../../data/menu.json';

const user = userEvent.setup();

describe('Menu', () => {
  it('renders all menu items initially', () => {
    render(<Menu />);

    menuData.forEach((item) => {
      expect(screen.getByText(item.nombre)).toBeInTheDocument();
    });
  });

  it('renders category filter buttons', () => {
    render(<Menu />);

    expect(screen.getByRole('button', { name: /todos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entradas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /primeros platos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /platos fuertes/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /postres/i })).toBeInTheDocument();
  });

  it('filters items by category', async () => {
    render(<Menu />);

    await user.click(screen.getByRole('button', { name: /entradas/i }));

    const entradas = menuData.filter((item) => item.categoria === 'Entradas');
    const otherCategories = menuData.filter((item) => item.categoria !== 'Entradas');

    entradas.forEach((item) => {
      expect(screen.getByText(item.nombre)).toBeInTheDocument();
    });

    otherCategories.forEach((item) => {
      expect(screen.queryByText(item.nombre)).not.toBeInTheDocument();
    });
  });

  it('shows all items when "Todos" is clicked', async () => {
    render(<Menu />);

    await user.click(screen.getByRole('button', { name: /entradas/i }));
    await user.click(screen.getByRole('button', { name: /todos/i }));

    menuData.forEach((item) => {
      expect(screen.getByText(item.nombre)).toBeInTheDocument();
    });
  });

  it('displays highlighted badge for featured items', () => {
    render(<Menu />);

    const featured = menuData.filter((item) => item.destacado);
    featured.forEach((item) => {
      expect(screen.getAllByText('Destacado').length).toBeGreaterThanOrEqual(1);
    });
  });

  it('displays formatted prices', () => {
    render(<Menu />);

    menuData.forEach((item) => {
      const prices = screen.getAllByText(`Q${item.precio.toFixed(2)}`);
      expect(prices.length).toBeGreaterThanOrEqual(1);
    });
  });
});
