import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productsService';
import ProductPrices from './ProductPrices';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const productsList = await getProducts();
      setProducts(productsList);
    };

    fetchSuppliers();
  }, []);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <div>
      {products.map(product => (
        <div key={product.id} onClick={() => handleProductClick(product)}> 
          <div class="card mt-3 mb-3">
                <div class="card-body">
                    <h5 class="card-title">Name: {product.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Description:</strong> {product.description}</li>
                </ul>
                <div class="ColoredBox">
                  Compare Prices
                </div>
            </div>
        </div>
      ))}
      <div class="card mt-3 mb-3">
        {selectedProductId && <ProductPrices productId={selectedProductId} />}
      </div>
    </div>
  );
};

export default ProductList;