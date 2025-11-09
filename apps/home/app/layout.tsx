import type { Metadata } from "next";

import '@carbon-labs/mdx-components/scss/index.scss'
import '@carbon/ibmdotcom-styles';
import '@carbon/ibm-products/css/index.min.css';
import '@repo/ui/index.scss';
import "./globals.scss";

import { AppHeaderProps } from "@repo/ui/components/AppHeader";
import AppLayout from "@repo/ui/components/AppLayout";

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Miners Online';

export const metadata: Metadata = {
  title: {
    absolute: '',
    template: `%s - ${siteTitle}`,
  },
  icons: {
    icon: '/favicon-256x256.png',
  }
}

const headerProps: AppHeaderProps = {
  productName: 'Miners Online',
  productLink: '/',
  navItems: [
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'Documentation',
      href: '/docs',
    },
    {
      text: 'Live Status',
      href: '/status',
    }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppLayout headerProps={headerProps}>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
