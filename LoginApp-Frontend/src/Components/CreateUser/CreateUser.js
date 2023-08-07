import React, { useState } from 'react';
import axios from 'axios';
import './CreateUser.css';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function CreateUser() {
  const { t } = useTranslation();

  const [userData, setUserData] = useState({
    username: '',
    password: '',
    email: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!userData.username) {
      newErrors.username = "Username is required.";
      isValid = false;
    }
    if (!userData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    }
    if (!userData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }
    if (!userData.role) {
      newErrors.role = "Role is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const createdAt = new Date().toISOString();
    const newUser = { ...userData, createdAt };

    if (validateForm()) {
      axios
        .post('http://localhost:8080/createUser', newUser)
        .then((response) => {
          console.log('User created successfully:', response.data);
          setUserData({
            username: '',
            password: '',
            email: '',
            role: ''
          });
          setSuccessMessage('User created successfully!');
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    } else {
      console.log("User has failed to be created..");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='create-user-model'>
      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
          {successMessage}
        </Alert>
      )}
        <div className='form-group'>
          <label htmlFor="username">{t('translation.username')}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder={t('translation.username')}
            className='form-control'
          />
          {errors.username && <div className="text-danger">{errors.username}</div>}
        </div>
        <div className='form-group'>
          <label htmlFor="password">{t('translation.password')}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder={t('translation.password')}
            className='form-control'
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}

        </div>
        <div className='form-group'>
          <label htmlFor="email">{t('translation.email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className='form-control'
            placeholder={t('translation.email')}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}

        </div>
        <div className='form-group'>
          <label htmlFor="role">{t('translation.selectRole')}</label>
          <select
            className="form-control custom-select"
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}>
            <option value=''>{t('translation.selectRole')}</option>
            <option value='User'>{t('translation.user')}</option>
            <option value='Manager'>{t('translation.manager')}</option>
          </select>
          {errors.role && <div className="text-danger">{errors.role}</div>}
        </div>
        <button type="submit" className='btn btn-secondary mb-3'>{t('translation.createUser')}</button>
      </form>
    </div>
  );
}

export default CreateUser;
