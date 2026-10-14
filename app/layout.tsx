import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JFS Trading | Poultry Feed Import & Ethiopian Coffee Export',
  description: 'JFS Trading empowers Ethiopian small-scale poultry farmers with Primix feed and exports premium Ethiopian coffee.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0c1511',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
