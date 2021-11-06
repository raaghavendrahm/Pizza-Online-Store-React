import { Link } from 'react-router-dom';
const Product = ({ product }) => {
  // Add to cart
  const addToCart = (e, product) => {
    e.preventDefault(); // to prevent redirecting to SingleProduct on clicking "ADD"

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
