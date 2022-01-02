import { Button } from 'antd';
import React, { useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, Title } from '../Utils/common'
import logo from '../assets/images/min_logo.png'
import { ArrowRightOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import { loginApi, sendOtpApi } from '../apis/auth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../Utils/helpers';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { usersActionTypes } from '../Redux/actionsTypes/users';
import { sendNotif } from '../Utils/notif';

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
            setloading(false);
            dispatch({
                type: usersActionTypes.LOGIN_SUCCESS,
                payload: res.data.data.user
            })
            history.push('/');
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
    })

    return (
        <div className='auth-page'>
            <div data-aos='fade-down' className="card">
                <div className="intro">
                    {/* <img src={logo} alt="" srcset="" /> */}
                    Bweteta LOGO
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
                        <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> }></Button>
                        <div className="register-link">N'avez-vous pas un compte ? <Link onClick={() =>history.push('/signup')}>Inscrivez-vous</Link></div>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}

export default Login
