import React from 'react';
import NavigationBar from '../components/navbar';
import RequestForm from '../components/RequestForm';

import { Link } from 'react-router-dom';

const Request = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5 px-0">
        <RequestForm></RequestForm>
      </div>
    </div>
  );
};

export default Request;