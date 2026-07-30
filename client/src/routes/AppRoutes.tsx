import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "@/pages/auth/LoginPage";

import CustomersPage from "@/pages/customers/CustomersPage";
import ChallanListPage from "@/pages/challans/ChallanListPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";


import ProtectedRoute from "./ProtectedRoute";
import Layout from "@/layouts/Layout";
import CreateCustomerPage from "@/pages/customers/CreateCustomerPage";
import EditCustomerPage from "@/pages/customers/EditCustomerPage";
import CreateProductPage from "@/pages/products/CreateProductPage";
import ProductsPage from "@/pages/products/ProductsPage";
import EditProductPage from "@/pages/products/EditProductPage";
import CreateChallanPage from "@/pages/challans/CreateChallanPage";

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
            element={<CustomersPage />}
          />

          <Route
            path="/products"
            element={<ProductsPage />}
          />
          <Route
              path="/products/new"
              element={<CreateProductPage />}
          />

          <Route
              path="/products/:id/edit"
              element={<EditProductPage />}
          />

          <Route
            path="/challans"
            element={<ChallanListPage />}
          />
          <Route
              path="/challans/new"
              element={<CreateChallanPage />}
          />
          <Route
            path="/customers/new"
            element={<CreateCustomerPage />}
          />
          <Route
            path="/customers/:id/edit"
            element={<EditCustomerPage />}
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
