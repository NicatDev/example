import { createContext, use, useContext, useEffect, useState } from "react";
import API from '@/api'
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userModules, setUserModules] = useState(null);

    
    const getInitialData = async () => {
        const storedToken = localStorage.getItem("accessToken");
        const moduleUuid = localStorage.getItem("module_uuid");
        if (storedToken) {
            setToken(storedToken);
            try {
                const info = JSON.parse(atob(storedToken.split('.')[1])); 
                // Decode JWT
                const response = await API.Modules.getSingleModule(moduleUuid);
                setUserModules(response.data);
                setUser(info);
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUser(null);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        getInitialData();
    }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, logout, loading, userModules }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
