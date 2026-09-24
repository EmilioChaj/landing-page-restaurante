import { Router } from 'express';
import { subscribeContact } from '../services/brevo.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/subscribe', rateLimiter, async (req, res) => {
  try {
    const { email, gdprConsent } = req.body;

    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Email no válido' });
    }

    if (gdprConsent !== true) {
      return res.status(400).json({ error: 'Debes aceptar la política de privacidad' });
    }

    const listId = Number(process.env.BREVO_LIST_ID);
    const templateId = Number(process.env.BREVO_TEMPLATE_ID);
    const baseUrl = process.env.REDIRECT_URL || 'http://localhost:3001';
    const redirectUrl = `${baseUrl}/confirmado`;

    await subscribeContact(email, listId, templateId, redirectUrl);

    return res.status(200).json({
      success: true,
      message: 'Revisa tu email para confirmar la suscripción',
    });
  } catch (err) {
    console.error('Error en /api/subscribe:', err.message);
    return res.status(500).json({ error: 'Error al procesar la suscripción' });
  }
});

export function handleConfirm(req, res) {
  const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5173';

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Suscripción Confirmada - Corte Italiana</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      background-color: #1a1a1a;
      color: #ffffff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .container {
      text-align: center;
      max-width: 500px;
      width: 100%;
      background: #242424;
      border: 1px solid rgba(212, 175, 55, 0.3);
      border-radius: 12px;
      padding: 3rem 2rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    }
    .icon {
      font-size: 4rem;
      margin-bottom: 1.5rem;
      display: block;
    }
    h1 {
      color: #d4af37;
      font-size: 1.8rem;
      margin-bottom: 1rem;
      font-weight: normal;
    }
    p {
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.6;
      margin-bottom: 0.75rem;
      font-family: Arial, sans-serif;
      font-size: 0.95rem;
    }
    .brand {
      color: #d4af37;
      font-size: 1.1rem;
      margin-top: 1.5rem;
      font-style: italic;
    }
    .btn {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.85rem 2rem;
      background-color: #d4af37;
      color: #1a1a1a;
      text-decoration: none;
      border-radius: 6px;
      font-weight: bold;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
      transition: background-color 0.2s;
    }
    .btn:hover { background-color: #b8860b; }
  </style>
</head>
<body>
  <div class="container">
    <span class="icon">&#10003;</span>
    <h1>&iexcl;Suscripci&oacute;n confirmada!</h1>
    <p>Gracias por unirte a nuestro newsletter. Pronto recibir&aacute;s ofertas exclusivas y novedades de Corte Italiana.</p>
    <a href="${frontendUrl}" class="btn">VOLVER AL INICIO</a>
    <p class="brand">&#127837; Corte Italiana</p>
  </div>
</body>
</html>`;

  res.status(200).type('html').send(html);
}

export default router;
