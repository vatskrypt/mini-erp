import { Navigate, Outlet } from "react-router-dom";

import { getToken, isTokenExpired } from "@/lib/auth";

export default function ProtectedRoute() {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}
