import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes,Route, Navigate } from "react-router-dom"
import Home from './components/Home';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route element={<PrivateComponent/>}>
          <Route path=""  element={<Navigate replace to="/productlist"/>} />
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/productlist" element={<ProductList/>}/>
          <Route path="/logout" element={<h1>logout</h1>}/>
          <Route path="/update/:id" element={<UpdateProduct/>}/>
          </Route>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>} />


        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
