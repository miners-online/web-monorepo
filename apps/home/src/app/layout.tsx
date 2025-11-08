import type { Metadata } from "next";
import { type PropsWithChildren } from 'react';
import '@primer/primitives/dist/css/functional/themes/light.css'
import '@primer/react-brand/lib/css/main.css'
import Theme from "@/components/Theme";

const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'Example Site'

export const metadata: Metadata = {
  title: {
    absolute: '',
    template: `%s - ${siteTitle}`,
  },
  icons: {
    icon: '/favicon-256x256.png',
  }
}

export default async function RootLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <html
      lang="en"
      dir="ltr"
    >
      <body>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  );
}
