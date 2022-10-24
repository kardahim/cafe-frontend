import axios from '../api/axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useRefreshToken = () => {
    const context = useContext(AuthContext);

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true // sending cookies with request
        });

        context.setAuthState(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.accessToken);
            // FIXME: respone and asign correct data
            // console.log(response.data)
            return {
                ...prev,
                email: response.data.email,
                RoleId: response.data.RoleId,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
