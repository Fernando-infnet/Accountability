import React from 'react';
import NavigationBar from '../components/navbar';
import { Link } from 'react-router-dom';

import Suppliers from './Suppliers';

const LandingPage = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <h1>Inventário ACME Página Inicial</h1>
        <p>Siga para o Registro de Produtos e suas dependências:</p>
        <div class="links" style={{padding: "10px"}}>
          <Link to="/Products"><strong>Produtos</strong></Link>
          <Link to="/Suppliers"><strong>Fornecedores</strong></Link>
          <Link to="/Contacts"><strong>Contato</strong></Link>
          <Link to="/Price"><strong>Cotações</strong></Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;