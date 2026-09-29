'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants[selectedVariantIndex] || product.variants[0];
  
  // Primary image and secondary image for hover swap (if available)
  const primaryImage = activeVariant?.images[0] || 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop';
  const secondaryImage = activeVariant?.images[1] || primaryImage;

  return (
    <div className={styles.cardContainer}>
      {/* Product Image Frame */}
      <div 
        className={styles.imageFrame}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.slug}`} className={styles.imageLink}>
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={`${product.name} - ${activeVariant.colorName}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={styles.productImage}
            priority={false}
          />
        </Link>

        {/* Wishlist Action Button */}
        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label="Add to Wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Subcategory Label Tag */}
        <span className={styles.categoryTag}>{product.subcategory}</span>
      </div>

      {/* Product Details Section */}
      <div className={styles.details}>
        <div className={styles.titleRow}>
          <Link href={`/product/${product.slug}`} className={styles.productName}>
            {product.name}
          </Link>
          <span className={styles.price}>{product.priceFormatted}</span>
        </div>

        <p className={styles.variantName}>{activeVariant.colorName}</p>

        {/* Color Swatches */}
        {product.variants.length > 1 && (
          <div className={styles.swatchGroup}>
            {product.variants.map((variant, index) => (
              <button
                key={variant.id}
                className={`${styles.swatchDot} ${index === selectedVariantIndex ? styles.swatchActive : ''}`}
                style={{ backgroundColor: variant.colorHex || '#222' }}
                onClick={() => setSelectedVariantIndex(index)}
                title={variant.colorName}
                aria-label={`Select ${variant.colorName}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
