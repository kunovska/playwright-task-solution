export type Product = {
  id: string;
  title: string;
  price: number;
  addToCartTestId: string;
};

export const PRODUCTS: Record<string, Product> = {
  backpack: {
    id: 'item-4',
    title: 'Sauce Labs Backpack',
    price: 29.99,
    addToCartTestId: 'add-to-cart-sauce-labs-backpack',
  },

  bikeLight: {
    id: 'item-0',
    title: 'Sauce Labs Bike Light',
    price: 9.99,
    addToCartTestId: 'add-to-cart-sauce-labs-bike-light',
  },

  boltTshirt: {
    id: 'item-1',
    title: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
    addToCartTestId: 'add-to-cart-sauce-labs-bolt-t-shirt',
  },

  fleeceJacket: {
    id: 'item-5',
    title: 'Sauce Labs Fleece Jacket',
    price: 49.99,
    addToCartTestId: 'add-to-cart-sauce-labs-fleece-jacket',
  },

  onesie: {
    id: 'item-2',
    title: 'Sauce Labs Onesie',
    price: 7.99,
    addToCartTestId: 'add-to-cart-sauce-labs-onesie',
  },

  redTshirt: {
    id: 'item-3',
    title: 'Test.allTheThings() T-Shirt (Red)',
    price: 15.99,
    addToCartTestId: 'add-to-cart-test.allthethings()-t-shirt-(red)',
  },
};
