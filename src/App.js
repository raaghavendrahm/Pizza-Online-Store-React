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
  }, []); // empty dependency array is to achieve the above only when teh component is mounted.

  // To reflect the updated 'cart' data obtained with setCart in local storage, another useEffect hook is used with 'cart' as dependency array:
  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
    // updated 'cart' object is stored in LS for 'cart'. Successful working of this can be checked in LS under 'Application' tab of console. With each "ADD" click, both items and total items are updated.
  });

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
