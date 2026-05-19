'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Magnetic from '../../components/Magnetic';
import Ballpit from '../../components/Ballpit';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    services: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('Please fill in all required fields.');
      return;
    }
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message sent successfully! Haseeb will reach out to you shortly.');
      setForm({ name: '', email: '', organization: '', services: '', message: '' });
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Dynamic Interactive Ballpit Background */}
      <div className="contact-page__bg">
        <Ballpit
          count={100}
          gravity={0.08}
          friction={0.998}
          wallBounce={0.95}
          followCursor={true}
        />
      </div>

      {/* Back Button */}
      <div className="contact-page__nav">
        <Magnetic strength={0.3}>
          <Link href="/" className="contact-page__back-btn">
            ← Go Back Home
          </Link>
        </Magnetic>
      </div>

      <div className="contact-page__container">
        {/* Left Side: Editorial Typography Title & Info */}
        <div className="contact-page__info">
          <h1 className="contact-page__title">
            Let's start a<br />
            <span>project together.</span>
          </h1>

          <div className="contact-page__details">
            <div className="contact-page__detail-group">
              <span className="contact-page__label">Contact Details</span>
              <a href="mailto:haseebiqb06@gmail.com" className="contact-page__link">
                haseebiqb06@gmail.com
              </a>
              <a href="tel:+923019685025" className="contact-page__link">
                +92 301 9685025
              </a>
            </div>

            <div className="contact-page__detail-group">
              <span className="contact-page__label">Location</span>
              <span className="contact-page__val">Located in the Pakistan</span>
            </div>

            <div className="contact-page__detail-group">
              <span className="contact-page__label">Socials</span>
              <div className="contact-page__socials">
                <a href="#" className="contact-page__social-link">Instagram</a>
                <a href="#" className="contact-page__social-link">Twitter</a>
                <a href="https://www.linkedin.com/in/abdul-haseeb-iqbal-a128a6390" target="_blank" rel="noreferrer" className="contact-page__social-link">LinkedIn</a>
                <a href="https://github.com/haseebiqb06-cpu" target="_blank" rel="noreferrer" className="contact-page__social-link">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Luxurious Minimalist Form */}
        <form onSubmit={handleSubmit} className="contact-page__form">
          <div className="contact-page__form-row">
            <span className="contact-page__number">01</span>
            <div className="contact-page__input-group">
              <label className="contact-page__input-label">What's your name? *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="contact-page__input"
                required
              />
            </div>
          </div>

          <div className="contact-page__form-row">
            <span className="contact-page__number">02</span>
            <div className="contact-page__input-group">
              <label className="contact-page__input-label">What's your email? *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="contact-page__input"
                required
              />
            </div>
          </div>

          <div className="contact-page__form-row">
            <span className="contact-page__number">03</span>
            <div className="contact-page__input-group">
              <label className="contact-page__input-label">What's the name of your organization?</label>
              <input
                type="text"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                placeholder="Google, Inc."
                className="contact-page__input"
              />
            </div>
          </div>

          <div className="contact-page__form-row">
            <span className="contact-page__number">04</span>
            <div className="contact-page__input-group">
              <label className="contact-page__input-label">What services are you looking for?</label>
              <input
                type="text"
                name="services"
                value={form.services}
                onChange={handleChange}
                placeholder="Web Design, Web Development..."
                className="contact-page__input"
              />
            </div>
          </div>

          <div className="contact-page__form-row">
            <span className="contact-page__number">05</span>
            <div className="contact-page__input-group">
              <label className="contact-page__input-label">Your message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Hello Haseeb, I want to build a stunning website..."
                rows="4"
                className="contact-page__textarea"
                required
              />
            </div>
          </div>

          {status && (
            <div className={`contact-page__status ${status.includes('successfully') ? 'success' : 'info'}`}>
              {status}
            </div>
          )}

          <div className="contact-page__submit-wrapper">
            <Magnetic strength={0.4}>
              <button type="submit" className="round-btn round-btn--large round-btn--blue">
                Send<br />Message
              </button>
            </Magnetic>
          </div>
        </form>
      </div>
    </div>
  );
}
