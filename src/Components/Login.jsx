import { Button, Divider } from 'antd';
import React, { useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, Title } from '../Utils/common'
import logo from '../assets/images/min_logo.png'
import { ArrowRightOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import { googleLoginApi, loginApi, sendOtpApi } from '../apis/auth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../Utils/helpers';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { usersActionTypes } from '../Redux/actionsTypes/users';
import { sendNotif } from '../Utils/notif';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import ReactFacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebookF } from 'react-icons/fa';

const schema = yup.object({
    username: yup.string().required('Ce champ est obligatoire'),
    password: yup.string().required('Ce champ est obligatoire')
})

function Login() {
    const [visible, setvisible] = useState(false);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    const form = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: values =>  mutation.mutate(values),
        validationSchema: schema
    });

    const sendOtpMutation = useMutation(() =>sendOtpApi(form.values.username), {
        onSuccess: (res) => {
            sendNotif('Veuillez vérifier votre compte pour continuer', 'warn');
            localStorage.setItem('user_phone', form.values.username);
            history.push('/confirm-account');
        },
        onError: (error) => {
            const res = error.response;
            if (res) {
                seterror(res.data.message);
            } else {
                sendOtpMutation.mutate();
            }
        }
    })

    const mutation = useMutation(loginApi, {
        onSuccess: (res) =>{
            localStorage.setItem('bweteta_token', res.data.data.token);
            axios.defaults.headers.common['bweteta_token'] = res.data.data.token;
            setloading(false);
            dispatch({
                type: usersActionTypes.LOGIN_SUCCESS,
                payload: res.data.data.user
            })
            history.push(history.location.state?.from || '/');
        },
        onError: (error) =>{
            const res = error.response;
            if(res){
                if(res.data.data?.isVerified === false){
                    sendOtpMutation.mutate();
                }else if(typeof(res.data.message) === 'string'){
                    seterror([res.data.message]);
                }else{
                    seterror(res.data.message);
                }
            
            }else{
                seterror(['Une erreur est survenue']);
            }
            setloading(false);
        },
        onMutate: (values) =>{
            setloading(true);
            seterror([]);
        }
    });

    const { mutate, isLoading: gLoading } = useMutation(googleLoginApi, {
        onSuccess: (data) =>{
            localStorage.setItem('bweteta_token', data.data.token);
            axios.defaults.headers.common['bweteta_token'] = data.data.token;
            setloading(false);
            dispatch({
                type: usersActionTypes.LOGIN_SUCCESS,
                payload: data.data.user
            })
            history.push(history.location.state?.from || '/');
        }
    })

    return (
        <div className='auth-page'>
            <div data-aos='fade-down' className="card">
                <div className="intro">
                    <img src={logo} alt="" srcset="" className='mob-logo' />
                    <span className='desk-logo'>Bweteta LOGO</span>
                </div>
                <FormContainer onSubmit={form.handleSubmit}>
                    <Title>Connexion</Title>
                    <div className="fields">
                        {
                            typeof(error[0]) === 'string' ?
                            <Alert severity='error' className='alert' > {error[0]} </Alert>:null
                        }
                        <FieldContainer>
                            <Input type="text" placeholder="Email ou n° de téléphone" className={
                                form.errors.username && form.touched.username || getFieldError(error, 'username') ? 'error' : ''
                            } onChange={form.handleChange('username')} />
                            {form.errors.username && form.touched.username ? <FieldError>{form.errors.username}</FieldError> : 
                            getFieldError(error, 'username') ? <FieldError>{getFieldError(error, 'username')}</FieldError> : null}
                        </FieldContainer>
                        <FieldContainer>
                            <div className="input-pass">
                                <Input type={visible ? 'text': 'password'} placeholder="Mot de passe" className={
                                    form.errors.password && form.touched.password || getFieldError(error, 'password') ? 'error' : ''
                                } onChange={form.handleChange('password')} />
                                { visible ? <EyeOutlined className='eye' onClick={() => setvisible(false)} /> :
                                    <EyeInvisibleOutlined className='eye' onClick={() => setvisible(true)} />
                                }
                            </div>
                            {form.errors.password && form.touched.password ? <FieldError>{form.errors.password}</FieldError> : 
                            getFieldError(error, 'password') ? <FieldError>{getFieldError(error, 'password')}</FieldError> : null}
                        </FieldContainer>
                        <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> } block></Button>
                        <div className="register-link">N'avez-vous pas un compte ? <Link onClick={() =>history.push('/signup')}>Inscrivez-vous</Link></div>
                    </div>
                </FormContainer>
            </div>
            <div className="socials-auth">
                <Divider>Ou</Divider>
                <div className="socials">
                    <GoogleLogin
                        clientId={process.env.REACT_APP_G_CLIENT_ID}
                        onSuccess={(res) => mutate({ googleToken: res.tokenId })}
                        render={renderProps => (
                            <Button className='btn google' loading={gLoading} onClick={renderProps.onClick} disabled={renderProps.disabled} icon={<FcGoogle size={20} style={{ marginRight: 5 }} />}>Connexion avec google</Button>
                        )}
                    />
                    <ReactFacebookLogin
                        appId={process.env.REACT_APP_FB_APP_ID}
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={(res) => {} }
                        render={renderProps => (
                            <Button type='primary' className='btn facebook' onClick={renderProps.onClick} disabled={renderProps.isDisabled} loading={renderProps.isProcessing} icon={<FaFacebookF style={{ marginRight: 5 }}/> } > Connexion avec facebook </Button>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
