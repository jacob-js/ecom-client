import { Button } from 'antd';
import Compressor from 'compressorjs';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { useMutation } from 'react-query';
import { updateUser } from '../apis/auth';
import { FieldContainer, FormContainer, Input, Label, Select } from '../Utils/common';
import { citys, provinces } from '../Utils/data';
import { sendNotif } from '../Utils/notif';
import { useDispatch } from 'react-redux';

function ProfileForm({ formVisible, setFormVisible, user }) {
    const [ pic, setPic ] = useState(user.cover);
    const [ file, setFile ] = useState();
    const dispatch = useDispatch();
    const formData = new FormData();
    const imgRef = useRef();
    const form = useFormik({
        initialValues: {
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            city: user.city,
            province: user.state,
            country: user.country,
            birthdate: user.birthdate,
            gender: user.gender,
            profession: user.profession
        },
        onSubmit: values =>{
            formData.append('fullname', values.fullname);
            formData.append('email', values.email);
            formData.append('phone', values.phone);
            formData.append('city', values.city);
            formData.append('state', values.province);
            formData.append('country', values.country);
            formData.append('birthdate', values.birthdate);
            formData.append('gender', values.gender);
            formData.append('profession', values.profession);
            formData.append('cover', file);
            if(isAvailableChange){
                mutate(formData)
            }else{
                setFormVisible(false);
            }
        }
    });

    const isAvailableChange = form.values.fullname !== user.fullname || form.values.email !== user.email || form.values.phone !== user.phone || form. values.city !== user.city || form.values.province !== user.state || form.values.country !== user.country || form.values.birthdate !== user.birthdate || form.values.gender !== user.gender || form.values.profession !== user.profession || file;

    const onImgChange = e =>{
        const file = e.target.files[0];
        if(file){
            new Compressor(file, {
                quality: 0.5,
                success(result) {
                    setFile(result);
                }
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setPic(fileReader.result);
            };
        }
    };

    const { mutate, isLoading } = useMutation(data => updateUser(user.id, data), {
        onSuccess: (data) => {
            setFormVisible(false);
            sendNotif('Modification effectuée avec succès');
            dispatch({ type: 'UPDATE_USER', payload: data?.data });
        },
        onError: (err) => {
            const res = err.response;
            if(res){
                sendNotif(res.data?.message, 'error');
            }else{
                sendNotif('Une erreur est survenue', 'error');
            }
        }
    })
  return <div>
      <FormContainer className={`profile-form ${formVisible ? 'visible': ''}`} onSubmit={form.handleSubmit}>
          <div className="pic">
              <div className="avatar">
                  {
                      pic ? <img src={pic} alt="" srcset="" />:
                      <FaUserAlt className='icon' />
                  }
              </div>
              <div className="edit-icon" onClick={() =>imgRef.current?.click()}>
                <AiOutlineCamera className='icon' />
              </div>
            <input type="file" onChange={onImgChange} name="cover" accept='image/*' style={{ display: 'none' }} ref={imgRef}/>
          </div>
          <div className="form-row">
              <FieldContainer>
                  <Label>Nom complet</Label>
                  <Input type="text" name="fullname" value={form.values.fullname} onChange={form.handleChange('fullname')} />
              </FieldContainer>
              <FieldContainer>
                  <Label>Email</Label>
                  <Input type="email" name="email" value={form.values.email} onChange={form.handleChange('email')} />
              </FieldContainer>
          </div>
          <div className="form-row">
              <FieldContainer>
                  <Label>Téléphone</Label>
                  <Input type="tel" name="phone" value={form.values.phone} onChange={form.handleChange('phone')} />
              </FieldContainer>
              <FieldContainer>
                  <Label>Date de naissance</Label>
                  <Input type="date" name="birthdate" value={form.values.birthdate} onChange={form.handleChange('birthdate')} />
              </FieldContainer>
          </div>
          <div className="form-row">
              <FieldContainer>
                  <Label>Sexe</Label>
                  <Select value={form.values.gender} onChange={form.handleChange('gender')}>
                    <option value={null} disabled>Non definie</option>
                    <option value="Masculin">Masculin</option>
                    <option value="Feminin">Feminin</option>
                  </Select>
              </FieldContainer>
              <FieldContainer>
                  <Label>Profession</Label>
                  <Input name="profession" value={form.values.profession} onChange={form.handleChange('profession')} />
              </FieldContainer>
          </div>
          <div className="form-row">
              <FieldContainer>
                  <Label>Pays</Label>
                  <Select value={form.values.country} onChange={form.handleChange('country')}>
                    <option value={null} disabled>Non definie</option>
                    <option value="Masculin">Congo Kinshasa</option>
                    <option value="Feminin">Rwanda</option>
                  </Select>
              </FieldContainer>
              <FieldContainer>
                  <Label>Province</Label>
                  <Select value={form.values.province} onChange={form.handleChange('province')}>
                      <option value="" disabled>Non definie</option>
                      {
                          provinces.map(province => <option key={province} value={province}>{province}</option>)
                      }
                  </Select>
              </FieldContainer>
          </div>
          <div className="form-row">
              <FieldContainer>
                <Label>Ville</Label>
                <Select value={form.values.city} onChange={form.handleChange('city')}>
                    <option value="" disabled>Non definie</option>
                    {
                        citys.map(city => <option key={city} value={city}>{city}</option>)
                    }
                </Select>
              </FieldContainer>
              <Button className='btn btn-save' htmlType='submit' loading={isLoading}>Enregistrer et fermer</Button>
          </div>
      </FormContainer>
  </div>;
}

export default ProfileForm;
