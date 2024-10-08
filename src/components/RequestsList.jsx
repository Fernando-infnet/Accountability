import React, { useState, useEffect } from 'react';
import { getContacts } from '../services/contactService'; 
import { deleteRequestById } from '../services/requestService';
import { getRequestsById } from '../services/requestService';
import { getProductsById } from '../services/productsService';
import { getRequests } from '../services/requestService';

import useAuth from '../hooks/useAuth';
import { getSupplierById } from '../services/supplierService';
import { getPricesByRequest } from '../services/priceService';

const RequestList = () => {

  const { user, isAdmin } = useAuth();

  const userUid = user ? user.uid : "";

  const [requests, setRequests] = useState([]);
  const [supplierNames, setSupplierNames] = useState({});
  const [requestPrices , setRequestPrices] = useState({})

  useEffect(() => {
    const fetchRequests = async () => {
        try {
          const requestData = await getRequestsById(userUid);
          const sortedPrices = requestData.sort((a, b) => a.data.seconds - b.data.seconds);
          setRequests(sortedPrices);
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

  useEffect(() => {
    const fetchRequestsPricesAndSuppliers = async () => {
      const pricesMap = {};
      const suppliersMap = {};

      for (const request of requests) {
        try {
          const prices = await getPricesByRequest(request.id);
          console.log(prices)
          const sortedPrices = prices.sort((a, b) => a.data.seconds - b.data.seconds);
          console.log(sortedPrices)
          pricesMap[request.id] = sortedPrices;

          for (const price of sortedPrices) {
            if (!suppliersMap[price.supplierId]) {
              try {
                const supplier = await getSupplierById(price.supplierId);
                suppliersMap[price.supplierId] = supplier.name;
              } catch (error) {
                console.error(`Error fetching supplier with ID ${price.supplierId}:`, error);
                suppliersMap[price.supplierId] = 'Não encontrado';
              }
            }
          }
        } catch (error) {
          console.error(`Error fetching prices for request ID ${request.id}:`, error);
          pricesMap[request.id] = [];
        }
      }

      setRequestPrices(pricesMap);
      setSupplierNames(suppliersMap);
    };

      fetchRequestsPricesAndSuppliers();

  }, [requests]);

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

  const RequestState = (length = []) => {
    if(length.length >= 3) {
        return (
            <span>COTADA</span>
        )
    } else if ( length.length > 0 && length.length < 3){
        return (
            <span>EM COTAÇÃO</span>
        )
    }
    return (
        <span>ABERTA</span>
    )
  }

  return (
    <div>
      <h2 class="mt-2">Suas Requisições</h2>
      {requests.map((request) => {
        const prices = requestPrices[request.id] || [];
        return (
          <li style={{display: 'flex', justifyContent: 'center'}} key={request.id}>
            <div class="card mt-3 mb-3">
                <div class="card-body" style={{borderBottom: '1px solid #dee2e6'}}>
                    <h5 style={{padding: '16px', fontSize: '24px', fontWeight: 'bold'}}>ESTADO: {RequestState(prices)}</h5>
                </div>
                <div class="card-body">
                    <h5 class="card-title"><strong>Nome Produto:</strong> {productNames[request.productId] || 'Carregando...'}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Data:</strong> {request.data ? new Date(request.data.toDate()).toLocaleDateString() : 'Carregando...'}</li>
                    {(request.description !== "") && (
                        <li class="list-group-item"><strong>Descrição:</strong> {request.description}</li>
                    )}
                    <li class="list-group-item"><strong>Email Colaborador:</strong> {request.userMail}</li>
                    <li class="list-group-item"><strong>Uid Colaborador:</strong> {request.userUid}</li>
                    {prices.length > 0 && (
                    <li className="list-group-item">
                        <strong>Cotações:</strong>
                        <ul>
                        {prices.map((price, index) => (
                            <li key={index}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                <p>Data: {price.data ? new Date(price.data.toDate()).toLocaleDateString() : 'Carregando...'}</p>
                                </div>
                                <div>
                                <p>Fornecedor: {supplierNames[price.supplierId] || 'Carregando...'}</p>
                                <p>Preço: {price.price}R$</p>
                                </div>
                            </div>
                            </li>
                        ))}
                        </ul>
                    </li>
                    )}
                </ul>
                <button
                className="btn btn-danger m-3 p-3"
                onClick={() => handleDelete(request.id)}
                >
                    Deletar
                </button>
            </div>
          </li>
        )
        })}
    </div>
  );
};

export default RequestList;
