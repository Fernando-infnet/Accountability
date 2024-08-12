import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Suppliers from './pages/Suppliers';
import Contacts from './pages/Contacts';
import Products from './pages/Products';
import Price from './pages/Price';
import ContactsView from './pages/ContactsPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route path="/Suppliers" element={<Suppliers></Suppliers>} />
        <Route path="/Contacts" element={<Contacts></Contacts>} />
        <Route path="/Products" element={<Products></Products>} />
        <Route path="/Price" element={<Price></Price>} />
        <Route path="/ContactsView" element={<ContactsView></ContactsView>} />
      </Routes>
    </div>
  );
}

export default App;
