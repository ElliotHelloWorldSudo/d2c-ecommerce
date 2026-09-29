import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/lib/mockData';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = INITIAL_PRODUCTS.find((p) => p.slug === resolvedParams.slug) || INITIAL_PRODUCTS[0];

  if (!product) {
    notFound();
  }

  const variant = product.variants[0];

  return (
    <div className="container" style={{ padding: '3rem 1.25rem' }}>
      <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> / <span>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {/* Gallery Placeholder */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: 'var(--bg-subtle)' }}>
            <Image
              src={variant.images[0]}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        {/* Product Meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {product.subcategory} Jeans
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '0.25rem' }}>{product.name}</h1>
            <p style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '0.5rem' }}>{product.priceFormatted}</p>
          </div>

          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{product.description}</p>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Color: {variant.colorName}</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {product.variants.map((v) => (
                <div key={v.id} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: v.colorHex || '#222', border: '1px solid var(--border-subtle)' }} />
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '700', marginBottom: '0.5rem' }}>Select Size:</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {variant.sizes.map((s) => (
                <button key={s.sku} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontWeight: '600', fontSize: '0.875rem' }}>
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button style={{ flex: 1, backgroundColor: 'var(--text-main)', color: 'var(--bg-surface)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontWeight: '700', textTransform: 'uppercase' }}>
              Add to Cart
            </button>
            <button style={{ padding: '1rem 1.5rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontWeight: '600' }}>
              Save to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
