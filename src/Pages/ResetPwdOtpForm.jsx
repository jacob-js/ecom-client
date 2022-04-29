import { Button } from 'antd';
import React, { useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, Title } from '../Utils/common'
import { ArrowRightOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import { resetPwdCheckOtpApi } from '../apis/auth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../Utils/helpers';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { sendNotif } from '../Utils/notif';
import axios from 'axios';

const schema = yup.object({
    code: yup.string().required('Ce champ est obligatoire')
})

export default function ResetPwdOtpForm() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState([]);
    const history = useHistory();

    const mutation = useMutation(resetPwdCheckOtpApi, {
        onSuccess: (res) =>{
            setloading(false);
            const data = res.data
            history.push({ pathname: '/reset-pwd', state: data });
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
        initialValues: { username: '' },
        onSubmit: values =>  { mutation.mutate(values)},
        validationSchema: schema
    });

    return (
            <div className='auth-page'>
                <div data-aos='fade-right' className="card confirm-account">
                    <FormContainer onSubmit={form.handleSubmit}>
                        <Title>Entrez le code réçu</Title>
                        <p>Un code de confirmation vous été envoyé par sms, veuillez le confirmer pour continuer</p>
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
                            <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> } block></Button>
                            <div className="register-link">N'avez-vous pas réçu le code ? <Link onClick={() =>history.goBack()}>Renvoyer le code</Link> </div>
                        </div>
                    </FormContainer>
                </div>
            </div>
    )
}
