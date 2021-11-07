import { useContext } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { CartContext } from '../CartContext';

const Cart = () => {
  // updated cart data is received from useState of App comp through useContext:
  const { cart, setCart } = useContext(CartContext);

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

  // Increment
  const increment = (productId) => {
    const existingQty = cart.items[productId]; // gives existing qty on clicked product
    const _cart = { ...cart }; // cloning cart as a local copy that can be modified
    _cart.items[productId] = existingQty + 1; // incrementing the qty of clicked product on local copy by 1
    _cart.totalItems += 1; // increment the value of totalItems of local copy by 1
    setCart(_cart); // updated the main cart data (in App) w.r.t updated local copy that reflects everywhere needed (both in quantity of that product and total product on Nav)
  };

  // Decrement
  const decrement = (productId) => {
    const existingQty = cart.items[productId]; // gives existing qty on clicked product
    if (existingQty === 1) {
      return;
      // When '-' is clicked, number should not go less than 1. Least number should be 1. If not even 1 needed, it shall be deleted which is taken care in 'deleting item' logic.
    }
    const _cart = { ...cart }; // cloning cart as a local copy that can be modified
    _cart.items[productId] = existingQty - 1; // decrementing the qty of clicked product on local copy by 1
    _cart.totalItems -= 1; // decrement the value of totalItems of local copy by 1
    setCart(_cart); // updated the main cart data (in App) w.r.t updated local copy that reflects everywhere needed (both in quantity of that product and total product on Nav)
  };

  // Get Sum
  const getSum = (productId, price) => {
    const sum = price * getQty(productId); // updates the price of the product (on which + or - is clicked w.r.t its quantity in the cart currently)
    return sum;
  };

  return (
    // If the cart is empty, corresponding image to be displayed. If cart has items, those items (products) must be displayed:
    !products.length ? (
      <img src="/images/empty-cart.png" alt="" />
    ) : (
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
                    <button
                      className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                      onClick={() => {
                        decrement(product._id);
                      }}
                    >
                      -
                    </button>
                    <b className="px-4">{getQty(product._id)}</b>
                    <button
                      className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
                      onClick={() => {
                        increment(product._id);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span>₹ {getSum(product._id, product.price)}</span>
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
    )
  );
};

export default Cart;
