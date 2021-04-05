import React, {useState, useEffect} from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Button, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../../store/actions/users_actions'

const Auth = (props) => {
    const [register, setRegister] = useState(false);
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications)

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Sorry the email is required')
                .email('this is not valid email'),
            password: Yup.string()
                .required('Sorry the password is required')

        }),
        onSubmit: (values, {resetForm}) => {
            handleSubmit(values)
        }
    });

    const handleSubmit = (values) => {
        if (register) {
            dispatch(registerUser(values))
        } else {

        }
    };

    useEffect(()=> {
        if(notifications && notifications.success){
            props.history.push('/dashboard')
        }
    }, [notifications, props.history])


    return (
        <>
            <div className='auth_container'>
                <h1>Authenticate</h1>
                <form action="" className='mt-3' onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                        <TextField style={{width: '100%'}}
                                   name='email'
                                   label='Enter your email'
                                   variant='outlined'
                                   {...formik.getFieldProps('email')}
                                   error={formik.errors.email && formik.touched.email ? true : false}
                                   helperText={formik.errors.email}>
                        </TextField>
                    </div>
                    <div className='form-group'>
                        <TextField style={{width: '100%'}}
                                   name='password'
                                   label='Enter your password'
                                   variant='outlined'
                                   type='password'
                                   {...formik.getFieldProps('password')}
                                   error={formik.errors.password && formik.touched.password ? true : false}
                                   helperText={formik.errors.password}>
                        </TextField>
                    </div>
                    <Button variant='contained' color='primary' type='submit' size='large'>
                        {register ? 'Register' : 'Login'}
                    </Button>
                    <Button
                        variant='outlined'
                        color='secondary'
                        size='large'
                        onClick={() => setRegister(!register)}>
                        Want to {!register ? 'Register' : 'Login'}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default Auth;

