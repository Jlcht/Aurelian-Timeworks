import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './Contact.css';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: wire to backend / email service
        setSent(true);
    };

    return (
        <>
            <Header />
            <main className="contact-page">

                <div className="contact-header">
                    <p className="contact-label">Get in Touch</p>
                    <h1 className="contact-headline">Contact Us</h1>
                    <div className="contact-rule" />
                    <p className="contact-sub">
                        Whether you have a question about a timepiece, wish to discuss a private sale,
                        or simply want to connect — we are at your disposal.
                    </p>
                </div>

                <div className="contact-body">

                    {/* ── Info sidebar ── */}
                    <aside className="contact-info">
                        <div className="contact-info-block">
                            <p className="contact-info-label">Enquiries</p>
                            <a href="mailto:contact@aureliantimeworks.com" className="contact-info-value">
                                contact@aureliantimeworks.com
                            </a>
                        </div>
                        <div className="contact-info-block">
                            <p className="contact-info-label">Private Sales</p>
                            <a href="mailto:private@aureliantimeworks.com" className="contact-info-value">
                                private@aureliantimeworks.com
                            </a>
                        </div>
                        <div className="contact-info-block">
                            <p className="contact-info-label">Follow Us</p>
                            <div className="contact-socials">
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact-social-link">Instagram</a>
                                <a href="https://x.com" target="_blank" rel="noreferrer" className="contact-social-link">X / Twitter</a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-social-link">LinkedIn</a>
                            </div>
                        </div>
                        <div className="contact-info-block">
                            <p className="contact-info-label">Response Time</p>
                            <p className="contact-info-value">Within 24 hours</p>
                        </div>
                    </aside>

                    {/* ── Form ── */}
                    <div className="contact-form-wrapper">
                        {sent ? (
                            <div className="contact-success">
                                <span className="contact-success-icon">✦</span>
                                <h2>Message Received</h2>
                                <p>Thank you for reaching out. A member of our team will be in touch shortly.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="contact-form-row">
                                    <div className="contact-field">
                                        <label htmlFor="name">Full Name</label>
                                        <input id="name" name="name" type="text" required placeholder="Your name" value={form.name} onChange={handleChange} />
                                    </div>
                                    <div className="contact-field">
                                        <label htmlFor="email">Email Address</label>
                                        <input id="email" name="email" type="email" required placeholder="your@email.com" value={form.email} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="contact-field">
                                    <label htmlFor="subject">Subject</label>
                                    <input id="subject" name="subject" type="text" placeholder="Inquiry about a timepiece…" value={form.subject} onChange={handleChange} />
                                </div>
                                <div className="contact-field">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows={6} required placeholder="Tell us how we can help…" value={form.message} onChange={handleChange} />
                                </div>
                                <button type="submit" className="contact-submit">
                                    Send Message <span>→</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Contact;
