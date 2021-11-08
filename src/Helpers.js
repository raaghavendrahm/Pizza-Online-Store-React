// Getting data from LS and storing data to LS is kept here and exported. It is imported in App to make it look cleaner.

export const getCart = () => {
  // The process of getting item from LS takes time. So, to handle the further process better by running 'setCart(JSON.parse(cart))' only after 'cart' data is ready, let's return a promise:
  return new Promise((resolve, reject) => {
    const cart = window.localStorage.getItem('cart');
    resolve(cart);
  });
};

export const storeCart = (cart) => {
  window.localStorage.setItem('cart', JSON.stringify(cart));
  // updated 'cart' object is stored in LS for 'cart'. Successful working of this can be checked in LS under 'Application' tab of console. With each "ADD" click, both items and total items are updated.
};
