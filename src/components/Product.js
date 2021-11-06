import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../CartContext';

const Product = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);

  // Add to cart
  const addToCart = (e, product) => {
    e.preventDefault(); // to prevent redirecting to SingleProduct on clicking "ADD".

    // When clicked on "ADD", there may be a chance that some products are already added to cart. So, once clicked, first existing data in the cart must be copied:
    let _cart = { ...cart }; // {} (empty object initially)

    // '_' in '_cart' represents that the variable is local, not coming from other components as prop. 'cart' state in App is passed as data in 'value', and it received here with useContext. Then, 'cart' is copied using spread operator as {...cart} to prevent manipulation of main 'cart' object as objects are always passed as reference. This 'cart' object is stored in local variable '_cart'. So, for '_cart' the value will be what is stored in useState in App which is an empty object in the beginning ({}). As its value updates, the value of '_cart' will be updated.

    // w.r.t the logic described below for reference, when 'cart' data is received and if there is nothing the cart, meaning if 'items' key is not there in cart object, then 'items' key is added to cart object with an empty object as key to it:
    if (!_cart.items) {
      _cart.items = {};
      // Now, _cart value changes from {} to {items: {}}
    }

    // Next, if there are already any items in the cart, then its 'id' (_id) must be checked and its value (which is its quantity) must be increased by 1"
    if (_cart.items[product._id]) {
      _cart.items[product._id] += 1;
    }

    // Lastly, if the cart has some items but an item is getting added first time to the cart, then for its id, its value should be set to 1 which is that item's quantity:
    else {
      _cart.items[product._id] = 1;
    }

    // Finally, total number of items added to the cart must be updated in 'totalItems'. If there is no item in the cart, value of _cart.totalItems must be set to zero to avoid errors:
    if (!_cart.totalItems) {
      _cart.totalItems = 0;
    }
    _cart.totalItems += 1;

    // Now, 'setCart' must be used to set the cart as per the updated data. To use setCart here, it must be passed in value in App. So, 'setCart' is also added to 'value' in App and received in useContext, and used here:
    setCart(_cart);

    // This is all logic needed to add products to cart.

    // Now, with setCart, 'cart' data is updated in 'useState' in App. But, this is not yet reflected in localstorage. To do that, another useEffect hook in used in App comp.

    // Logic for cart data:
    // cart will be an object, which has 'items' object in it that contains 'id' of items as key and number of that item as its value. And it contains 'totalItems' that has the value of total number of items in the cart as shown below (for understanding purpose):
    /* 
    const cart = {
      items: {
        '60c67bdff5ee510015f3dda8': 2,
        '60c67bc0f5ee510015f3dda7': 3,
      },
      totalItems: 5,
    }; 
    */
  };

  return (
    <Link to={`/products/${product._id}`}>
      <div>
        <img src={product.image} alt="pizza" />
        <div className="text-center">
          <h2 className="text-lg font-bold py-2">{product.name}</h2>
          <span className="bg-gray-200 py-1 rounded-full text-sm px-4">
            {product.size}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span>₹ {product.price}</span>
          <button
            className="bg-yellow-500 py-1 px-4 rounded-full font-bold"
            onClick={(e) => {
              addToCart(e, product);
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
