"use client"

import Image from 'next/image';
import { ThemeProvider as BrandThemeProvider } from '@primer/react-brand'
import { BaseStyles, ThemeProvider, Header } from '@primer/react'
import { type PropsWithChildren } from 'react';

export default function Theme({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <ThemeProvider colorMode="light">
      <BrandThemeProvider colorMode="light">
        <BaseStyles>
          <AppHeader />
          {children}
        </BaseStyles>
      </BrandThemeProvider>
    </ThemeProvider>
  )
}

function AppHeader() {
  return (
    <Header>
      <Header.Item>
        <Header.Link href="/">
          <Image
            src="/favicon-256x256.png"
            alt="Miners Online Logo"
            width={32}
            height={32}
          />
          <span>Miners Online</span>
        </Header.Link>
      </Header.Item>
      <Header.Item>
        <Header.Link href="/blog">
          Blog
        </Header.Link>
      </Header.Item>
      <Header.Item full>
        <Header.Link href="/docs">
          Documentation
        </Header.Link>
      </Header.Item>
    </Header>
  )
}