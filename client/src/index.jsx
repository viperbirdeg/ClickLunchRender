import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/router';
//?Estilos
import './styles/index.css';
import './styles/normalizer.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Router/>
  </BrowserRouter>
);
