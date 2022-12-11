import axios from '../api/axios';

const useRefreshToken = (setAuthState) => {

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true // sending cookies with request
        });

        setAuthState(prev => {
            // console.log(JSON.stringify(prev));
            // console.log(response.data.accessToken);
            // console.log(response.data)
            return {
                ...prev,
                isLogged: response.data.isLogged,
                accessToken: response.data.accessToken,
                id: response.data.user.id,
                firstname: response.data.user.firstname,
                lastname: response.data.user.lastname,
                email: response.data.user.email,
                roleId: response.data.user.RoleId,
                phone: response.data.user.phone
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
