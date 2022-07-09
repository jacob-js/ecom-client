import React, { useRef, useState } from 'react'
import { Icon, Modal, Text } from 'atomize';
import { FieldContainer, FieldError, FormContainer, Input } from '../../../../Utils/common';
import { CameraOutlined, EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';

const fields = [
    {
        name: 'userName',
        notAuth: true,
        placeholder: 'Votre nom'
    },
    {
        name: 'phone',
        notAuth: true,
        type: 'tel',
        placeholder: 'Votre numéro de téléphone'
    },
    {
        name: 'productName',
        placeholder: 'Nom du produit'
    },
    {
        name: 'description',
        placeholder: 'Description du produit'
    }
]

export default function SuggestProduct({isOpen, onClose}) {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const ref = useRef();
    const { data, auth } = useSelector(({ users: { currUser } }) =>currUser);

    const valSchema = yup.object({
        userName: !auth ? yup.string().required('Votre nom est obligatoire'): yup.string(),
        phone: !auth ? yup.string().required('Votre numéro de téléphone est obligatoire'): yup.string(),
        productName: yup.string().required('Le nom du produit est obligatoire'),
        description: yup.string().required('Veuillez mettre une description du produit')
    });

    const formik = useFormik({
        initialValues: { userName: data?.fullname, phone: data?.phone, productName: '', description: '' },
        validationSchema: valSchema,
        onSubmit: values => onClose()
    });

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        setFile(file);
        setPreview(URL.createObjectURL(file));
        console.log('url', URL.createObjectURL(file))
    }

  return (
    <Modal rounded='md' isOpen={isOpen} onClose={onClose} align='center' className='suggest-modal'>
        <Icon
            name="Cross"
            pos="absolute"
            top="1rem"
            right="1rem"
            size="16px"
            onClick={onClose}
            cursor="pointer"
        />

        <Text textColor="medium" textSize="subheader" textWeight="500"
            p={{ l: "0.5rem", t: "0.25rem" }}
            m={{ b: "2rem" }}
        >
            Suggerer un produit manqué
        </Text>

        <FormContainer style={{ padding: 0 }} onSubmit={formik.handleSubmit}>
            {
                fields.map((field, index) => (
                    field.notAuth && auth ? null :
                    <FieldContainer key={index}>
                        <Input type={field.type} placeholder={field.placeholder}
                            value={formik.values[field.name]} onChange={formik.handleChange(field.name)}
                            className={formik.errors[field.name] ? 'error' : ''}
                        />
                        {
                            formik.errors[field.name] && formik.touched[field.name] && 
                            <FieldError>{formik.errors[field.name]}</FieldError>
                        }
                    </FieldContainer>
                ))
            }
            <input type="file" name="" id="" accept='image/*' ref={ref} style={{ display: 'none' }} onChange={handleFileChange} />
            <div className="pick-image" onClick={() =>{ !file && ref.current.click()}}>
                {
                    !preview ?
                    <>
                        <div className="icon"><CameraOutlined /></div>
                        <div className="label">Cliquer pour ajouter une image</div>
                    </>:
                    <>
                        <img src={preview} alt="" />
                        <div className="edit" onClick={() =>{ref.current.click()}}> <EditOutlined /> </div>
                    </>
                }
            </div>
            <Button type='primary' className='btn submit' htmlType='submit' block style={{ marginTop: 15 }}>Suggerer</Button>
        </FormContainer>
    </Modal>
  )
}