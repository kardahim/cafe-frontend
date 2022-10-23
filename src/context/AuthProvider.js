import { useState } from "react";

import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({});

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;