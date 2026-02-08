import { createContext, useContext, useMemo, useState } from "react";
import * as storage from "./auth";

type AuthContextValue = {
    loggedIn: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loggedIn, setLoggedIn] = useState(storage.isLoggedIn());

    const value = useMemo<AuthContextValue>(() => {
        return {
            loggedIn,
            login: () => {
                storage.login();
                setLoggedIn(true);
            },
            logout: () => {
                storage.logout();
                setLoggedIn(false);
            },
        };
    }, [loggedIn]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
