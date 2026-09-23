import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Gallery from './Gallery';
import galleryData from '../../data/gallery.json';

const user = userEvent.setup();

describe('Gallery', () => {
  it('renders all gallery images', () => {
    render(<Gallery />);

    galleryData.forEach((image) => {
      expect(screen.getByAltText(image.titulo)).toBeInTheDocument();
    });
  });

  it('renders filter buttons', () => {
    render(<Gallery />);

    expect(screen.getByRole('button', { name: /todas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /restaurante/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /comida/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /eventos/i })).toBeInTheDocument();
  });

  it('filters images by category', async () => {
    render(<Gallery />);

    await user.click(screen.getByRole('button', { name: /comida/i }));

    const comida = galleryData.filter((img) => img.categoria === 'Comida');
    const other = galleryData.filter((img) => img.categoria !== 'Comida');

    comida.forEach((img) => {
      expect(screen.getByAltText(img.titulo)).toBeInTheDocument();
    });

    other.forEach((img) => {
      expect(screen.queryByAltText(img.titulo)).not.toBeInTheDocument();
    });
  });

  it('opens lightbox when clicking an image', async () => {
    render(<Gallery />);

    const firstImage = galleryData[0];
    await user.click(screen.getByAltText(firstImage.titulo));

    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();
    expect(screen.getAllByText(firstImage.titulo).length).toBeGreaterThanOrEqual(2);
  });

  it('closes lightbox when clicking close button', async () => {
    render(<Gallery />);

    await user.click(screen.getByAltText(galleryData[0].titulo));
    expect(screen.getByRole('button', { name: '×' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '×' }));
    expect(screen.queryByRole('button', { name: '×' })).not.toBeInTheDocument();
  });

  it('navigates to next image', async () => {
    render(<Gallery />);

    await user.click(screen.getByAltText(galleryData[0].titulo));
    await user.click(screen.getByRole('button', { name: '›' }));

    expect(screen.getAllByText(galleryData[1].titulo).length).toBeGreaterThanOrEqual(1);
  });

  it('navigates to previous image', async () => {
    render(<Gallery />);

    await user.click(screen.getByAltText(galleryData[0].titulo));
    await user.click(screen.getByRole('button', { name: '‹' }));

    const lastIndex = galleryData.length - 1;
    expect(screen.getAllByText(galleryData[lastIndex].titulo).length).toBeGreaterThanOrEqual(1);
  });
});
