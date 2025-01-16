import { LucideIcon } from 'lucide-react'

export interface NavLinkProps {
    to: string;
    icon: LucideIcon;
    label: string;
    isActive?: boolean;
    collapsed?: boolean;
    external?: boolean;
};