import React from 'react';
import { ProductCard } from '@/components/storefront/ProductCard';
import { INITIAL_PRODUCTS } from '@/lib/mockData';

export default function ShopPage() {
  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="heading-section">ALL BOTTOMS</h1>
        <p className="text-subtle">Explore our initial collection of Baggy and Wide-Leg jeans</p>
      </div>

      <div className="product-grid">
        {INITIAL_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
