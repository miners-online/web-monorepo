import './global.css';
import { getLogtoContext, signIn, signOut } from '@logto/next/server-actions';
import { AuthProvider} from "@repo/auth-client/hooks/use-auth-context";
import { getAuthClientConfig } from '@repo/auth-client/server';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export default async function Layout({ children }: LayoutProps<'/'>) {
  const config = getAuthClientConfig();
  const state = await getLogtoContext(config);
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <AuthProvider
          signOut={async () => {
            'use server';
            await signOut(config);
          }}
          signIn={async () => {
            'use server';
            await signIn(config);
          }}
          state={state}
        >
          <RootProvider>{children}</RootProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
