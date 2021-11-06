import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import { CartContext } from './CartContext';

function App() {
  return (
    <Router>
      <CartContext.Provider value={{ name: 'raaghanna' }}>
        <div className="App">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/productspage" element={<ProductsPage />}></Route>
            <Route path="/products/:_id" element={<SingleProduct />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </CartContext.Provider>
    </Router>
  );
}

export default App;
