import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from '../../_helpers/history';
import { authActions } from "../../_store/auth.slice";
import { shallowEqual } from "react-redux";

export const Login = () => {
    const dispatch = useDispatch<any>();
    const authUser = useSelector(
        (state: any) => state.auth.user,
        shallowEqual
    );
    const authError = useSelector(
        (state: any) => state.auth.error,
        shallowEqual
    );
    
    const { navigate } = useHistory(); // Get navigate from custom hook
    
    useEffect(() => {
        // Redirect to home if already logged in
        if (authUser) {
            navigate('/');
        }
    }, [authUser, navigate]);

    // Form validation rules
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    // Get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const onSubmit = ({ username, password }: { username: string; password: string }) => {

        
        // Transform the input into UserLogin type
        const userLogin: UserLogin = {
            username,
            password
        };
    
        // Dispatch the login action
        return dispatch(authActions.login(userLogin));
    };

    return (
        <div className="PageLogin">
            <div className="card">
                <h4 className="card-header">Login</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                            {...register('username')}
                             name="username" 
                             type="text" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                             {...register('password')}
                             name="password" 
                             type="password"
                            />
                        </div>
                        <button disabled={isSubmitting} className="btn btn-primary">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Login
                        </button>
                        {authError &&
                            <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};
