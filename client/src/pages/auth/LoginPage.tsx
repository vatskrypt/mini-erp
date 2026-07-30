
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Panel } from "@/components/ui";
import Input from "@/components/ui/Input";
import { login } from "@/api/auth";
import { ROLE_HOME } from "@/lib/roleHome";
import { getRole, logout, saveToken } from "@/lib/auth";

const DEMO_USERS = [
  {
    label: "ADMIN",
    email: "admin@erp.com",
    password: "admin123",
  },
  {
    label: "SALES",
    email: "sales@erp.com",
    password: "admin123",
  },
  {
    label: "WAREHOUSE",
    email: "warehouse@erp.com",
    password: "admin123",
  },
  {
    label: "ACCOUNTS",
    email: "accounts@erp.com",
    password: "admin123",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fillCredentials(email: string, password: string) {
    setEmail(email);
    setPassword(password);
    setError("");
  }

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { token } = await login({
        email,
        password,
      });

      saveToken(token);

      const role = getRole();

      if (!role || !ROLE_HOME[role]) {
        logout();
        setError("Invalid user role.");
        return;
      }

      navigate(ROLE_HOME[role], {
        replace: true,
      });
    } catch {
      logout();
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--bg) px-4">
      <Panel className="w-full max-w-md">
        <div className="mb-8 border-b border-(--border) pb-4">
          <h1 className="text-xl font-bold uppercase tracking-wide">
            ERP LOGIN
          </h1>

          <p className="mt-2 text-sm text-(--muted)">
            Authenticate to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            autoFocus
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            showPasswordToggle
            required
          />

          {error && (
            <div className="border border-(--danger) p-3 text-sm uppercase text-(--danger)">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 w-full"
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </Button>

          <div className="mt-6 border-t border-(--border) pt-4">
            <p className="mb-2 text-xs uppercase text-(--muted)">
              Quick Login
            </p>

            <div className="flex flex-wrap gap-3">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.email}
                  type="button"
                  onClick={() =>
                    fillCredentials(user.email, user.password)
                  }
                  className="border-0 bg-transparent p-0 text-(--accent) hover:underline"
                >
                  [{user.label}]
                </button>
              ))}
            </div>
          </div>
        </form>
      </Panel>
    </div>
  );
}
