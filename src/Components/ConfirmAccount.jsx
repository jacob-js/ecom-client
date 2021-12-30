import { Button } from 'antd';
import React, { useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, Title } from '../Utils/common'
import { ArrowRightOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import { verifyAccountApi } from '../apis/auth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../Utils/helpers';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendNotif } from '../Utils/notif';

const schema = yup.object({
    code: yup.string().required('Ce champ est obligatoire')
})

function ConfirmAccount() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState([]);
    const navigate = useNavigate();

    const mutation = useMutation(verifyAccountApi, {
        onSuccess: (res) =>{
            setloading(false);
            sendNotif(res.data.message);
            navigate('/login');
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
        initialValues: { username: localStorage.getItem('user_phone'), code: '' },
        onSubmit: values =>  mutation.mutate(values),
        validationSchema: schema
    });

    return (
        <div className='auth-page'>
            <div data-aos='fade-right' className="card confirm-account">
                <FormContainer onSubmit={form.handleSubmit}>
                    <Title>Confirmer mon compte</Title>
                    <p>Un code de confirmation vous été envoyé par sms et par email, veuillez le confirmer pour continuer</p>
                    <div className="fields">
                        {
                            typeof(error[0]) === 'string' ?
                            <Alert severity='error' className='alert' > {error[0]} </Alert>:null
                        }
                        <FieldContainer>
                            <Input type="text" placeholder="Entrer le code de confirmation" className={
                                form.errors.code && form.touched.code || getFieldError(error, 'code') ? 'error' : ''
                            } onChange={form.handleChange('code')} />
                            {form.errors.code && form.touched.code ? <FieldError>{form.errors.code}</FieldError> : 
                            getFieldError(error, 'username') ? <FieldError>{getFieldError(error, 'username')}</FieldError> : null}
                        </FieldContainer>
                        <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> }></Button>
                        <div className="register-link">N'avez-vous pas réçu le code ? <Link onClick={() =>navigate('/signup')}>Renvoyer le code</Link></div>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}

export default ConfirmAccount
