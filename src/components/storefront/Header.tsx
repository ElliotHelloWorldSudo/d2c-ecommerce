'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        {/* Left: Mobile Drawer Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo: DTWN★ */}
        <Link href="/" className={styles.logo} aria-label="DTWN Home">
          <Image
            src="/images/dtwn-logo.png"
            alt="DTWN"
            width={94}
            height={24}
            priority
            className={styles.logoImg}
          />
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className={styles.desktopNav}>
          <Link href="/shop" className={`${styles.navLink} ${styles.navLinkShopAll}`}>Shop All</Link>
          <Link href="/shop/baggy" className={styles.navLink}>Baggy Jeans</Link>
          <Link href="/shop/wide-leg" className={styles.navLink}>Wide-Leg Jeans</Link>
          <Link href="/about" className={`${styles.navLink} ${styles.navLinkAbout}`}>About</Link>
        </nav>

        {/* Right Actions */}
        <div className={styles.actionGroup}>
          <button className={styles.iconBtn} aria-label="Search Catalog">
            <Search size={20} />
          </button>
          
          <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
            <Heart size={20} />
            <span className={styles.badge}>0</span>
          </Link>

          <Link href="/cart" className={styles.iconBtn} aria-label="Shopping Cart">
            <ShoppingBag size={20} />
            <span className={styles.badge}>0</span>
          </Link>

          <Link href="/account/login" className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Account Login">
            <User size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              Home
            </Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              All Jeans Collection
            </Link>
            <Link href="/shop/baggy" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              Baggy Jeans
            </Link>
            <Link href="/shop/wide-leg" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              Wide-Leg Jeans
            </Link>
            <hr className={styles.divider} />
            <Link href="/account/login" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLinkSubtle}>
              My Account
            </Link>
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLinkSubtle}>
              Wishlist (0)
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
