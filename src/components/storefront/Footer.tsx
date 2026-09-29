import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        {/* Brand Info */}
        <div className={styles.brandCol}>
          <h3 className={styles.brandTitle}>NEW STREETWEAR</h3>
          <p className={styles.brandDesc}>
            Modern bottoms-first clothing brand specializing in heavy-denim baggy and wide-leg silhouettes. Designed for Gen-Z streetwear culture.
          </p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Clothing Brand E-Commerce. All rights reserved.
          </p>
        </div>

        {/* Categories */}
        <div className={styles.linksCol}>
          <h4 className={styles.colHeader}>Catalogue</h4>
          <ul className={styles.linkList}>
            <li><Link href="/shop/baggy">Baggy Jeans</Link></li>
            <li><Link href="/shop/wide-leg">Wide-Leg Jeans</Link></li>
            <li><Link href="/shop">All Bottoms</Link></li>
            <li><span className={styles.upcomingBadge}>Future Drops Soon</span></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className={styles.linksCol}>
          <h4 className={styles.colHeader}>Customer Service</h4>
          <ul className={styles.linkList}>
            <li><Link href="/orders">Order Tracking</Link></li>
            <li><Link href="/shipping">Shipping & Returns</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact Support</Link></li>
          </ul>
        </div>

        {/* Legal & Policy */}
        <div className={styles.linksCol}>
          <h4 className={styles.colHeader}>Legal</h4>
          <ul className={styles.linkList}>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
