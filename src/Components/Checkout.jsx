import { Button } from 'antd';
import { Checkbox, Label, Tag } from 'atomize';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Cart from '../Utils/cart.utils';
import { FieldContainer, FieldError, FormContainer, Input, Select, TextArea } from '../Utils/common';
import { citys, provinces } from '../Utils/data';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { sendOrderApi } from '../apis/orders';
import { sendNotif } from '../Utils/notif';
import { getFieldError } from '../Utils/helpers';
import { Alert } from '@mui/material';

const schema = yup.object({
    phone: yup.string().required("Le numéro de téléphone est requis")
                .matches(/^[+243]/, "Le numéro de téléphone doit commencé avec +243")
                .matches(/^[+][0-9]{12}$/, "Le numéro de téléphone est invalide"),
    country: yup.string().required("Le pays est requis"),
    province: yup.string().required("La province est requise"),
    city: yup.string().required("La ville est requise"),
    address: yup.string().required("L'adresse est requise"),
    isGift: yup.boolean(),
    giftMention: yup.string().when('isGift', {
        is: true,
        then: yup.string().required("Le message du cadeau est requis"),
    }),
    receiverName: yup.string().when('isGift', {
        is: true,
        then: yup.string().required("Le nom du destinataire est requis"),
    })
})

