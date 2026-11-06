export const scrollToId = (id) => {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** Jump to the contact form and pre-fill the "what do you need" field. */
export const startProject = (topic) => {
  if (topic) {
    window.dispatchEvent(new CustomEvent('prefill-contact', { detail: topic }));
  }
  scrollToId('#contact');
};

export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const SectionHeader = ({ eyebrow, title, accent, children, align = 'left' }) => {
  return (
    <header className={`section-head section-head--${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">
        {title} {accent && <em className="serif-accent">{accent}</em>}
      </h2>
      {children && <p className="section-lede">{children}</p>}
    </header>
  );
};
