export const products = [
  {
    id: '1',
    name: 'Royal Patiala Jutti',
    category: 'womens',
    price: 2499,
    salePrice: 1999,
    rating: 4.8,
    reviews: 124,
    images: [
      `${import.meta.env.BASE_URL}images/prod-1.png`,
      `${import.meta.env.BASE_URL}images/prod-2.png`
    ],
    badges: ['sale', 'bestSeller'],
    sizes: [36, 37, 38, 39, 40],
    colors: ['Gold', 'Red'],
    inStock: true,
    description: 'Handcrafted golden jutti with intricate zari work, perfect for bridal and festive wear.'
  },
  {
    id: '2',
    name: 'Classic Tan Mojari',
    category: 'mens',
    price: 1899,
    salePrice: null,
    rating: 4.5,
    reviews: 89,
    images: [
      `${import.meta.env.BASE_URL}images/prod-3.png`,
      `${import.meta.env.BASE_URL}images/prod-4.png`
    ],
    badges: [],
    sizes: [40, 41, 42, 43, 44],
    colors: ['Tan', 'Brown'],
    inStock: true,
    description: 'Genuine leather traditional mojari for men. Ideal for casual and semi-formal occasions.'
  },
  {
    id: '3',
    name: 'Phulkari Embroidery Jutti',
    category: 'womens',
    price: 1599,
    salePrice: 1299,
    rating: 4.9,
    reviews: 210,
    images: [
      `${import.meta.env.BASE_URL}images/prod-5.png`,
      `${import.meta.env.BASE_URL}images/prod-6.png`
    ],
    badges: ['sale'],
    sizes: [36, 37, 38, 39, 40],
    colors: ['Multicolor'],
    inStock: true,
    description: 'Vibrant multicolor phulkari work jutti. A true representation of Punjabi culture.'
  },
  {
    id: '4',
    name: 'Black Velvet Zardosi',
    category: 'womens',
    price: 2999,
    salePrice: null,
    rating: 4.7,
    reviews: 56,
    images: [
      `${import.meta.env.BASE_URL}images/prod-7.png`,
      `${import.meta.env.BASE_URL}images/prod-8.png`
    ],
    badges: ['new'],
    sizes: [37, 38, 39],
    colors: ['Black'],
    inStock: true,
    description: 'Premium black velvet jutti with elegant zardosi embroidery.'
  },
  {
    id: '5',
    name: 'Kids Little Princess Jutti',
    category: 'kids',
    price: 999,
    salePrice: null,
    rating: 4.6,
    reviews: 34,
    images: [
      `${import.meta.env.BASE_URL}images/prod-9.png`,
      `${import.meta.env.BASE_URL}images/prod-10.png`
    ],
    badges: [],
    sizes: [28, 29, 30, 31, 32],
    colors: ['Pink'],
    inStock: true,
    description: 'Cute and comfortable pink jutti for little girls.'
  },
  {
    id: '6',
    name: 'Wedding Collection Khussa',
    category: 'mens',
    price: 3499,
    salePrice: 3199,
    rating: 4.9,
    reviews: 78,
    images: [
      `${import.meta.env.BASE_URL}images/prod-11.png`,
      `${import.meta.env.BASE_URL}images/prod-12.png`
    ],
    badges: ['sale', 'featured'],
    sizes: [41, 42, 43],
    colors: ['Cream', 'Maroon'],
    inStock: false,
    description: 'Exclusive wedding khussa for grooms. Hand-stitched to perfection.'
  },
];
