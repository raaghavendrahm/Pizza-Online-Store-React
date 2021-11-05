import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import Cart from './pages/Cart';
import Product from './components/Product';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/productspage" element={<ProductsPage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product" element={<Product />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
