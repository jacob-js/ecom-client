import { Button } from 'antd';
import React, { useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, Select, Title } from '../Utils/common'
import logo from '../assets/images/min_logo.png'
import { ArrowRightOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import { signupApi } from '../apis/auth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../Utils/helpers';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { provinces } from '../Utils/data';
import PhoneInput from 'react-phone-number-input';

const schema = yup.object({
    fullname: yup.string().required("Le nom complet est requis"),
    email: yup.string().email("L'email n'est pas valide").required("L'email est requis"),
    password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
                .required("Le mot de passe est requis").matches(/[a-zA-Z]/, "Le mot de passe doit contenir au moins une lettre")
                .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    phone: yup.string().required("Le numéro de téléphone est requis")
                        .matches(/^[+243]/, "Le numéro de téléphone doit commencer avec +243"),
    confirmPassword: yup.string().when('password', {
        is: (password) => password && password.length >= 6 && password.match(/[a-zA-Z]/) && password.match(/[0-9]/),
        then: yup.string().required('Veuillez confirmer le mot de passe').oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
    })
})

function Signup() {
    const [visible, setvisible] = useState(false);
    const [visibleConfirm, setvisibleConfirm] = useState(false);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState([]);
    const history = useHistory();

    const mutation = useMutation(signupApi, {
        onSuccess: (res) =>{
            setloading(false);
            // console.log({ token: res.data.data.token });
            // window.history.pushState({ token: res.data.data.token }, 'fgf', '#/confirm-account');
            // history.push('/confirm-account', {token: "jfhg"});
            history.push({ pathname: '/confirm-account', state: { token: res.data.data.token } });
        },
        onError: (error) =>{
            const res = error.response;
            if(res){
                if(typeof(res.data.message) === 'string'){
                    seterror([res.data.message]);
                }else{
                    seterror(res.data.message);
                }
            }
            setloading(false);
        },
        onMutate: (values) =>{
            setloading(true);
            seterror([]);
        }
    })
    const form = useFormik({
        initialValues: { fullname: '', password: '', email: '', phone: '', confirmPassword: '' },
        onSubmit: values =>  mutation.mutate(values),
        validationSchema: schema
    });

    return (
        <div className='auth-page'>
            <div data-aos='fade-left' className="card confirm-account">
                
                <FormContainer onSubmit={form.handleSubmit}>
                    <Title className='title'>Inscription</Title>
                    {
                        typeof(error[0]) === 'string' ?
                        <Alert severity='error' className='alert' > {error[0]} </Alert>:null
                    }
                    <div className="fields">
                        <FieldContainer>
                            <Input type="text" placeholder="Nom complet" className={
                                form.errors.fullname && form.touched.fullname || getFieldError(error, 'fullname') ? 'error' : ''
                            } onChange={form.handleChange('fullname')} />
                            {form.errors.fullname && form.touched.fullname ? <FieldError>{form.errors.fullname}</FieldError> : 
                            getFieldError(error, 'fullname') ? <FieldError>{getFieldError(error, 'fullname')}</FieldError> : null}
                        </FieldContainer>
                        <FieldContainer>
                            <PhoneInput
                                placeholder="N° de téléphone"
                                value={form.values.phone}
                                onChange={value => form.setFieldValue('phone', value)}
                                className={
                                    `phone-field ${form.errors.phone && form.touched.phone || getFieldError(error, 'phone') ? 'error' : ''}`
                                }
                                defaultCountry="CD"
                            />
                            {form.errors.phone && form.touched.phone ? <FieldError>{form.errors.phone}</FieldError> : 
                            getFieldError(error, 'phone') ? <FieldError>{getFieldError(error, 'phone')}</FieldError> : null}
                        </FieldContainer>
                        <FieldContainer>
                            <Input type="text" placeholder="Email" className={
                                form.errors.email && form.touched.email || getFieldError(error, 'email') ? 'error' : ''
                            } onChange={form.handleChange('email')} />
                            {form.errors.email && form.touched.email ? <FieldError>{form.errors.email}</FieldError> : 
                            getFieldError(error, 'email') ? <FieldError>{getFieldError(error, 'email')}</FieldError> : null}
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
                        <FieldContainer>
                            <div className="input-pass">
                                <Input type={visibleConfirm ? 'text': 'password'} placeholder="Valider le mot de passe" className={
                                    form.errors.confirmPassword && form.touched.confirmPassword || getFieldError(error, 'confirmPassword') ? 'error' : ''
                                } onChange={form.handleChange('confirmPassword')} />
                                { visibleConfirm ? <EyeOutlined className='eye' onClick={() => setvisibleConfirm(false)} /> :
                                    <EyeInvisibleOutlined className='eye' onClick={() => setvisibleConfirm(true)} />
                                }
                            </div>
                            {form.errors.confirmPassword && form.touched.confirmPassword ? <FieldError>{form.errors.confirmPassword}</FieldError> : 
                            getFieldError(error, 'confirmPassword') ? <FieldError>{getFieldError(error, 'confirmPassword')}</FieldError> : null}
                        </FieldContainer>
                        <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> } block></Button>
                        <div className="register-link">Avez-vous déjà un compte ? <Link onClick={() =>history.push('/login')}>Connectez-vous</Link></div>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}

export default Signup