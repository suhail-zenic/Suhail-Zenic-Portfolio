import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiClipboard, FiCode, FiSend } from 'react-icons/fi';
import { SectionHeader, reveal } from './utils';

const STEPS = [
  {
    icon: FiMessageCircle,
    title: 'Say hello',
    time: 'First email',
    text: 'Send your store URL and what’s on fire. I reply personally and tell you up front how soon I can start.'
  },
  {
    icon: FiClipboard,
    title: 'Clear scope',
    time: 'Before any code',
    text: 'You get a plain-English plan: what goes in Liquid, what needs an app, plus timeline and cost before any work starts.'
  },
  {
    icon: FiCode,
    title: 'Build in staging',
    time: 'During the build',
    text: 'I work on a duplicate theme or dev store, so your live sales are never at risk. You preview everything.'
  },
  {
    icon: FiSend,
    title: 'Launch & care',
    time: 'After launch',
    text: 'Calm launch, a monitoring window afterwards and handover notes so your team feels at home.'
  }
];

const Process = () => (
  <section id="process" className="section">
    <div className="container">
      <SectionHeader eyebrow="How it works" title="Simple, honest," accent="no surprises">
        Working with a developer shouldn’t feel stressful. Here’s what to expect.
      </SectionHeader>

      <ol className="steps">
        {STEPS.map((s, i) => (
          <motion.li key={s.title} className="step" {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
            <div className="step__num">{String(i + 1).padStart(2, '0')}</div>
            <div className="step__icon">
              <s.icon />
            </div>
            <span className="step__time mono">{s.time}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

export default Process;
