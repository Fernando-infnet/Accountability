import React, { useState, useEffect } from 'react';
import { getContacts } from '../services/contactService'; 
import { deleteRequestById } from '../services/requestService';
import { getRequestsById } from '../services/requestService';
import { getProductsById } from '../services/productsService';
import { getRequests } from '../services/requestService';

import useAuth from '../hooks/useAuth';

const RequestList = () => {

  const { user, isAdmin } = useAuth();

  const userUid = user ? user.uid : "";

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
        try {
          const requestData = await getRequestsById(userUid);
          setRequests(requestData);
        } catch (error) {
          console.error('Error fetching requests:', error);
        }
      };

    fetchRequests();
  }, [userUid]);

  const [productNames, setProductNames] = useState({})

  useEffect(() => {
    const fetchProductNames = async () => {
      const names = {};
      for (const request of requests) {
        try {
          const product = await getProductsById(request.productId);
          names[request.productId] = product.name;
        } catch (error) {
          console.error(`Error fetching supplier with ID ${request.productId}:`, error);
          names[request.productId] = 'Não encontrado';
        }
      }
      setProductNames(names);
    };

    fetchProductNames();
  }, [requests]);

  console.log(productNames)

  console.log(userUid)

  const handleDelete = async(id) => {
    console.log(id)
    try {
        await deleteRequestById(id);
        setRequests((e) =>
            e.filter((request) => request.id !== id)
        );
    } 
    catch(error) {
        console.error(`Error deleting request with ID ${id}:`, error);
    }
  }

  return (
    <div>
      <h2 class="mt-2">Suas Requisições</h2>
      {requests.map((request) => (
          <li style={{display: 'flex', justifyContent: 'center'}} key={request.id}>
            <div class="card mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title">Nome Produto: {productNames[request.productId] || 'Carregando...'}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    {(request.description !== "") && (
                        <li class="list-group-item"><strong>Descrição:</strong> {request.description}</li>
                    )}
                    <li class="list-group-item"><strong>Email Colaborador:</strong> {request.userMail}</li>
                    <li class="list-group-item"><strong>Uid Colaborador:</strong> {request.userUid}</li>
                </ul>
                <button
                className="btn btn-danger m-3 p-3"
                onClick={() => handleDelete(request.id)}
                >
                    Deletar
                </button>
            </div>
          </li>
        ))}
    </div>
  );
};

export default RequestList;
