"use client"

import AppHeader, {AppHeaderProps} from './AppHeader';

type AppLayoutProps = Readonly<{
  children: React.ReactNode;
  headerProps: AppHeaderProps;
}>;

export default function AppLayout({
  children,
  headerProps,
}: AppLayoutProps) {
  return (
    <>
      <AppHeader {...headerProps}/>
      {children}
    </>
  )
}