import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { FiCheck, FiSend, FiAlertCircle } from 'react-icons/fi';
import { SectionHeader, reveal } from './utils';

const REVIEWS_ENDPOINT = '/.netlify/functions/reviews';
const EMPTY = { name: '', email: '', role: '', store: '', review: '', consent: false, 'bot-field': '' };
const MAX_REVIEW = 800;

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const safeStoreUrl = (value) => {
  if (!value) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url : null;
  } catch {
    return null;
  }
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en', { month: 'short', year: 'numeric' });
};

const Stars = ({ value, size }) => (
  <span className="stars" style={size ? { fontSize: size } : undefined} aria-label={`${value} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={i < value ? 'is-on' : ''} aria-hidden />
    ))}
  </span>
);

const ReviewCard = ({ r }) => {
  const store = safeStoreUrl(r.store);
  return (
    <motion.figure
      className="review"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Stars value={r.rating} />
      <blockquote>{r.text}</blockquote>
      <figcaption>
        <span className="review__avatar" aria-hidden>
          {initials(r.name)}
        </span>
        <span className="review__who">
          <strong>{r.name}</strong>
          <small>
            {r.role}
            {r.role && store && ' · '}
            {store && (
              <a href={store.href} target="_blank" rel="nofollow ugc noopener noreferrer">
                {store.hostname.replace(/^www\./, '')}
              </a>
            )}
          </small>
        </span>
        <span className="review__date mono">{formatDate(r.date)}</span>
      </figcaption>
    </motion.figure>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  useEffect(() => {
    let alive = true;
    fetch(REVIEWS_ENDPOINT)
      .then((res) => (res.ok ? res.json() : { reviews: [] }))
      .then((data) => alive && setReviews(Array.isArray(data.reviews) ? data.reviews : []))
      .catch(() => alive && setReviews([]))
      .finally(() => alive && setLoaded(true));
    return () => {
      alive = false;
    };
  }, []);

  const average = useMemo(
    () => (reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0),
    [reviews]
  );

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setStatus('need-rating');
      return;
    }
    setStatus('sending');
    try {
      const body = new URLSearchParams({
        'form-name': 'review',
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role.trim(),
        store: form.store.trim(),
        rating: String(rating),
        review: form.review.trim(),
        consent: form.consent ? 'yes' : '',
        'bot-field': form['bot-field']
      }).toString();
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setForm(EMPTY);
      setRating(0);
    } catch {
      setStatus('error');
    }
  };

  const shown = hover || rating;

  return (
    <section id="reviews" className="section section--ink">
      <div className="container">
        <SectionHeader eyebrow="Reviews" title="What clients" accent="say">
          Reviews written by people I&apos;ve worked with, published as they wrote them.
        </SectionHeader>

        <div className="reviews">
          <div className="reviews__list">
            {loaded && reviews.length > 0 && (
              <div className="reviews__summary">
                <span className="reviews__avg">{average.toFixed(1)}</span>
                <span>
                  <Stars value={Math.round(average)} />
                  <small>
                    Based on {reviews.length} review{reviews.length === 1 ? '' : 's'}
                  </small>
                </span>
              </div>
            )}

            {loaded && reviews.length === 0 && (
              <motion.div className="reviews__empty" {...reveal}>
                <span className="reviews__empty-stars" aria-hidden>
                  ★★★★★
                </span>
                <h3>No reviews yet</h3>
                <p>
                  Worked with me on your Shopify store? I&apos;d be grateful if you&apos;d be the first to share how it
                  went.
                </p>
              </motion.div>
            )}

            {!loaded && <div className="reviews__loading" aria-hidden />}

            <AnimatePresence>
              {reviews.map((r) => (
                <ReviewCard key={r.id} r={r} />
              ))}
            </AnimatePresence>
          </div>

          <motion.div className="reviews__form-wrap" {...reveal}>
            {status === 'sent' ? (
              <div className="review-form review-form--done" role="status">
                <span className="review-form__done-icon">
                  <FiCheck />
                </span>
                <h3>Thank you!</h3>
                <p>Your review has been received and will appear here shortly.</p>
                <button type="button" className="link-btn" onClick={() => setStatus('idle')}>
                  Write another review
                </button>
              </div>
            ) : (
              <form className="review-form" onSubmit={onSubmit} name="review">
                <h3>Write a review</h3>
                <p className="review-form__intro">Worked with me? Tell others how it went.</p>

                <p className="hp" aria-hidden>
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" value={form['bot-field']} onChange={onChange} tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <fieldset className="rating-input">
                  <legend>Your rating</legend>
                  <div className="rating-input__stars" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <label key={n} onMouseEnter={() => setHover(n)} className={n <= shown ? 'is-on' : ''}>
                        <input
                          type="radio"
                          name="rating"
                          value={n}
                          checked={rating === n}
                          onChange={() => {
                            setRating(n);
                            if (status === 'need-rating') setStatus('idle');
                          }}
                        />
                        <FaStar aria-hidden />
                        <span className="sr-only">
                          {n} star{n > 1 ? 's' : ''}
                        </span>
                      </label>
                    ))}
                  </div>
                  {status === 'need-rating' && <span className="field-error">Please choose a star rating.</span>}
                </fieldset>

                <div className="form__row">
                  <label className="field">
                    <span>Your name</span>
                    <input name="name" value={form.name} onChange={onChange} required maxLength={60} autoComplete="name" />
                  </label>
                  <label className="field">
                    <span>
                      Email <em>(never shown)</em>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      maxLength={120}
                      autoComplete="email"
                    />
                  </label>
                </div>

                <div className="form__row">
                  <label className="field">
                    <span>Role &amp; business</span>
                    <input
                      name="role"
                      value={form.role}
                      onChange={onChange}
                      required
                      maxLength={80}
                      placeholder="Founder, Brand name"
                    />
                  </label>
                  <label className="field">
                    <span>
                      Store URL <em>(optional)</em>
                    </span>
                    <input name="store" value={form.store} onChange={onChange} maxLength={120} placeholder="yourstore.com" />
                  </label>
                </div>

                <label className="field">
                  <span>Your review</span>
                  <textarea
                    name="review"
                    rows={4}
                    value={form.review}
                    onChange={onChange}
                    required
                    minLength={20}
                    maxLength={MAX_REVIEW}
                    placeholder="What did we work on, and how did it go?"
                  />
                  <small className="field__count mono">
                    {form.review.length}/{MAX_REVIEW}
                  </small>
                </label>

                <label className="consent">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} required />
                  <span>I worked with Suhail, and I agree to this review being shown publicly with my name.</span>
                </label>

                <button type="submit" className="btn btn--accent btn--lg btn--block" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : (
                    <>
                      Submit review <FiSend />
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <p className="form-error" role="alert">
                    <FiAlertCircle /> Something went wrong. Please try again, or email suhail.codes99@gmail.com.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
