import { createBrowserRouter } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./UnprotectedRoute";
import LoadingScreen from "../utils/LoadingScreen/LoadingScreen";

// Lazy-loaded components
const Login = lazy(() => import("../Pages/AuthPage/Login"));
const Register = lazy(() => import("../Pages/AuthPage/Register"));
const Home = lazy(() => import("../Pages/Home/homes"));

const withSuspense = (element) => (
  <Suspense fallback={<LoadingScreen />}>{element}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: withSuspense(<Home />),
          },
        ],
      },
      {
        path: "create-user",
        element: <ProtectedRoute requireAdmin={true} />,
        children: [
          {
            index: true,
            element: withSuspense(<Register />),
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "login",
            element: withSuspense(<Login />),
          },
        ],
      },
    ],
  },
]);

export default router;
