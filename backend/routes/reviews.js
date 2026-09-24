import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { reviewLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '..', 'data', 'reviews.json');

const readReviews = async () => {
  const raw = await readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
};

const writeReviews = async (reviews) => {
  await writeFile(DATA_FILE, `${JSON.stringify(reviews, null, 2)}\n`, 'utf-8');
};

router.get('/reviews', async (req, res) => {
  try {
    const reviews = await readReviews();
    return res.status(200).json({ reviews });
  } catch (err) {
    console.error('Error en GET /api/reviews:', err.message);
    return res.status(500).json({ error: 'Error al obtener las reseñas' });
  }
});

router.post('/reviews', reviewLimiter, async (req, res) => {
  try {
    const { nombre, comentario, estrellas } = req.body;

    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2 || nombre.trim().length > 50) {
      return res.status(400).json({ error: 'El nombre debe tener entre 2 y 50 caracteres' });
    }

    if (!comentario || typeof comentario !== 'string' || comentario.trim().length < 10 || comentario.trim().length > 500) {
      return res.status(400).json({ error: 'El comentario debe tener entre 10 y 500 caracteres' });
    }

    const stars = Number(estrellas);
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({ error: 'Las estrellas deben ser un número entero entre 1 y 5' });
    }

    const reviews = await readReviews();
    const nextId = reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;

    const newReview = {
      id: nextId,
      nombre: nombre.trim(),
      foto: `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre.trim())}&background=b8960b&color=1a1a1a&size=128`,
      estrellas: stars,
      comentario: comentario.trim(),
      fecha: new Date().toISOString().slice(0, 10),
    };

    reviews.push(newReview);
    await writeReviews(reviews);

    return res.status(201).json({ success: true, review: newReview });
  } catch (err) {
    console.error('Error en POST /api/reviews:', err.message);
    return res.status(500).json({ error: 'Error al publicar la reseña' });
  }
});

export default router;
