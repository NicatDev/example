import { Navigate, Outlet } from "react-router-dom";
import Wrapper from "@/layout/wrapper/index";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/context/AuthContext";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {" "}
      <Outlet />
    </Wrapper>
  ) 
  !user (
    <Navigate to="/login" replace />
  );
}
