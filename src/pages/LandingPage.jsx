import React from 'react';
import NavigationBar from '../components/navbar';
import { Link } from 'react-router-dom';
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Suppliers from './Suppliers';

import useAuth from '../hooks/useAuth';


const LandingPage = () => {

  const { user , isAdmin } = useAuth();

  const navigate = useNavigate();

  const handleSignOff = () => {
    signOut(auth)
    navigate("/");
  }
  
  return (
    <div style={{height: '100vh'}}>
      <NavigationBar />
      <div className="container mt-5">
        <h1>Página Inicial</h1>
        <h5>Siga para o catálogo e operação de Produtos ACME:</h5>
        <div class="cards">
          {(user && !isAdmin) && (
            <div class="cardHome">
            <h2>Colaboradores</h2>
              <div class="links" style={{padding: "10px"}}>
                <Link to="/Request"><strong>Requisições de Compra</strong></Link>
                <Link to="/RequestsPage"><strong>Suas Requisições</strong></Link>
              </div>
            </div>
          )}
          {(user && isAdmin) && (
            <div class="cardHome">
              <h2>Funções Admin</h2>
              <div class="links" style={{padding: "10px"}}>
                <Link to="/CreateAdmins"><strong>Criar Admins</strong></Link>
                <Link to="/BlockUsers"><strong>Bloqueio de Contas</strong></Link>
              </div>
            </div>
          )}
          {(user && isAdmin) && (
            <div class="cardHome">
            <h2>Gerenciamento</h2>
              <div class="links" style={{padding: "10px"}}>
                <Link to="/Suppliers"><strong>Fornecedores</strong></Link>
                <Link to="/Products"><strong>Produtos</strong></Link>
                <Link to="/Contacts"><strong>Contato</strong></Link>
                <Link to="/Price"><strong>Cotações</strong></Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="btn btn-danger m-3 p-3"
        onClick={handleSignOff}
        >
            Sair da conta
      </button>
    </div>
  );
};

export default LandingPage;