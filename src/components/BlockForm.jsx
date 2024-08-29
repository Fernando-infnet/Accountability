import React, { useState, useEffect } from 'react';
import { addBlockedUsers } from '../services/adminService';


const BlockForm = () => {
  const [userUID, setUserUID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(userUID !== ''){
      await addBlockedUsers({userUID});
    }
    setUserUID('');
    window.location.reload();
  };

  return (
    <div class="gridForm"> 
        <div class="ColoredBox">
            <h2 className='boxText'>Bloqueie o usuário</h2>
        </div>
        <form onSubmit={handleSubmit}  class="gridPosition">
        <input 
        class="inputStyle"
            type="text" 
            placeholder="User ID para bloquear" 
            value={userUID} 
            onChange={(e) => setUserUID(e.target.value)} 
        />
        <button class="ColoredBox" type="submit">Prosseguir</button>
        </form>
    </div>

  );
};

export default BlockForm;