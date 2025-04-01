import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
    submenus?: Array<{
      href: string;
      label: string;
    }>
  extras?: ReactNode;
  }>;
  extras?: ReactNode;
}