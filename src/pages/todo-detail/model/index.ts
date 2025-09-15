import {ReactNode} from 'react';

export interface DetailSectionProps {
  title: string;
  children: ReactNode;
}

export interface DetailActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}
