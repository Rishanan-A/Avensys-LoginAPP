import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function Restricted() {
  const [users, setUsers] = useState([]);

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
    window.location.href = '/welcome';
  }

  return (
    <div className="container mt-5">
      <h2>All Users</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>****</td>
              <td>{user.role}</td>
              <td>{formatCreatedAt(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={backButton} className="mt-3">Go back</Button>
    </div>
  );
}

export default Restricted;
