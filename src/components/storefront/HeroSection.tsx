'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DualSpotlightSystem } from './DualSpotlightSystem';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    // Subtle entrance animation trigger
    const timer = setTimeout(() => setIsEntered(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      {/* Background: deep dark canvas */}
      <div className={styles.heroBg} />

      {/* Atmospheric dark gradient */}
      <div className={styles.atmosphericOverlay} />

      {/* Physical Two-Spotlight Stage Beam System */}
      <DualSpotlightSystem heroRef={heroRef} />

      {/* Main Hero Container framing both artwork and typography */}
      <div className={`container ${styles.heroContainer} ${isEntered ? styles.heroVisible : ''}`}>
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
          <Link href="#catalogue" className={styles.heroCta}>
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
