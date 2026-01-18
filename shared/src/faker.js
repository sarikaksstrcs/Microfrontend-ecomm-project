const createFaker = () => {
  const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Emma', 'Chris', 'Lisa'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
  const adjectives = ['Premium', 'Deluxe', 'Professional', 'Classic', 'Modern', 'Vintage'];
  const products = ['Laptop', 'Phone', 'Camera', 'Watch', 'Headphones', 'Tablet', 'Speaker', 'Monitor'];

  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const pick = (arr) => arr[random(0, arr.length - 1)];

  return {
    person: {
      firstName: () => pick(firstNames),
      lastName: () => pick(lastNames),
      email: () =>
        `${pick(firstNames).toLowerCase()}.${pick(lastNames).toLowerCase()}@email.com`,
    },
    commerce: {
      productName: () => `${pick(adjectives)} ${pick(products)}`,
      price: (min = 10, max = 1000) => (random(min * 100, max * 100) / 100).toFixed(2),
      department: () => pick(categories),
      productDescription: () =>
        'High-quality product with excellent features and durability.',
    },
    image: {
      url: (w = 400, h = 400) => `https://picsum.photos/${w}/${h}?random=${random(1, 1000)}`,
    },
    datatype: {
      uuid: () => `${random(10000, 99999)}-${random(1000, 9999)}-${random(1000, 9999)}`,
      number: (opts) => random(opts?.min || 0, opts?.max || 100),
    },
  };
};

const faker = createFaker();
export default faker;