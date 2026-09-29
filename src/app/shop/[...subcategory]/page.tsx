import React from 'react';
import { ProductCard } from '@/components/storefront/ProductCard';
import { INITIAL_PRODUCTS } from '@/lib/mockData';

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ subcategory?: string[] }>;
}) {
  const resolvedParams = await params;
  const rawSubcategory = resolvedParams.subcategory?.[0] || '';
  const normalized = rawSubcategory.toLowerCase();

  const filtered = INITIAL_PRODUCTS.filter((product) => {
    return product.subcategory.toLowerCase().replace('-', '') === normalized.replace('-', '');
  });

  const title = normalized.includes('baggy')
    ? 'BAGGY JEANS'
    : normalized.includes('wide')
    ? 'WIDE-LEG JEANS'
    : 'CATALOGUE';

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="heading-section">{title}</h1>
        <p className="text-subtle">Showing {filtered.length} items in this category</p>
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
