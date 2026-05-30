export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface ActivityDay {
  date: string;
  count: number;
}
