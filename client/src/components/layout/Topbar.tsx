import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui";
import { getRole, getUser, logout } from "@/lib/auth";

export default function Topbar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-(--border) px-6">
      <div>
        <p className="text-xs uppercase text-(--muted)">
          Logged in
        </p>

        <p className="mt-1 uppercase">
          {getUser()}
          {" · "}
          <span className="text-(--accent)">
            {getRole()}
          </span>
        </p>
      </div>

      <Button onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
