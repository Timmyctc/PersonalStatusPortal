import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AppLayout() {
    const navigate = useNavigate();
    const { loggedIn, logout } = useAuth();

    return (
        <div style={{ padding: 24 }}>
            <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <strong>Personal Portal</strong>
                <nav style={{ display: "flex", gap: 12 }}>
                    <Link to="/">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/ci">CI</Link>
                    <Link to="/login">Login</Link>
                    {loggedIn ? (<button onClick={() => {
                                logout();
                                navigate("/", { replace: true });
                            }}>
                            Logout
                        </button>) : null}
                </nav>
            </header>

            <hr style={{ margin: "16px 0" }} />

            <Outlet />
        </div>
    );
}
