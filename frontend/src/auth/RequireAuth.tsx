import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }: { children: JSX.Element }) {
    const { loggedIn } = useAuth();

    if (!loggedIn) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
}
