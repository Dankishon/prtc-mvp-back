import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Portfolio Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'underwriting', title: 'Underwriting (coming soon)', href: "#", icon: 'users', disabled: true },
  { key: 'payouts', title: 'Incident Payouts (coming soon)', href: "#", icon: 'plugs-connected', disabled: true },
] satisfies NavItemConfig[];
