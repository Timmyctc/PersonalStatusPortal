const KEY = "pp_logged_in";

export function isLoggedIn(): boolean {
    return localStorage.getItem(KEY) === "true";
}

export function login() {
    localStorage.setItem(KEY, "true");
}

export function logout() {
    localStorage.removeItem(KEY);
}
