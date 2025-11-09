import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
  Theme
} from '@carbon/react';

import { Switcher, Notification, UserAvatar } from '@carbon/icons-react';


export interface AppHeaderProps {
  parentSiteName?: string;
  productName: string;
  productLink: string;
  navItems: { text: string; href: string }[];
}

export default function AppHeader(props: AppHeaderProps) {
  const { parentSiteName, productName, productLink, navItems } = {
    ...props,
  };

  return (
    <Theme theme="g100">
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <Header aria-label="Navigation Container">
            <SkipToContent />
            <HeaderMenuButton
              aria-label="Open menu"
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
            />
            {!parentSiteName && (
              <HeaderName href={productLink} prefix="">
                {productName}
              </HeaderName>
            )}
            {parentSiteName && (
              <HeaderName href={productLink} prefix={parentSiteName}>
                {productName}
              </HeaderName>
            )}
            <HeaderNavigation aria-label="Main Navigation">
              {navItems.map((item) => (
                <HeaderMenuItem key={item.href} href={item.href}>
                  {item.text}
                </HeaderMenuItem>
              ))}
            </HeaderNavigation>
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              isPersistent={false}>
              <SideNavItems>
                <HeaderSideNavItems>
                  {navItems.map((item) => (
                    <HeaderMenuItem key={item.href} href={item.href}>
                      {item.text}
                    </HeaderMenuItem>
                  ))}
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label="Notifications"
                tooltipAlignment="center"
                className="action-icons">
                <Notification size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="User Avatar"
                tooltipAlignment="center"
                className="action-icons">
                <UserAvatar size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
                <Switcher size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
        )}
      />
    </Theme>
  )
}