function Checkout() {
    const dispatch = useDispatch();
    const [error, seterror] = useState([]);
    const { cartItems: items } = useSelector(({ cart }) => cart);
    const cdfItems = items.filter(item => item.currency === "FC");
    const usdItems = items.filter(item => item.currency === "USD");
    const history = useHistory();
    const form = useFormik({
        initialValues: { phone: '', country: 'Congo DRC', province: '', city: '', address: '', note: history.location.state?.note || '', receiverName: '', isGift: false, giftMention: '' },
        validationSchema: schema,
        onSubmit: () => checkoutMutation.mutate()
    });
    const checkoutMutation = useMutation(() => sendOrderApi({ ...form.values,
        products: items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            specifications: item.details?.length > 0 && item?.details.every(detail => detail?.key && detail?.value) ? item?.details?.map(detail => ({
                key: detail?.key,
                value: detail?.value
            })): [],
        })),
    }), {
        onSuccess: (data) => {
            sendNotif(data.message);
            history.push('/');
            Cart.clearCart(dispatch);
        },
        onError: (error) => {
            const res = error.response;
            seterror(res?.data?.message || 'Une erreur est survenue');
        },
        onMutate: () =>{
            seterror([])
        }
    });

    useEffect(() =>{
        Cart.getCartItems(dispatch);
    }, []);
    console.log(history.location.state);

    return (
        <div className='checkout-component'>
            <div className="left">
                <div className='title'>Adresse de livraison</div>
                <FormContainer>
                    {
                        typeof(error[0]) === 'string' ?
                        <Alert severity='error' className='alert' > {error[0]} </Alert>:null
                    }
                    <FieldContainer>
                        <Input type='tel' value={form.values.phone} name='phone' placeholder="Numéro de téléphone" onChange={form.handleChange('phone')} className={
                                form.errors.phone && form.touched.phone || getFieldError(error, 'phone') ? 'error' : ''
                            } />
                        {form.errors.phone && form.touched.phone ? <FieldError>{form.errors.phone}</FieldError> : 
                            getFieldError(error, 'phone') ? <FieldError>{getFieldError(error, 'phone')}</FieldError> : null}
                    </FieldContainer>
                    <FieldContainer>
                        <Select className={
                                form.errors.province && form.touched.province || getFieldError(error, 'province') ? 'error' : ''
                            }
                            onChange={form.handleChange('province')}
                        >
                            <option value="">Selectionner votre province</option>
                            {
                                provinces.map((country, index) =>(
                                    <option key={index} value={country}>{country}</option>
                                ))
                            }
                        </Select>
                        {form.errors.province && form.touched.province ? <FieldError>{form.errors.province}</FieldError> : 
                            getFieldError(error, 'province') ? <FieldError>{getFieldError(error, 'province')}</FieldError> : null}
                    </FieldContainer>
                    <FieldContainer>
                        <Select className={
                                form.errors.city && form.touched.city || getFieldError(error, 'city') ? 'error' : ''
                            }
                            onChange={form.handleChange('city')}
                        >
                            <option value="">Selectionner votre ville</option>
                            {
                                citys.map((country, index) =>(
                                    <option key={index} value={country}>{country}</option>
                                ))
                            }
                        </Select>
                        {form.errors.city && form.touched.city ? <FieldError>{form.errors.city}</FieldError> : 
                            getFieldError(error, 'city') ? <FieldError>{getFieldError(error, 'city')}</FieldError> : null}
                    </FieldContainer>
                    <FieldContainer>
                        <Input name='address' type='text' placeholder="Adresse (ex: Quartier: Katindo, Avenue: La frontiere, N° 136)" className={
                                form.errors.address && form.touched.address || getFieldError(error, 'address') ? 'error' : ''
                            }
                            onChange={form.handleChange('address')}
                        />
                        {form.errors.address && form.touched.address ? <FieldError>{form.errors.address}</FieldError> : 
                            getFieldError(error, 'address') ? <FieldError>{getFieldError(error, 'address')}</FieldError> : null}
                    </FieldContainer>

                    <FieldContainer className='comment'>
                        <div className="label">Commentaire <Tag bg='warning200' textColor='warning700'>Note</Tag> </div>
                        <TextArea value={form.values.note} onChange={form.handleChange('note')} />
                    </FieldContainer>
                    <FieldContainer className='gift'>
                        <Label>
                            <Checkbox
                                checked={form.values.isGift}
                                onChange={e =>form.setFieldValue('isGift', e.target.checked)}
                                activeColor='#dd4900'
                                inactiveColor='gray700'
                            />
                            C'est un cadeau ?
                        </Label>
                    </FieldContainer>
                    {form.values.isGift && 
                        <>
                        <FieldContainer className='gift-msg'>
                            <div className="label">Mention sur le cadeau</div>
                            <TextArea value={form.values.giftMention} className={
                                    form.errors.giftMention && form.touched.giftMention || getFieldError(error, 'giftMention') ? 'error' : ''
                                } onChange={form.handleChange('giftMention')} placeholder='Ex: fêtes bien ton anniversaire mon fils avec joie et bonheur, de la part de ton père' />
                            {form.errors.giftMention && form.touched.giftMention ? <FieldError>{form.errors.giftMention}</FieldError> :
                                getFieldError(error, 'giftMention') ? <FieldError>{getFieldError(error, 'giftMention')}</FieldError> : null
                            }
                        </FieldContainer>
                        <FieldContainer>
                            <Input type='tel' name='receiverName' placeholder="Nom du destinatire" onChange={form.handleChange('receiverName')} className={
                                    form.errors.receiverName && form.touched.receiverName || getFieldError(error, 'receiverName') ? 'error' : ''
                                } />
                            {form.errors.receiverName && form.touched.receiverName ? <FieldError>{form.errors.receiverName}</FieldError> : 
                                getFieldError(error, 'receiverName') ? <FieldError>{getFieldError(error, 'receiverName')}</FieldError> : null}
                        </FieldContainer>
                        </>
                    }
                </FormContainer>
            </div>

            <div className="right">
                <div className="card">
                    <div className="totals">
                        <div className="sub-total">
                            <div className="title">Sous-total :</div>
                            <div className="price">${usdItems.reduce((acc, item) => acc + (item.price)*parseInt(item.quantity), 0)}, FC{cdfItems.reduce((acc, item) => acc + (item.price)*parseInt(item.quantity), 0)}</div>
                        </div>
                        <div className="shipping">
                            <div className="title">Frais de livraison :</div>
                            <div className="price">-</div>
                        </div>
                        <div className="shipping">
                            <div className="title">Tax :</div>
                            <div className="price">-</div>
                        </div>
                        <div className="reduction">
                            <div className="title">Reduction :</div>
                            <div className="price">${usdItems.reduce((acc, item) => acc + (item.discount || 0)*parseInt(item.quantity), 0)}, FC{cdfItems.reduce((acc, item) => acc + (item.discount || 0)*parseInt(item.quantity), 0)}</div>
                        </div>
                        <div className="total">
                            <div className="title">Total :</div>
                            <div className="price">${usdItems.reduce((acc, item) => acc + (item.price-(item.discount || 0))*parseInt(item.quantity), 0)}, FC{cdfItems.reduce((acc, item) => acc + (item.price-(item.discount || 0))*parseInt(item.quantity), 0)}</div>
                        </div>
                    </div>
                    <FieldContainer>
                        <Input type="text" placeholder="Code prompo" />
                    </FieldContainer>
                    <Button type="primary" className='btn apply-promo'>Appliquer le code promo</Button>
                </div>
                <Button type="primary" className='btn submit' loading={checkoutMutation.isLoading} onClick={form.handleSubmit}>Passer commande</Button>
            </div>
        </div>
    )
}

export default Checkout;