import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useAuth } from "./contexts/auth";
import { CreateTask } from "./pages/CreateTask";

import { Dashboard } from "./pages/Dashboard";
import { LoginBox } from "./pages/LoginBox";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginBox />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/task/create"
        element={
          <RequireAuth>
            <CreateTask />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
