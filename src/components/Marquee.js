import React from 'react';

const WORDS = [
  'Liquid',
  'Online Store 2.0',
  'Shopify Plus',
  'Storefront API',
  'Admin GraphQL',
  'Metaobjects',
  'Checkout Extensibility',
  'Shopify Functions',
  'Markets',
  'B2B',
  'Webhooks',
  'Core Web Vitals'
];

const Row = ({ hidden }) => (
  <div className="marquee__row" aria-hidden={hidden || undefined}>
    {WORDS.map((w) => (
      <span key={w} className="marquee__item">
        {w}
        <span className="marquee__star">✦</span>
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="marquee" aria-label="Shopify technologies I work with">
    <div className="marquee__track">
      <Row />
      <Row hidden />
    </div>
  </div>
);

export default Marquee;
