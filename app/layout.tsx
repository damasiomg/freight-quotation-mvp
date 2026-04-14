import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ReduxProvider } from '@/components/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cotação de Frete - SmartEnvios',
  description: 'Sistema de cotação e contratação de frete online',
  icons: {
    icon: '/assets/favicon.svg',
  },
  openGraph: {
    images: ['/only_logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head></head>
      <body className={inter.className}>
        <AntdRegistry>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
