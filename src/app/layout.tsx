import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';

export const metadata: Metadata = {
  title: 'Clothing Brand E-Commerce | Modern Gen-Z Bottoms',
  description: 'Specializing in heavy-denim baggy jeans and wide-leg jeans for modern streetwear fashion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
