import { Button } from 'antd';
import React, { useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, Title } from '../Utils/common'
import { ArrowRightOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import { resetPwdCheckOtpApi, updatePwdApi } from '../apis/auth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../Utils/helpers';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { sendNotif } from '../Utils/notif';

const schema = yup.object({
    password: yup.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
                .required("Le mot de passe est requis").matches(/[a-zA-Z]/, "Le mot de passe doit contenir au moins une lettre")
                .matches(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    confirmPassword: yup.string().when('password', {
        is: (password) => password && password.length >= 6 && password.match(/[a-zA-Z]/) && password.match(/[0-9]/),
        then: yup.string().required('Veuillez confirmer le mot de passe').oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
    })
})

function UpdatePasswordForm() {
    const [visible, setvisible] = useState(false);
    const [visibleConfirm, setvisibleConfirm] = useState(false);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState([]);
    const history = useHistory();
    const token = history.location.state?.token

    const mutation = useMutation(updatePwdApi, {
        onSuccess: (res) =>{
            setloading(false);
            sendNotif("Votre mot de passe a été modifié avec succès")
            history.push("/login");
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
        initialValues: { password: '', confirmPassword: '' },
        onSubmit: values =>  { mutation.mutate({ token, newPwd: values.password })},
        validationSchema: schema
    });

  return (
    <div className='auth-page'>
        <div data-aos='fade-right' className="card confirm-account">
            <FormContainer onSubmit={form.handleSubmit}>
                <Title>Changez votre mot de passe</Title>
                <p>Votre mot de passe doit contenir :</p>
                <ul>
                    <li>Au minimum 6 caractères</li>
                    <li>Au moins un chiffre</li>
                    <li>Au moins une lettre alphabetique</li>
                </ul>
                <div className="fields">
                    {
                        typeof(error[0]) === 'string' ?
                        <Alert severity='error' className='alert' > {error[0]} </Alert>:null
                    }
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
                    <div className="register-link" style={{ marginTop: 20 }}><Link onClick={() =>history.goBack()}>Annuler</Link> </div>
                </div>
            </FormContainer>
        </div>
    </div>
  )
}

export default UpdatePasswordForm