import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function Layout() {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-(--bg) text-(--text) md:h-screen md:grid-cols-[224px_1fr]">
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
