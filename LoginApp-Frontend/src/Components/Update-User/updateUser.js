import React, { useState } from 'react';
import axios from 'axios';
import './updateUser.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

function UpdateUser({ user, closeModal }) {
  const [formData, setFormData] = useState(user);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateUserSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const updatedUser = { ...user, ...formData };
    const { username } = updatedUser;
    axios.patch(`http://localhost:8080/user/update/${username}`, updatedUser)
      .then((response) => {
        console.log(response.data);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div>
      <form onSubmit={handleUpdateUserSubmit} className='update-form'>
        <div className='form-group'>
          <label>{t('translation.username')}</label>
          <input
            className='form-control'
            name='username'
            value={formData.username}
            onChange={handleChange}
            id='username-update'
            type='text' 
            disabled
            />
            
        </div>
        <div className='form-group'>
          <label>{t('translation.email')}</label>
          <input
            className='form-control'
            name='email'
            value={formData.email}
            onChange={handleChange}
            id='email-update'
            type='text' />
        </div>
        <div className='form-group'>
          <label>{t('translation.password')}</label>
          <input
            className='form-control'
            name='password'
            value={formData.password}
            onChange={handleChange}
            id='password-update'
            type='password' />
        </div>
        <div className='form-group'>
          <label>{t('translation.role')}</label>
          <select
            className='form-control'
            name='role'
            onChange={handleChange}
            value={formData.role}>
            <option value=''>{t('translation.selectRole')}</option>
            <option value='User'>{t('translation.user')}</option>
            <option value='Manager'>{t('translation.manager')}</option>
          </select>
        </div>
        <button
          className='btn btn-dark'
          style={{ width: '100%' }}
          disabled={isLoading}>
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <span>{t('translation.saveChanges')}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;