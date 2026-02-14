export interface NavLink {
  type: 'link';
  title: string;
  href: string;
}

export interface NavFolder {
  type: 'folder';
  title: string;
  children: (NavLink | NavFolder)[];
}

export type NavItem = NavLink | NavFolder;
