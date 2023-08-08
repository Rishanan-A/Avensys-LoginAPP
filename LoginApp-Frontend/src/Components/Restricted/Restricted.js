import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar/NavBar';

function Restricted() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const { t } = useTranslation();

  

  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(`Error fetching users: ${error}`);
      });
  }, []);

  const formatCreatedAt = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const backButton =  () => {
    navigate('/welcome');
  }

  const isManager = localStorage.getItem('role')?.toLowerCase() === 'manager';
  
  if (!isManager) {
    navigate('/404'); 
    return;
  }

  return (
    <div className="body">
      <NavBar/>
      <h2>{t('translation.allUsers')}</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>{t('translation.username')}</th>
            <th>{t('translation.email')}</th>
            <th>{t('translation.password')}</th>
            <th>{t('translation.role')}</th>
            <th>{t('translation.createdAt')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>****</td>
              <td>{t(`translation.${user.role.toLowerCase()}`)}</td>
              <td>{formatCreatedAt(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={backButton} className="mt-3">{t('translation.goBack')}</Button>
    </div>
  );
}

export default Restricted;
