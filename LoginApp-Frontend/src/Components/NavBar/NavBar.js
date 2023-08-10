import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('Lang', selectedLanguage);
  };

  const defaultLanguage = 'en';
  const storedLanguage = localStorage.getItem('Lang');
  const initialLanguage = storedLanguage && Object.keys(i18n.options.resources).includes(storedLanguage) ? storedLanguage : defaultLanguage;
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const lang = localStorage.getItem('Lang'); 
    localStorage.clear(); 
    localStorage.setItem('Lang', lang);
    navigate('/login');
  };

  const userData = localStorage.getItem('user');
  const role = localStorage.getItem('role');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/welcome">
          <img src="/logo512.png" style={{width:25, height:25, marginRight:10}} alt="Logo" className="logo-img" />
          LoginAPP
        </Link>
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
            {userData && ( 
              <Link className="nav-link" to="/welcome">
                {t('translation.home')}
              </Link>
              )}
            </li>
            {role && role.toLowerCase() === 'manager' && ( 
              <li className="nav-item">
                <Link className="nav-link" to="/restricted">
                {t('translation.restricted')}
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center">
            <img src="trns-logo-white.png" style={{height:25, width:25, marginRight:10}} alt="Logo" className="logo-img" />
            <div className="language-dropdown">
              <select value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="en">{t('English')}</option>
                <option value="es">{t('Español')}</option>
                <option value="cn">{t('Chinese')}</option>
                <option value="ml">{t('Malay')}</option>
                <option value="tl">{t('Tamil')}</option>
              </select>
            </div>
            {userData && ( 
              <button className="btn btn-primary" style={{ marginLeft: 10 }} onClick={() => handleLogout()}>
                {t('translation.logout')}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
