import { useContext } from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import { CartContext } from '../CartContext';

const Cart = () => {
  // updated cart data is received from useState of App comp through useContext:
  const { cart, setCart } = useContext(CartContext);

  // State to store fetched products:
  const [products, setProducts] = useState([]);

  // variable to update total sum:
  let total = 0;

  // There is an important optimization needed w.r.t below 'cart-items' fetch call. That is, with each increment or decrement of items in the cart, corresponding function executes which runs 'setCart', which inturn changes the main 'cart' data. As 'cart' is the dependency array for 'fetch-items' useEffect below, this re-renders the page and results in making 'cart-items' fetch call again on the server, which is not needed each time like this with every increment or decrement. Once, data is fetched, it is enough and need to repeat fetch call with each increment or decrement. This is prevented by creating 'priceFetched' state and setting it 'false' in the beginning and 'true' once data is fetched from 'cart-items' end point:
  const [priceFetched, togglePriceFetched] = useState(false);

  // using the product ids obtained from above, those products are fetched using useEffect:
  useEffect(() => {
    // If the cart is empty, nothing to be done:
    if (!cart.items) {
      return;
    }

    // If priceFetched is 'true' fetch call on 'cart-items' is not required as data is already fetched before:
    if (priceFetched) {
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
        // Toggle priceFetched to 'true' so that no fetch call is done agian on 'cart-items':
        togglePriceFetched(true);
      });
  }, [cart, priceFetched]); // 'cart' is used as dependency array beacuse fetching id from LS and product from server with that id takes time. So, if there is no data yet, there is nothing to fetch. So, with cart as dependency, this executes only with change in cart data (that is, once cart data is fetched).

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
    const sum = price * getQty(productId); // updates the price of the product (on which + or - is clicked w.r.t its quantity in the cart currently).
    total += sum; // updates grand total w.r.t every change in sum with addition and deletion of items in cart. So, for each + or -, 'sum' is updated and that updated sum is added to current 'total' which is the value of grand total.
    return sum;
  };

  // Handle Delete
  const handleDelete = (productId) => {
    const _cart = { ...cart }; // cloning
    const qty = _cart.items[productId]; // gets the quantity of clicked product. This is required to delete this qunatity from total quantity.

    // We need to serach for the key (productId) of the clicked product and delete it. As _cart is an object, to delete a property from an object, "delete" keyword is used. As each product is a property of _cart object, 'delete' is used to delete them:
    delete _cart.items[productId];

    // Now, updating 'totalItems' by subtracting 'qty' from it:
    _cart.totalItems -= qty;

    // Update the 'cart' data (state) with current updated '_cart':
    setCart(_cart);

    // But the above just display 'NaN' in price but doesn't remove the product from UI unless the page is refreshed. But, it shall be removed from UI when 'Delete' is clicked. This can be done by filtering the deleted product from 'products' data on which 'map' is used:
    const updatedProductList = products.filter(
      (product) => product._id !== productId
      // filter returns 'true' if the defined condition is matched, else returns 'false', and returns the ones which are 'true'. So, if the clicked id (productId) is not matching with current id (id of the product in the current iteration of the loop which is product._id), that product will be returned. If 'productId' matches with 'product._id', it will not be returned.

      // This successfully removes the product from UI when clicked on its 'Delete' button (without refreshing page).
    );

    // Update the 'products' data (state) with current 'products' state which is 'updatedProductList':
    setProducts(updatedProductList);
  };

  // Handle Order Now
  const handleOrderNow = () => {
    // Display alert message:
    window.alert('Order Placed Successfully!');

    // Set 'products' to an empty array:
    setProducts([]);

    // Set 'cart' to an empty object:
    setCart({});

    // As 'proudcts' is empty (length is zero or no length), check in 'return' will be true for '!products.length' and empty cart image will be displayed.

    // As no call on the backend is done, this completes 'Order Now'.
  };

  return (
    // If the cart is empty, corresponding image to be displayed. If cart has items, those items (products) must be displayed:
    !products.length ? (
      <img
        className="mx-auto w-1/2 mt-12"
        src="/images/empty-cart.png"
        alt=""
      />
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
                  <button
                    className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"
                    onClick={() => {
                      handleDelete(product._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <hr className="my-6" />
        <div className="text-right">
          <b>Grand Total:</b> ₹ {total}
        </div>
        <div className="text-right mt-6">
          <button
            className="bg-yellow-500 px-4 py-2 rounded-full leading-none"
            onClick={handleOrderNow}
          >
            Order Now
          </button>
        </div>
      </div>
    )
  );
};

export default Cart;
