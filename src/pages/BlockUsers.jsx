import React from 'react';
import NavigationBar from '../components/navbar';
import ContactForm from '../components/ContactForm';

import { Link } from 'react-router-dom';
import BlockForm from '../components/BlockForm';
import BlockView from '../components/BlockView';

const BlockUsers = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5 px-0">
        <BlockForm></BlockForm>
        <div className='mt-5'>
            <BlockView></BlockView>
        </div>
      </div>
    </div>
  );
};

export default BlockUsers;