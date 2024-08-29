import React, { useEffect, useState } from 'react';
import { deleteProductById, getProducts } from '../services/productsService';
import { deleteBlockedState, getBlockedUsers } from '../services/adminService';

const BlockView = () => {

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const productsList = await getBlockedUsers();
      setBlocks(productsList);
    };

    fetchBlocks();
  }, []);

  const handleDelete = async (id) => {
    console.log(id)
    try {
        await deleteBlockedState(id);
        setBlocks((e) =>
            e.filter((block) => block.id !== id)
        );
    } 
    catch(error) {
        console.error(`Error deleting product with ID ${id}:`, error);
    }
  }

  return (
    <div>
      {blocks.map(block => (
        <div style={{display : 'flex', justifyContent: 'center'}} key={block.id}> 
          <div class="card mt-3 mb-3">
              <div class="card-body">
                  <h5 class="card-title">Blocked User ID: {block.userUID}</h5>
              </div>
              <button
                className="btn btn-danger m-3 p-3"
                onClick={() => handleDelete(block.id)}
                >
                    Deletar
                </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlockView;
