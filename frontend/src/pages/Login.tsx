import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from ?? "/dashboard";

    return (
        <div>
            <h2>Login</h2>
            <button
                onClick={() => {
                    login();
                    navigate(from, { replace: true });
                }}
            >
                Log in (fake)
            </button>
        </div>
    );
}
