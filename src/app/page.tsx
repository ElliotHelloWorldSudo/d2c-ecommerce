'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/storefront/ProductCard';
import { INITIAL_PRODUCTS } from '@/lib/mockData';
import styles from './page.module.css';
import HeroSection from '@/components/storefront/HeroSection';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Baggy' | 'Wide-leg'>('All');

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    if (activeFilter === 'All') return true;
    return product.subcategory.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className={styles.homeWrapper}>
      {/* Redesigned Hero */}
      <HeroSection />

      {/* Category Spotlight Selector */}
      <section className={styles.categorySection}>
        <div className="container">
          <div className={styles.categoryGrid}>
            <button
              onClick={() => setActiveFilter('Baggy')}
              className={`${styles.categoryCard} ${activeFilter === 'Baggy' ? styles.activeCategory : ''}`}
            >
              <div className={styles.categoryMeta}>
                <h3>BAGGY JEANS</h3>
                <p>Over-sized slouchy fit & heavy drape</p>
              </div>
              <span className={styles.categoryLinkText}>Filter Category →</span>
            </button>

            <button
              onClick={() => setActiveFilter('Wide-leg')}
              className={`${styles.categoryCard} ${activeFilter === 'Wide-leg' ? styles.activeCategory : ''}`}
            >
              <div className={styles.categoryMeta}>
                <h3>WIDE-LEG JEANS</h3>
                <p>Architectural straight cut & tailored waist</p>
              </div>
              <span className={styles.categoryLinkText}>Filter Category →</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Product Catalogue Section */}
      <section id="catalogue" className={styles.catalogueSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className="heading-section">INITIAL CATALOGUE</h2>
              <p className="text-subtle">Showing {filteredProducts.length} items for first drop</p>
            </div>

            {/* Filter Tabs */}
            <div className={styles.filterTabs}>
              <button
                className={`${styles.tabBtn} ${activeFilter === 'All' ? styles.activeTab : ''}`}
                onClick={() => setActiveFilter('All')}
              >
                All Bottoms ({INITIAL_PRODUCTS.length})
              </button>
              <button
                className={`${styles.tabBtn} ${activeFilter === 'Baggy' ? styles.activeTab : ''}`}
                onClick={() => setActiveFilter('Baggy')}
              >
                Baggy
              </button>
              <button
                className={`${styles.tabBtn} ${activeFilter === 'Wide-leg' ? styles.activeTab : ''}`}
                onClick={() => setActiveFilter('Wide-leg')}
              >
                Wide-Leg
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Energy Banner */}
      <section className={styles.energySection}>
        <div className="container">
          <div className={styles.energyCard}>
            <h2>MODERN. YOUTHFUL. DIGITAL-FIRST.</h2>
            <p>
              Built around individual pricing flexibility, high-end cotton denim, and bold fashion-forward composition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
