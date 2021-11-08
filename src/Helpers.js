// Getting data from LS and storing data to LS is kept here and exported. It is imported in App to make it look cleaner.

export const getCart = () => {
  const cart = window.localStorage.getItem('cart');
  return cart;
};

export const storeCart = (cart) => {
  window.localStorage.setItem('cart', JSON.stringify(cart));
  // updated 'cart' object is stored in LS for 'cart'. Successful working of this can be checked in LS under 'Application' tab of console. With each "ADD" click, both items and total items are updated.
};
