import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Suppliers from './pages/Suppliers';
import Contacts from './pages/Contacts';
import Products from './pages/Products';
import Price from './pages/Price';
import ContactsView from './pages/ContactsPage';
import Login from './pages/Login';
import useAuth from './hooks/useAuth';
import Request from './pages/Request';
import RequestsPage from './pages/RequestsPage';
import ProductsPage from './pages/ProductsPage';
import SupplierList from './components/SupplierList';
import SuppliersPage from './pages/SuppliersPage';

console.log(useAuth)

function App() {

  const { user , isAdmin } = useAuth();

  console.log(user)

  console.log(isAdmin)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Login></Login> : <LandingPage></LandingPage>}/>
        <Route path="/LandingPage" element={user ? <LandingPage></LandingPage> : <Login></Login>} />
        <Route path="/Suppliers" element={user ? <Suppliers></Suppliers> : <Login></Login>} />
        <Route path="/SuppliersPage" element={user ? <SuppliersPage></SuppliersPage> : <Login></Login>} />
        <Route path="/Contacts" element={user ? <Contacts></Contacts> : <Login></Login>} />
        <Route path="/Products" element={user ? <Products></Products> : <Login></Login>} />
        <Route path="/ProductsPage" element={user ? <ProductsPage></ProductsPage> : <Login></Login>} />
        <Route path="/Price" element={user ? <Price></Price> : <Login></Login>} />
        <Route path="/Request" element={user ? <Request></Request> : <Login></Login>} />
        <Route path="/RequestsPage" element={user ? <RequestsPage></RequestsPage> : <Login></Login>} />
        {(user && isAdmin) && (
          <Route path="/ContactsView" element={user ? <ContactsView></ContactsView> : <Login></Login>} />

        )}
      </Routes>
    </div>
  );
}

export default App;
