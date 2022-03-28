import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router";

export function useAuth() {
    return useContext(AuthContext);
}

const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 100); // fake async
    },
    signout(callback) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 100);
    },
};

export let AuthContext = createContext(null);

export function AuthProvider({ children }) {
    let [username, setUsername] = useState(null);
    let [password, setPassword] = useState(null);
    let navigate = useNavigate()

    useEffect(() => {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const verifyLogin = username === 'admin' && password === 'admin'

        setUsername(username)
        setPassword(password)

        if (verifyLogin) {
            navigate('/dashboard', { replace: true });
        }

    }, [])

    let signin = (callback, errorCallback) => {
        console.log('calling sign in')
        return fakeAuthProvider.signin(() => {
            const verifyLogin = username === 'admin' && password === 'admin'
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            if (verifyLogin) {
                callback();
            } else {
                errorCallback()
            }
        });
    };

    let signout = (callback) => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        setUsername("")
        setPassword("")

        return fakeAuthProvider.signout(() => {
            setUsername(null);
            callback();
        });
    };

    let value = { username, password, setPassword, setUsername, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    const verifyLogin = auth.username === 'admin' && auth.password === 'admin'

    console.log('auth is ', auth)

    if (!verifyLogin) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
