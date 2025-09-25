import {ReactElement, ReactNode} from 'react';

export interface MenuItemType {
  label: string;
  icon: ReactElement;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export interface OverflowMenuProps {
  trigger: ReactNode;
  menuItems: MenuItemType[];
}
