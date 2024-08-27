import React from 'react';
import NavigationBar from '../components/navbar';
import RequestForm from '../components/RequestForm';

import { Link } from 'react-router-dom';
import RequestList from '../components/RequestsList';

const RequestsPage = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5 px-0">
        <RequestList></RequestList>
      </div>
    </div>
  );
};

export default RequestsPage;