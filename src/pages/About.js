import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import boutiqueImg from '../assets/images/aurelian-t-front-boutique.png';
import './About.css';

const values = [
    {
        icon: '✦',
        title: 'Curation Over Quantity',
        desc: 'A smaller, constantly evolving catalogue — every piece earns its place.',
    },
    {
        icon: '◈',
        title: 'Radical Transparency',
        desc: 'Full provenance, service history, and pricing rationale. No hidden stories.',
    },
    {
        icon: '⬡',
        title: 'Respect for Craftsmanship',
        desc: 'We honour the artisans, engineers, and makers behind every movement.',
    },
    {
        icon: '◻',
        title: 'Privacy & Discretion',
        desc: 'Absolute confidentiality for every buyer and seller, without exception.',
    },
];

const timeline = [
    {
        label: 'Origin',
        heading: 'Born from Frustration',
        body: 'Founded by a small group of watch enthusiasts and technologists, Aurelian Timeworks was born from a single frustration: finding a trustworthy, beautifully designed online space for serious timepiece discovery.',
    },
    {
        label: 'Philosophy',
        heading: 'The Edit',
        body: 'Instead of endless, noisy listings, Aurelian focuses on a smaller, constantly evolving catalogue. Each watch is selected for its design, provenance, and mechanical integrity, then documented with high‑resolution imagery and transparent history.',
    },
    {
        label: 'Approach',
        heading: 'A Digital-First Atelier',
        body: 'The platform blends the intimacy of a boutique with the clarity of a modern interface — detailed specs, provenance timelines, and immersive visuals give collectors confidence before they ever speak to a specialist.',
    },
    {
        label: 'Future',
        heading: 'What\'s Next',
        body: 'Aurelian\'s roadmap includes private digital viewings, curated drops around themes (e.g. "pilot icons", "neo‑vintage integrated bracelets"), and data-backed tools that help collectors track market movements without losing sight of the watches themselves.',
    },
];

const About = () => {
    return (
        <>
            <Header />
            <main className="about-page">

                {/* ── Hero banner ── */}
                <section className="about-hero">
                    <div className="about-hero-inner">
                        <p className="about-hero-label">Our Maison</p>
                        <h1 className="about-hero-headline">Where Precision<br />Meets Trust</h1>
                        <div className="about-hero-rule" />
                        <p className="about-hero-bio">
                            Aurelian Timeworks is a curator of exceptional pre-owned and new luxury watches,
                            partnering with reputable collectors and boutiques worldwide. Every piece is
                            authenticated, documented, and presented with the same care as in a physical
                            haute horlogerie salon.
                        </p>
                    </div>
                    <div className="about-hero-image-wrap">
                        <img
                            src={boutiqueImg}
                            alt="Aurelian Timeworks boutique storefront"
                            className="about-hero-image"
                        />
                    </div>
                </section>

                {/* ── Mission ── */}
                <section className="about-mission">
                    <div className="about-mission-inner">
                        <p className="about-section-label">Mission</p>
                        <blockquote className="about-mission-quote">
                            "To make high-end watch collecting more transparent, curated, and visually
                            immersive — without compromising on discretion or trust."
                        </blockquote>
                    </div>
                </section>

                {/* ── Brand Timeline ── */}
                <section className="about-timeline-section">
                    <div className="about-timeline-header">
                        <p className="about-section-label">Our Story</p>
                        <h2 className="about-section-heading">The Aurelian Story</h2>
                    </div>
                    <div className="about-timeline">
                        {timeline.map((item, i) => (
                            <div className="about-timeline-item" key={i}>
                                <div className="about-timeline-marker">
                                    <span className="about-timeline-dot" />
                                    <span className="about-timeline-label">{item.label}</span>
                                </div>
                                <div className="about-timeline-content">
                                    <h3>{item.heading}</h3>
                                    <p>{item.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Values ── */}
                <section className="about-values">
                    <div className="about-values-header">
                        <p className="about-section-label">What We Stand For</p>
                        <h2 className="about-section-heading">Our Values</h2>
                    </div>
                    <div className="about-values-grid">
                        {values.map((v, i) => (
                            <div className="about-value-card" key={i}>
                                <span className="about-value-icon">{v.icon}</span>
                                <h3 className="about-value-title">{v.title}</h3>
                                <p className="about-value-desc">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
};

export default About;
