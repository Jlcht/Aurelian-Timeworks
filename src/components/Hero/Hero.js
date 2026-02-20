import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroWatch from '../../assets/images/Theherowatch.png';
import wristShot from '../../assets/images/Wrist-shot.png';
import closeUp from '../../assets/images/Close-up.png';
import './Hero.css';

const slides = [
    {
        id: 0,
        image: heroWatch,
        label: 'New Collection 2026',
        headline: 'Crafted\nfor Eternity',
        sub: 'Each piece tells a story of uncompromising excellence and timeless precision.',
        cta: 'Explore the Collection',
        ctaLink: '/products',
    },
    {
        id: 1,
        image: wristShot,
        label: 'Signature Series',
        headline: 'Wear Your\nLegacy',
        sub: 'A statement of refinement worn on the wrist of those who demand the finest.',
        cta: 'Discover the Series',
        ctaLink: '/products',
    },
    {
        id: 2,
        image: closeUp,
        label: 'Swiss Craftsmanship',
        headline: 'The Art\nWithin',
        sub: 'Hundreds of hand-finished components, assembled by masters of the craft.',
        cta: 'Our Savoir-Faire',
        ctaLink: '/products',
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            goToNext();
        }, 6000);
        return () => clearInterval(timer);
    }, [current]);

    const goTo = (index) => {
        if (animating || index === current) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent(index);
            setAnimating(false);
        }, 800);
    };

    const goToNext = () => {
        goTo((current + 1) % slides.length);
    };

    return (
        <section className="hero" aria-label="Featured Collection">
            {/* Slides */}
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className={`hero-slide ${i === current ? 'hero-slide--active' : ''}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                    aria-hidden={i !== current}
                />
            ))}

            {/* Dark gradient overlay */}
            <div className="hero-overlay" />

            {/* Content */}
            <div className={`hero-content ${animating ? 'hero-content--exit' : 'hero-content--enter'}`}>
                <p className="hero-label">{slides[current].label}</p>

                <h1 className="hero-headline">
                    {slides[current].headline.split('\n').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                    ))}
                </h1>

                <div className="hero-rule" />

                <p className="hero-sub">{slides[current].sub}</p>

                <Link to={slides[current].ctaLink} className="hero-cta">
                    {slides[current].cta}
                    <span className="hero-cta-arrow">→</span>
                </Link>
            </div>

            {/* Dot indicators */}
            <nav className="hero-dots" aria-label="Slide navigation">
                {slides.map((slide, i) => (
                    <button
                        key={slide.id}
                        className={`hero-dot ${i === current ? 'hero-dot--active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </nav>

            {/* Slide counter */}
            <div className="hero-counter">
                <span className="hero-counter-current">0{current + 1}</span>
                <span className="hero-counter-sep"> / </span>
                <span className="hero-counter-total">0{slides.length}</span>
            </div>

            {/* Progress bar */}
            <div className="hero-progress">
                <div key={current} className="hero-progress-bar" />
            </div>
        </section>
    );
};

export default Hero;
