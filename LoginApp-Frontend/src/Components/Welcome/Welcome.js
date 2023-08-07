import React, { useEffect, useState } from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

function Welcome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  
  
  const defaultLanguage = 'en';
  const storedLanguage = localStorage.getItem('Lang');
  const initialLanguage = storedLanguage && Object.keys(i18n.options.resources).includes(storedLanguage) ? storedLanguage : defaultLanguage;
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

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

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('Lang', selectedLanguage);
  };

  return (
    <Container className="mt-5">
      <div className="language-dropdown">
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
      <Card style={{ width: '18rem' }}>
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
    </Container>
  );
}
  
export default Welcome;
