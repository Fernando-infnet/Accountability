import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productsService';
import ProductPrices from './ProductPrices';
import { getSuppliers } from '../services/supplierService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsList = await getProducts();
      setProducts(productsList);
    };

    fetchProducts();

    const fetchSuppliers = async () => {
      const supplierList = await getSuppliers();
      const suppliersPerId = supplierList.reduce((map, supplier) => {
        map[supplier.id] = supplier.name;
        return map;
      }, {});
      setSuppliers(suppliersPerId);
    };

    fetchSuppliers();
  }, []);

  const handleProductClick = (productId) => {
    console.log(productId);
    console.log(selectedProductId);
    setSelectedProductId((prevSelectedId) => 
      prevSelectedId === productId ? null : productId
    );
  };

  return (
    <div>
      {products.map(product => (
        <div key={product.id}> 
          <div class="card mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title">Nome: {product.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Descrição:</strong> {product.description}</li>
                </ul>
                <div class="ColoredBox" onClick={() => handleProductClick(product)}>
                  Compare Preços
                </div>
                { selectedProductId &&
                <div class="card mt-3 mb-3">
                    {selectedProductId.id === product.id && (
                        <ProductPrices productId={selectedProductId} />
                    )}
                </div>
                }
            </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;