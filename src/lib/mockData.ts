import { Product } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-baggy-01',
    name: 'Baggy 01',
    slug: 'baggy-01-washed-blue',
    category: 'Jeans',
    subcategory: 'Baggy',
    description: 'Relaxed baggy fit jean crafted from heavy 13oz cotton denim with a classic washed blue finish and low waist profile.',
    priceFormatted: '₹TBD',
    isFeatured: true,
    variants: [
      {
        id: 'var-b1-blue',
        colorName: 'Washed Blue',
        colorHex: '#5b7c99',
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 15, sku: 'B01-BLU-28' },
          { size: '30', stock: 20, sku: 'B01-BLU-30' },
          { size: '32', stock: 18, sku: 'B01-BLU-32' },
          { size: '34', stock: 12, sku: 'B01-BLU-34' },
          { size: '36', stock: 8, sku: 'B01-BLU-36' }
        ]
      },
      {
        id: 'var-b1-black',
        colorName: 'Vintage Black',
        colorHex: '#222222',
        images: [
          'https://images.unsplash.com/photo-1542272604-780c36856842?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 10, sku: 'B01-BLK-28' },
          { size: '30', stock: 15, sku: 'B01-BLK-30' },
          { size: '32', stock: 15, sku: 'B01-BLK-32' },
          { size: '34', stock: 10, sku: 'B01-BLK-34' }
        ]
      },
      {
        id: 'var-b1-raw',
        colorName: 'Raw Indigo',
        colorHex: '#1b2a47',
        images: [
          'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '30', stock: 12, sku: 'B01-RAW-30' },
          { size: '32', stock: 14, sku: 'B01-RAW-32' },
          { size: '34', stock: 8, sku: 'B01-RAW-34' }
        ]
      }
    ]
  },
  {
    id: 'prod-baggy-02',
    name: 'Baggy 02',
    slug: 'baggy-02-charcoal-wash',
    category: 'Jeans',
    subcategory: 'Baggy',
    description: 'Over-sized slouchy denim trousers featuring subtle distressing along hems and relaxed thigh volume.',
    priceFormatted: '₹TBD',
    isFeatured: true,
    variants: [
      {
        id: 'var-b2-charcoal',
        colorName: 'Charcoal Wash',
        colorHex: '#3a3a3c',
        images: [
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 12, sku: 'B02-CHR-28' },
          { size: '30', stock: 18, sku: 'B02-CHR-30' },
          { size: '32', stock: 20, sku: 'B02-CHR-32' },
          { size: '34', stock: 15, sku: 'B02-CHR-34' }
        ]
      },
      {
        id: 'var-b2-bleach',
        colorName: 'Bleach Tint',
        colorHex: '#8da8c4',
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '30', stock: 10, sku: 'B02-BLC-30' },
          { size: '32', stock: 12, sku: 'B02-BLC-32' }
        ]
      }
    ]
  },
  {
    id: 'prod-baggy-03',
    name: 'Baggy 03',
    slug: 'baggy-03-dirty-sand',
    category: 'Jeans',
    subcategory: 'Baggy',
    description: 'Streetwear-infused dirty sand tint denim cut in an extra room wide leg silhouette.',
    priceFormatted: '₹TBD',
    isFeatured: false,
    variants: [
      {
        id: 'var-b3-sand',
        colorName: 'Dirty Sand',
        colorHex: '#9e8c75',
        images: [
          'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 8, sku: 'B03-SND-28' },
          { size: '30', stock: 14, sku: 'B03-SND-30' },
          { size: '32', stock: 16, sku: 'B03-SND-32' },
          { size: '34', stock: 10, sku: 'B03-SND-34' }
        ]
      }
    ]
  },
  {
    id: 'prod-baggy-04',
    name: 'Baggy 04',
    slug: 'baggy-04-acid-blue',
    category: 'Jeans',
    subcategory: 'Baggy',
    description: 'Retro 90s acid wash baggy jean with reinforced stitching and deep front slash pockets.',
    priceFormatted: '₹TBD',
    isFeatured: false,
    variants: [
      {
        id: 'var-b4-acid',
        colorName: 'Acid Blue',
        colorHex: '#698cae',
        images: [
          'https://images.unsplash.com/photo-1542272604-780c36856842?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '30', stock: 12, sku: 'B04-ACD-30' },
          { size: '32', stock: 15, sku: 'B04-ACD-32' },
          { size: '34', stock: 9, sku: 'B04-ACD-34' }
        ]
      }
    ]
  },
  {
    id: 'prod-baggy-05',
    name: 'Baggy 05',
    slug: 'baggy-05-faded-grey',
    category: 'Jeans',
    subcategory: 'Baggy',
    description: 'Heavy stonewash faded grey baggy jeans with clean ankle stack and relaxed hip cut.',
    priceFormatted: '₹TBD',
    isFeatured: false,
    variants: [
      {
        id: 'var-b5-grey',
        colorName: 'Faded Grey',
        colorHex: '#4f5358',
        images: [
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 14, sku: 'B05-GRY-28' },
          { size: '30', stock: 18, sku: 'B05-GRY-30' },
          { size: '32', stock: 16, sku: 'B05-GRY-32' },
          { size: '34', stock: 11, sku: 'B05-GRY-34' }
        ]
      }
    ]
  },

  // --- WIDE-LEG JEANS (5 Items) ---
  {
    id: 'prod-wide-01',
    name: 'Wide-Leg 01',
    slug: 'wide-leg-01-mid-blue',
    category: 'Jeans',
    subcategory: 'Wide-leg',
    description: 'Architectural straight wide-leg silhouette with clean minimal waist construction and fluid drape.',
    priceFormatted: '₹TBD',
    isFeatured: true,
    variants: [
      {
        id: 'var-w1-midblue',
        colorName: 'Mid Blue',
        colorHex: '#466885',
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1542272604-780c36856842?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 10, sku: 'W01-MID-28' },
          { size: '30', stock: 16, sku: 'W01-MID-30' },
          { size: '32', stock: 20, sku: 'W01-MID-32' },
          { size: '34', stock: 14, sku: 'W01-MID-34' }
        ]
      },
      {
        id: 'var-w1-offwhite',
        colorName: 'Off White',
        colorHex: '#e8e6e1',
        images: [
          'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '30', stock: 12, sku: 'W01-WHT-30' },
          { size: '32', stock: 14, sku: 'W01-WHT-32' }
        ]
      }
    ]
  },
  {
    id: 'prod-wide-02',
    name: 'Wide-Leg 02',
    slug: 'wide-leg-02-deep-black',
    category: 'Jeans',
    subcategory: 'Wide-leg',
    description: 'Deep pitch-black wide leg denim featuring minimal tonal stitching and tailored waist fit.',
    priceFormatted: '₹TBD',
    isFeatured: true,
    variants: [
      {
        id: 'var-w2-black',
        colorName: 'Deep Black',
        colorHex: '#181818',
        images: [
          'https://images.unsplash.com/photo-1542272604-780c36856842?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 12, sku: 'W02-BLK-28' },
          { size: '30', stock: 22, sku: 'W02-BLK-30' },
          { size: '32', stock: 19, sku: 'W02-BLK-32' },
          { size: '34', stock: 13, sku: 'W02-BLK-34' }
        ]
      }
    ]
  },
  {
    id: 'prod-wide-03',
    name: 'Wide-Leg 03',
    slug: 'wide-leg-03-tinted-ecru',
    category: 'Jeans',
    subcategory: 'Wide-leg',
    description: 'Modern relaxed wide leg jean in unbleached natural ecru cotton denim with subtle flecks.',
    priceFormatted: '₹TBD',
    isFeatured: false,
    variants: [
      {
        id: 'var-w3-ecru',
        colorName: 'Tinted Ecru',
        colorHex: '#dfd8c8',
        images: [
          'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 9, sku: 'W03-ECR-28' },
          { size: '30', stock: 15, sku: 'W03-ECR-30' },
          { size: '32', stock: 13, sku: 'W03-ECR-32' }
        ]
      }
    ]
  },
  {
    id: 'prod-wide-04',
    name: 'Wide-Leg 04',
    slug: 'wide-leg-04-light-wash',
    category: 'Jeans',
    subcategory: 'Wide-leg',
    description: 'Clean sun-bleached light wash wide leg jean designed for effortless everyday wear.',
    priceFormatted: '₹TBD',
    isFeatured: false,
    variants: [
      {
        id: 'var-w4-light',
        colorName: 'Sun Light Wash',
        colorHex: '#9bb8d3',
        images: [
          'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1542272604-780c36856842?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '30', stock: 14, sku: 'W04-LGT-30' },
          { size: '32', stock: 18, sku: 'W04-LGT-32' },
          { size: '34', stock: 10, sku: 'W04-LGT-34' }
        ]
      }
    ]
  },
  {
    id: 'prod-wide-05',
    name: 'Wide-Leg 05',
    slug: 'wide-leg-05-dark-tint',
    category: 'Jeans',
    subcategory: 'Wide-leg',
    description: 'High-waisted wide leg jean with dark rinse wash and long clean inseam cut.',
    priceFormatted: '₹TBD',
    isFeatured: false,
    variants: [
      {
        id: 'var-w5-dark',
        colorName: 'Dark Rinse',
        colorHex: '#263a56',
        images: [
          'https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1604176354204-9268737828e4?q=80&w=800&auto=format&fit=crop'
        ],
        sizes: [
          { size: '28', stock: 11, sku: 'W05-DRK-28' },
          { size: '30', stock: 17, sku: 'W05-DRK-30' },
          { size: '32', stock: 15, sku: 'W05-DRK-32' },
          { size: '34', stock: 12, sku: 'W05-DRK-34' }
        ]
      }
    ]
  }
];
