import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar/NavBar';
import './Restricted.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdateUser from '../Update-User/updateUser';
import { Modal } from 'react-bootstrap';

function Restricted() {
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!showUserModal) {
      fetchUsers();
    }
  }, [showUserModal]);

  const fetchUsers = () => {
    axios.get('http://localhost:8080/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(`Error fetching users: ${error}`);
      });
  };

  const handleDelete = (username) => {
    axios.delete(`http://localhost:8080/user/delete/${username}`)
      .then(() => {
        fetchUsers();
      })
      .catch(error => {
        console.error(`Error deleting user: ${error}`);
      });
  };

  const handleUserModalOpen = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleUserModalClose = () => {
    setSelectedUser(null);
    setShowUserModal(false);
  };

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
      <div className="container">
      <h2>{t('translation.allUsers')}</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>{t('translation.username')}</th>
            <th>{t('translation.email')}</th>
            <th>{t('translation.password')}</th>
            <th>{t('translation.role')}</th>
            <th>{t('translation.createdAt')}</th>
            <th>{t('translation.actions')}</th>
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
              <td>
                <button className="edit-btn" onClick={() => handleUserModalOpen(user)}>
                  <FontAwesomeIcon icon={faEdit} className="icon" />
                  {t('translation.edit')}
                </button>
                
                <button className="delete-btn mx-2" onClick={() => handleDelete(user.username)}>
                  <FontAwesomeIcon icon={faTrash} className="icon" />
                  {t('translation.delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={backButton} className="mt-3">{t('translation.goBack')}</Button>
      </div>
      <Modal show={showUserModal} onHide={handleUserModalClose}>
        <Modal.Header closeButton>
          <Modal.Title><FontAwesomeIcon icon="fi fi-sr-user-pen" className="icon" />{t('translation.updateUser')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <UpdateUser user={selectedUser} closeModal={handleUserModalClose} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Restricted;
