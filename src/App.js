import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import SingleProduct from './pages/SingleProduct';
import { CartContext } from './CartContext';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  // cart data must be fetched from localstorage as users may have added items to cart. To do this, a local state 'cart' is created:
  const [cart, setCart] = useState({});

  // Before fetching data from localstorage, cart data must be added to it when "ADD" is clicked. That logic is written in 'Product' component.

  // Once the data is in the cart, that is fetched using useEffect:
  useEffect(() => {
    const cart = window.localStorage.getItem('cart');
  }, []);

  return (
    <Router>
      <CartContext.Provider value={{ cart, setCart }}>
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
