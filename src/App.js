import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect , useState } from 'react';
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
import SuppliersPage from './pages/SuppliersPage';
import PricesPage from './pages/PricesPage';
import CreateAdmins from './pages/CreateAdmins';
import BlockUsers from './pages/BlockUsers';
import { Puff } from 'react-loader-spinner'


console.log(useAuth)

function App() {

  const { user, isAdmin, isBlocked } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(user)
  console.log(isAdmin)
  console.log(isBlocked)

  useEffect(() => {
    
    const timer = setTimeout(() => setLoading(false), 800); 

    return () => clearTimeout(timer);
  }, [user, isBlocked]);

  if (loading) {
    return <div 
    style={{
      display: "flex", 
      height: "100vh", 
      justifyContent: "center", 
      alignItems: "center"}}
    >
      <Puff
       visible={true}
       height="80"
       width="80"
       color="#e97a2b"
       ariaLabel="puff-loading"
       wrapperStyle={{}}
       wrapperClass=""
      />
    </div>; 
  }

  console.log(user === null)
  console.log(user === false)

  return (
    <div className="App">
      {!isBlocked && 
        <Routes>
          <Route path="/" element={user === null ? <Login></Login> : <LandingPage></LandingPage>}/>
          {(user && !isAdmin) && (
            <>
              <Route path="/Request" element={user ? <Request></Request> : <Login></Login>} />
              <Route path="/RequestsPage" element={user ? <RequestsPage></RequestsPage> : <Login></Login>} />
            </>
          )}
          {(user) && (
            <>
              <Route path="/LandingPage" element={user ? <LandingPage></LandingPage> : <Login></Login>} />
            </>
          )}
          {(user && isAdmin) && (
            <>
              <Route path="/ContactsView" element={user ? <ContactsView></ContactsView> : <Login></Login>} />
              <Route path="/CreateAdmins" element={user ? <CreateAdmins></CreateAdmins> : <Login></Login>} />
              <Route path="/BlockUsers" element={user ? <BlockUsers></BlockUsers> : <Login></Login>} />
              <Route path="/Suppliers" element={user ? <Suppliers></Suppliers> : <Login></Login>} />
              <Route path="/SuppliersPage" element={user ? <SuppliersPage></SuppliersPage> : <Login></Login>} />
              <Route path="/Contacts" element={user ? <Contacts></Contacts> : <Login></Login>} />
              <Route path="/Products" element={user ? <Products></Products> : <Login></Login>} />
              <Route path="/ProductsPage" element={user ? <ProductsPage></ProductsPage> : <Login></Login>} />
              <Route path="/Price" element={user ? <Price></Price> : <Login></Login>} />
              <Route path="/PricesPage" element={user ? <PricesPage></PricesPage> : <Login></Login>} />
            </>
          )}
        </Routes>
      }
    </div>
  );
}

export default App;
