import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";

import CustomerListPage from "@/pages/customers/CustomerListPage";
import ProductListPage from "@/pages/products/ProductListPage";
import ChallanListPage from "@/pages/challans/ChallanListPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/layouts/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/customers"
            element={<CustomerListPage />}
          />

          <Route
            path="/products"
            element={<ProductListPage />}
          />

          <Route
            path="/challans"
            element={<ChallanListPage />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}
