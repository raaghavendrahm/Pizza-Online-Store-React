import { useContext } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { CartContext } from '../CartContext';

const Cart = () => {
  // updated cart data is received from useState of App comp through useContext:
  const { cart } = useContext(CartContext);

  // State to store fetched products:
  const [products, setProducts] = useState([]);

  // using the product ids obtained from above, those products are fetched using useEffect:
  useEffect(() => {
    // If the cart is empty, nothing to be done:
    if (!cart.items) {
      return;
    }

    // If there are items, using their id, they are fetched from the server:
    fetch('/api/products/cart-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) }), // To add all the keys (ids) into an array
    })
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, [cart]); // 'cart' is used as dependency array beacuse fetching id from LS and product from server with that id takes time. So, if there is no data yet, there is nothing to fetch. So, with cart as dependency, this executes only with change in cart data (that is, once cart data is fetched).

  // Get quantity
  const getQty = (productId) => {
    return cart.items[productId];
  };

  return (
    <div className="container mx-auto lg:w-1/2 w-full pb-24">
      <h1 className="my-12 font-bold">Cart Items</h1>
      <ul>
        {/* Looping through the data fetched to display on Cart page */}
        {products.map((product) => {
          return (
            <li className="mb-12" key={product._id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-16" src={product.image} alt="" />
                  <span className="font-bold ml-4 w-48">{product.name}</span>
                </div>
                <div>
                  <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
                    -
                  </button>
                  <b className="px-4">{getQty(product._id)}</b>
                  <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
                    +
                  </button>
                </div>
                <span>₹ {product.price}</span>
                <button className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <hr className="my-6" />
      <div className="text-right">
        <b>Grand Total:</b> ₹ 1000
      </div>
      <div className="text-right mt-6">
        <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
