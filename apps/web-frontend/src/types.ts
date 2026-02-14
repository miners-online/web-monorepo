export interface NavLink {
  title: string;
  href?: string;
  children?: NavLink[];
}

export interface NavFolder {
  title: string;
  children: (NavLink | NavFolder)[];
}