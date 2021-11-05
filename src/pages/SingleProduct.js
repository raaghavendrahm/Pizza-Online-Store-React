import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

const SingleProduct = () => {
  // Product with the specific id can be fetched from another end point. The value of id is retrieved from url using 'useParams' hook. It returns an object with product's id. "_id" will be the key and its id will be the corresponding value. So, it is accessed in fetch as 'params._id'.

  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/products/${params._id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, []);

  return (
    <div className="container mx-auto mt-12">
      <button
        className="mb-12 font-bold"
        onClick={() => {
          navigate('/');
        }}
      >
        Back
      </button>
      <div className="flex">
        <img src={product.image} alt="pizza" />
        <div className="ml-16">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="text-md">{product.size}</div>
          <div className="font-bold mt-2">₹ {product.price}</div>
          <button className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
