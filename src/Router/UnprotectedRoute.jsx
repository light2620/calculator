
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
 const { isAuthenticated, loading } = useSelector((state) => state.user);

if (loading) return <div>Loading...</div>; // prevent early redirect

if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PublicRoute
