import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar/NavBar';

function Welcome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  


  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if(userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);  
  }, []);

  const handleRestrictedPage = () => {
    navigate('/restricted');
  }

  const handleLogout =  () => {
    const lang = localStorage.getItem('Lang'); 
    localStorage.clear(); 
    localStorage.setItem('Lang', lang);
    navigate('/login');
  }

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (!user) {
    navigate('/404');
    return;
  }

  return (
    <div className="body">
      <NavBar/>
      <Card style={{ width: '18rem', marginLeft:10, marginTop:10 }}>
        <Card.Body>
          <Card.Title>{t('translation.welcome')}, {user.username}!</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>{t('translation.role')}: {t(`translation.${user.role.toLowerCase()}`)}</ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item>{t('translation.email')}: {user.email}</ListGroup.Item>
          </ListGroup>
          {user.role.toLowerCase() === 'manager' && 
            <Button onClick={handleRestrictedPage} className="mt-3">{t('translation.accessRestrictedPage')}</Button>
          }
          <Button onClick={handleLogout} className="mt-3">{t('translation.logout')}</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
  
export default Welcome;
