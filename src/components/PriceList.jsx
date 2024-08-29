import React, { useState, useEffect } from 'react';
import { deleteRequestById } from '../services/requestService';
import { getRequests } from '../services/requestService';
import { getProductsById } from '../services/productsService';

import useAuth from '../hooks/useAuth';
import { getPricesByRequest } from '../services/priceService';
import { getSupplierById } from '../services/supplierService';

const PriceList = () => {

  const { user, isAdmin } = useAuth();

  const userUid = user ? user.uid : "";

  const [requests, setRequests] = useState([]);
  const [productNames, setProductNames] = useState({});
  const [supplierNames, setSupplierNames] = useState({});
  const [requestPrices , setRequestPrices] = useState({})

  useEffect(() => {
    const fetchRequests = async () => {
        try {
          const requestData = await getRequests();
          setRequests(requestData);
        } catch (error) {
          console.error('Error fetching requests:', error);
        }
      };

    fetchRequests();
  }, [userUid]);

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
      <h2 class="mt-2">Todas Requisições</h2>
      {requests.map((request) => {
      const prices = requestPrices[request.id] || [];
      return (
          <li style={{display: 'flex', justifyContent: 'center'}} key={request.id}>
            <div class="card mt-3 mb-3">
                <div class="card-body" style={{borderBottom: '1px solid #dee2e6'}}>
                    <h5 style={{padding: '16px', fontSize: '24px', fontWeight: 'bold'}}>ESTADO: {RequestState(prices)}</h5>
                </div>
                <div class="card-body">
                    <h5 class="card-title">Nome Produto: {productNames[request.productId] || 'Carregando...'}</h5>
                </div>
                <ul style={{padding : '0'}} class="list-group list-group-flush">
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
            </div>
          </li>
        );
        })}
    </div>
  );
};

export default PriceList;