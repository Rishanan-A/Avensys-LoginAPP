import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Alert } from 'react-bootstrap';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import CreateUser from '../CreateUser/CreateUser';

function Login() {
  // eslint-disable-next-line 
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please enter your username and password!');
      return;
    }

    axios
      .post('http://localhost:8080/login', {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('username', username);

        axios
          .get(`http://localhost:8080/user/${username}`)
          .then((response) => {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('role', response.data.role);
            navigate('/welcome');
          })
          .catch((error) => {
            console.error(`Error fetching user data: ${error}`);
            navigate('/login');
          });
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
        setError('Invalid username or password');
      });
  };

  useEffect(() => {
    const successMsg = localStorage.getItem('successMessage');
    if (successMsg) {
      setSuccessMessage(successMsg);
      localStorage.removeItem('successMessage');
    }
  }, []);

  useEffect(() => {
    if (!showCreateUserModal) {
      setSuccessMessage('');
    }
  }, [showCreateUserModal]);
  

  return (
    <div className="container h-100">
      <div className="row align-items-center h-100">
        <div className="col-6 mx-auto">
          <div className="jumbotron jumbotron-fluid rounded shadow-lg p-3 mb-5 bg-white rounded hoverable">
            <h2 className='text-center'>Sign In</h2>
            <form className='login-form' noValidate onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' className='form-control login-input' placeholder='Username' onChange={e => setUsername(e.target.value)} />
              </div>
              <div className='form-group mb-3'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' className='form-control login-input' placeholder='Password' onChange={e => setPassword(e.target.value)} />
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              <input type='submit' className='btn btn-primary mb-3' value={'SIGN IN'} />
            </form>

            <Button className="btn btn-secondary mb-3" onClick={() => setShowCreateUserModal(true)}>
              Create User
            </Button>
            
            <Modal show={showCreateUserModal} onHide={() => setShowCreateUserModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CreateUser />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowCreateUserModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
