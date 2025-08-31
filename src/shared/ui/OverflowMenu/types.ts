import {ReactElement, ReactNode} from 'react';

export interface MenuItemType {
  label: string;
  icon: ReactElement;
  onClick: () => void;
}

export interface OverflowMenuProps {
  trigger: ReactNode;
  menuItems: MenuItemType[];
}
