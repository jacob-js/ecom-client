import { Button } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { FieldContainer, FormContainer, Input, Label, Select } from '../Utils/common';
import { citys, provinces } from '../Utils/data';

function ProfileForm({ formVisible, setFormVisible, user }) {
    const form = useFormik({
        initialValues: {
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            city: user.city,
            province: user.province,
            country: user.country,
            birthdate: user.birthdate,
            gender: user.gender,
            profession: user.profession
        }
    })
  return <div>
      <FormContainer className={`profile-form ${formVisible ? 'visible': ''}`}>
          <div className="form-row">
              <FieldContainer>
                  <Label>Nom complet</Label>
                  <Input type="text" name="fullname" value={form.values.fullname} />
              </FieldContainer>
              <FieldContainer>
                  <Label>Email</Label>
                  <Input type="email" name="email" value={form.values.email} />
              </FieldContainer>
          </div>
          <div className="form-row">
              <FieldContainer>
                  <Label>Téléphone</Label>
                  <Input type="tel" name="phone" value={form.values.phone} />
              </FieldContainer>
              <FieldContainer>
                  <Label>Date de naissance</Label>
                  <Input type="date" name="birthdate" value={form.values.birthdate} />
              </FieldContainer>
          </div>
          <div className="form-row">
              <FieldContainer>
                  <Label>Sexe</Label>
                  <Select value={form.values.gender}>
                    <option value="" disabled>Non definie</option>
                    <option value="Masculin">Masculin</option>
                    <option value="Feminin">Feminin</option>
                  </Select>
              </FieldContainer>
              <FieldContainer>
                  <Label>Profession</Label>
                  <Input name="profession" value={form.values.profession} />
              </FieldContainer>
          </div>
          <div className="form-row">
              <FieldContainer>
                  <Label>Pays</Label>
                  <Select>
                    <option value="" disabled>Non definie</option>
                    <option value="Masculin">Congo Kinshasa</option>
                    <option value="Feminin">Rwanda</option>
                  </Select>
              </FieldContainer>
              <FieldContainer>
                  <Label>Province</Label>
                  <Select>
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
                <Select>
                    <option value="" disabled>Non definie</option>
                    {
                        citys.map(city => <option key={city} value={city}>{city}</option>)
                    }
                </Select>
              </FieldContainer>
              <Button className='btn btn-save' onClick={() =>setFormVisible(false)}>Enregistrer et fermer</Button>
          </div>
      </FormContainer>
  </div>;
}

export default ProfileForm;
