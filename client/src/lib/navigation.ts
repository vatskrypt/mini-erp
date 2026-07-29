export interface NavItem {
  label: string;
  path: string;
  roles: string[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["ADMIN", "STAFF","ACCOUNTS","WAREHOUSE"]
  },
  {
    label: "Customers",
    path: "/customers",
    roles: ["ADMIN", "STAFF"],
  },
  {
    label: "Products",
    path: "/products",
    roles: ["ADMIN", "STAFF", "WAREHOUSE"],
  },
  {
    label: "Challans",
    path: "/challans",
    roles: ["ADMIN", "STAFF", "ACCOUNTS"],
  },
];
