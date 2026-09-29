import { NavLink } from "react-router-dom";

import { NAV_ITEMS } from "@/lib/navigation";
import { getRole } from "@/lib/auth";

export default function Sidebar() {
  const role = getRole();

  const items = NAV_ITEMS.filter((item) =>
    role ? item.roles.includes(role) : false
  );

  return (
    <aside className="flex w-full flex-col border-b border-(--border) bg-(--bg) md:h-screen md:w-56 md:border-b-0 md:border-r">
      <div className="border-b border-(--border) p-4">
        <h1 className="text-lg font-bold uppercase tracking-wide">
          MINI ERP
        </h1>

        <p className="mt-1 text-xs text-(--muted)">
          INTERNAL SYSTEM
        </p>
      </div>

      <nav className="flex flex-1 flex-row flex-wrap gap-x-4 px-4 py-2 md:flex-col md:gap-x-0 md:p-4">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              [
                "border-b border-(--border) py-2 uppercase transition-colors",
                isActive
                  ? "text-(--accent)"
                  : "text-(--text) hover:text-(--accent)",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <span>{isActive ? "> " : "  "}{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-(--border) p-4">
        <p className="text-xs uppercase text-(--muted)">
          ROLE
        </p>

        <p className="mt-1 uppercase">
          {role ?? "UNKNOWN"}
        </p>
      </div>
    </aside>
  );
}
