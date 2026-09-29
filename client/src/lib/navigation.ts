export interface NavItem {
  label: string;
  path: string;
  roles: string[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["ADMIN", "SALES", "ACCOUNTS", "WAREHOUSE"]
  },
  {
    label: "Customers",
    path: "/customers",
    roles: ["ADMIN", "SALES"],
  },
  {
    label: "Products",
    path: "/products",
    roles: ["ADMIN", "SALES", "WAREHOUSE"],
  },
  {
    label: "Challans",
    path: "/challans",
    roles: ["ADMIN"],
  },
];
