import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if(userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);  
  }, []);

  const handleRestrictedPage = () => {
    window.location.href = '/restricted';
  }

  const handleLogout =  () => {
    localStorage.clear();
    window.location.href = '/login';
  }

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (!user) {
    navigate('/login');
    return;
  }

  return (
    <Container className="mt-5">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Welcome, {user.username}!</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Role: {user.role}</ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
          </ListGroup>
          {user.role.toLowerCase() === 'manager' && 
            <Button onClick={handleRestrictedPage} className="mt-3">Access Restricted Page</Button>
          }
          <Button onClick={handleLogout} className="mt-3">Logout</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
  
export default Welcome;
