'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DualSpotlightSystem } from './DualSpotlightSystem';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [isEntered, setIsEntered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Subtle entrance animation trigger
    const timer = setTimeout(() => setIsEntered(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Listen for scroll back to top to restore hero state
  useEffect(() => {
    if (!isTransitioning) return;

    const handleScroll = () => {
      if (window.scrollY < 20) {
        setIsTransitioning(false);
      }
    };

    // Attach scroll listener after programmatic scroll down completes
    const timer = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 3600);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTransitioning]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Sequence:
    // OLD HERO fades + moves
    // -> D (1.15s)
    // -> T (1.38s)
    // -> W (1.61s)
    // -> N (1.84s)
    // -> STAR (2.15s - 2.70s)
    // -> catalogue (smooth scroll triggered once star completes animation)
    setTimeout(() => {
      const catalogueEl = document.getElementById('catalogue');
      if (catalogueEl) {
        catalogueEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 2850);
  };

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Background: deep dark canvas */}
      <div className={styles.heroBg} />

      {/* Atmospheric dark gradient */}
      <div className={styles.atmosphericOverlay} />

      {/* Physical Two-Spotlight Stage Beam System */}
      <DualSpotlightSystem heroRef={heroRef} />

      {/* Cinematic Center DTWN★ Logo Reveal */}
      <div
        className={`${styles.logoRevealContainer} ${
          isTransitioning ? styles.logoRevealActive : ''
        }`}
        aria-hidden="true"
      >
        <div className={styles.logoRevealInner}>
          <span className={`${styles.revealChar} ${styles.charD}`}>
            <Image
              src="/images/dtwn-white-d.png"
              alt="D"
              width={80}
              height={100}
              priority
              className={styles.revealImg}
            />
          </span>
          <span className={`${styles.revealChar} ${styles.charT}`}>
            <Image
              src="/images/dtwn-white-t.png"
              alt="T"
              width={42}
              height={100}
              priority
              className={styles.revealImg}
            />
          </span>
          <span className={`${styles.revealChar} ${styles.charW}`}>
            <Image
              src="/images/dtwn-white-w.png"
              alt="W"
              width={101}
              height={100}
              priority
              className={styles.revealImg}
            />
          </span>
          <span className={`${styles.revealChar} ${styles.charN}`}>
            <Image
              src="/images/dtwn-white-n.png"
              alt="N"
              width={71}
              height={100}
              priority
              className={styles.revealImg}
            />
          </span>
          <span className={`${styles.revealChar} ${styles.charStar}`}>
            <Image
              src="/images/dtwn-white-star.png"
              alt="★"
              width={96}
              height={100}
              priority
              className={styles.revealImg}
            />
          </span>
        </div>
      </div>

      {/* Main Hero Container framing both artwork and typography */}
      <div
        className={`container ${styles.heroContainer} ${
          isEntered ? styles.heroVisible : ''
        } ${isTransitioning ? styles.isTransitioning : ''}`}
      >
        {/* The isolated MEET DIRTTOWN artwork (no black box, background & beams show through) */}
        <div className={styles.artworkFrame}>
          <Image
            src="/images/meet-dirttown-isolated.webp"
            alt="Meet Dirttown"
            fill
            priority
            className={styles.artworkImage}
            sizes="(max-width: 900px) 90vw, 50vw"
          />
        </div>

        {/* Foreground Content with refined white typography & single CTA */}
        <div className={styles.heroContent}>
          <div className={styles.headlineGroup}>
            <h1 className={styles.mainHeadline}>
              THE TOWN<br />IS YOURS
            </h1>
            <p className={styles.subline}>YOU MADE IT, YOU ARE ONE OF US</p>
          </div>

          {/* Single minimal CTA */}
          <Link href="#catalogue" onClick={handleCtaClick} className={styles.heroCta}>
            <span>EXPLORE OUR COLLECTION</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Campaign line: MATCH THE FREAK WITH DENIM */}
          <p className={styles.campaignLine}>MATCH THE FREAK WITH DENIM</p>
        </div>
      </div>
    </section>
  );
}

