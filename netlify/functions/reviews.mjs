// Returns reviews submitted through the "review" Netlify Form.
// Only public fields are returned; email, IP and user agent never leave this function.
// Requires the NETLIFY_API_TOKEN environment variable (a Netlify personal access token).
// To remove a review from the site, delete its submission in Netlify (Forms > review).

const API = 'https://api.netlify.com/api/v1';
const FORM_NAME = 'review';

const clip = (value, max) => String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

const respond = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=60, stale-while-revalidate=300'
    }
  });

export default async (req, context) => {
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.REVIEWS_SITE_ID || context?.site?.id || process.env.SITE_ID;

  if (!token || !siteId) {
    return respond({ reviews: [], configured: false });
  }

  const auth = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const formsRes = await fetch(`${API}/sites/${siteId}/forms`, auth);
    if (!formsRes.ok) throw new Error(`forms request failed: ${formsRes.status}`);
    const form = (await formsRes.json()).find((f) => f.name === FORM_NAME);
    if (!form) return respond({ reviews: [] });

    const subsRes = await fetch(`${API}/forms/${form.id}/submissions?per_page=100`, auth);
    if (!subsRes.ok) throw new Error(`submissions request failed: ${subsRes.status}`);
    const submissions = await subsRes.json();

    const reviews = submissions
      .map((s) => {
        const d = s.data || {};
        const rating = Math.round(Number(d.rating));
        return {
          id: s.id,
          name: clip(d.name, 60),
          role: clip(d.role, 80),
          store: clip(d.store, 120),
          rating: rating >= 1 && rating <= 5 ? rating : 0,
          text: clip(d.review, 800),
          date: s.created_at,
          consent: d.consent === 'yes'
        };
      })
      .filter((r) => r.consent && r.name && r.text && r.rating)
      .map(({ consent, ...r }) => r)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return respond({ reviews });
  } catch (err) {
    console.error(err);
    return respond({ reviews: [], error: true }, 502);
  }
};
