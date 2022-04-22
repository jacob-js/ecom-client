import { Button } from 'antd';
import React, { useState } from 'react'
import { FieldContainer, FieldError, FormContainer, Input, Link, Title } from '../Utils/common'
import { ArrowRightOutlined } from '@ant-design/icons/lib/icons';
import { useMutation } from 'react-query';
import { sendOtpApi, verifyAccountApi } from '../apis/auth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { getFieldError } from '../Utils/helpers';
import { Alert } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { sendNotif } from '../Utils/notif';
import axios from 'axios';
import { usersActionTypes } from '../Redux/actionsTypes/users';
import { useDispatch } from 'react-redux';

const schema = yup.object({
    code: yup.string().required('Ce champ est obligatoire')
})

function ConfirmAccount() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    const mutation = useMutation(verifyAccountApi, {
        onSuccess: (res) =>{
            setloading(false);
            const data = res.data
            sendNotif(res.data.message);
            localStorage.setItem('bweteta_token', data.data.token);
            axios.defaults.headers.common['bweteta_token'] = data.data.token;
            dispatch({
                type: usersActionTypes.LOGIN_SUCCESS,
                payload: data.data.user
            })
            history.push('/');
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

    const sendOtpMutation = useMutation(() =>sendOtpApi(localStorage.getItem('user_phone')), {
        onSuccess: (res) => {
            sendNotif('Code envoyé avec succès', 'success');
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

    const form = useFormik({
        initialValues: { token: history.location.state?.token, code: '' },
        onSubmit: values =>  { console.log(window.history.state); mutation.mutate(values)},
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
                        <Button loading={loading} className='btn login' htmlType='submit' icon={ <ArrowRightOutlined /> } block></Button>
                        <div className="register-link">N'avez-vous pas réçu le code ? { sendOtpMutation.isLoading ? 'Chargement ...': <Link onClick={() =>sendOtpMutation.mutate()}>Renvoyer le code</Link> }</div>
                    </div>
                </FormContainer>
            </div>
        </div>
    )
}

export default ConfirmAccount
