import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { BookIcon, GitBranch } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@repo/ui/components/button';
import Link from 'next/link';

import { UserAccountDropdown } from '@repo/auth-client/ui/user-account-dropdown';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  const homePage = process.env.NEXT_PUBLIC_HOME_URL || 'https://www.minersonline.uk';

  return {
    nav: {
      title: (
        <>
          <Image
            src="/favicon-256x256.png"
            alt="Miners Online"
            width={24}
            height={24}
            className="inline mr-2 rounded"
          />
          Miners Online
        </>
      ),
    },
    githubUrl: 'https://github.com/miners-online',
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [
      {
        icon: <BookIcon />,
        text: 'Documentation',
        url: '/docs',
        secondary: false,
      },
      {
        icon: <BookIcon />,
        text: 'Blog',
        url: '/blog',
        secondary: false,
      },
      {
        type: 'custom',
        children: <UserAccountDropdown/>,
        secondary: true,
      },
    ],
  };
}
