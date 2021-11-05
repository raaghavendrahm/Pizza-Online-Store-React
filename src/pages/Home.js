const Home = () => {
  return (
    <>
      <div className="hero py-16">
        <div className="container mx-auto flex items-center justify-between">
          {/* Texts (left side) */}
          <div className="w-1/2">
            <h6 className="text-lg">
              <em>Are you hungry?</em>
            </h6>
            <h1 className="text-3xl md:text-6xl font-bold">Don't Wait !</h1>
            <button className="bg-yellow-500 px-6 py-2 rounded-full text-white font-bold mt-4 hover:bg-yellow-600">
              Order Now
            </button>
          </div>

          {/* Image (right side) */}
          <div className="w-1/2">
            <img className="w-4/5" src="/images/pizza.png" alt="pizza" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;