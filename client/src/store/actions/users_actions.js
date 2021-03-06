import axios from 'axios';
import * as users from "./index";


axios.defaults.headers.post['Content-Type'] = 'application/json';

export const registerUser = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post('/api/users/register', {
                email: values.email,
                password: values.password
            });
            dispatch(users.authUser({data: user.data, auth: true}));
            dispatch(users.successGlobal('Welcome! Check your email and validate your account'));

        } catch (error) {
            console.log(error.response.data.message);
            dispatch(users.errorGlobal('Error for Register User'));
        }
    }
};
