import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function Layout() {
  return (
    <div className="grid h-screen grid-cols-[224px_1fr] bg-[var(--bg)] text-[var(--text)]">
      <Sidebar />

      <div className="flex min-h-0 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
