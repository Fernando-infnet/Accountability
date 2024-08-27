import React, { useEffect, useState } from 'react';
import { deleteProductById, getProducts } from '../services/productsService';
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

  const handleDelete = async (id) => {
    console.log(id)
    try {
        await deleteProductById(id);
        setProducts((e) =>
            e.filter((product) => product.id !== id)
        );
    } 
    catch(error) {
        console.error(`Error deleting product with ID ${id}:`, error);
    }
  }

  return (
    <div>
      {products.map(product => (
        <div style={{display : 'flex', justifyContent: 'center'}} key={product.id}> 
          <div class="card mt-3 mb-3">
              <div class="card-body">
                  <h5 class="card-title">Nome: {product.name}</h5>
              </div>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item"><strong>Descrição:</strong> {product.description}</li>
              </ul>
              <button
                className="btn btn-danger m-3 p-3"
                onClick={() => handleDelete(product.id)}
                >
                    Deletar
                </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

/*

<div class="ColoredBox" onClick={() => handleProductClick(product)}>
                  Compare Preços
                </div>
                { selectedProductId &&
                <div style={{display : 'flex', justifyContent: 'center', width: '100%'}} class="card mt-3 mb-3" >
                    {selectedProductId.id === product.id && (
                        <ProductPrices productId={selectedProductId} />
                    )}
</div>
}


*/