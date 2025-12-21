// Product types
export type ProductVariant = {
  name: string;
  image: string;
  price?: number; // Optional - uses product price if not specified
};

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: 'clothing' | 'accessories' | 'parts';
  description?: string;
  variants?: ProductVariant[]; // For products with color/size options
};

// Product data
export const products: Product[] = [
  // Accessories
  { 
    id: '16', 
    title: 'Wind Breaker Skull Face Mask', 
    price: 25, 
    image: 'https://bikerforward.com/cdn/shop/products/O1CN01nwefxt1yYGlW96m66__2211604466590-0-cib_1800x1800.jpg?v=1658810713', 
    category: 'accessories',
    description: 'Windproof skull face mask perfect for riding, outdoor sports, and protection from dust and wind. Made with breathable material that keeps you comfortable. Features a badass skull design that shows your style. Available in 8 color variations to match your gear.',
    variants: [
      { name: 'Khaki Red Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN01nwefxt1yYGlW96m66__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
      { name: 'Black Gray Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN014CFzlN1yYGlgYUAct__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
      { name: 'Green Gray Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN01c7zhjN1yYGlcqfU6y__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
      { name: 'Black Color Lenses', image: 'https://bikerforward.com/cdn/shop/products/2-1_1800x1800.png?v=1658810701' },
      { name: 'Green Color Lenses', image: 'https://bikerforward.com/cdn/shop/products/BF60019-GreenRainbow_c1f36dab-76e2-4868-ab19-6b41cea454d5_1800x1800.jpg?v=1658810713' },
      { name: 'Black Red Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN014EQpek1yYGlkt7chu__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
      { name: 'Khaki Color Lenses', image: 'https://bikerforward.com/cdn/shop/products/BF60019-BeigeRainbow_b122189d-e38c-46e5-8417-5f456e1010bc_1800x1800.jpg?v=1658810713' },
      { name: 'Khaki Grey Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN017A5E5L1yYGlgHnxc8__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
    ]
  },
  { 
    id: '24', 
    title: 'Biker Face Mask', 
    price: 26, 
    image: 'https://litb-cgis.rightinthebox.com/images/640x640/202012/fbdovy1606801000622.jpg?fmt=webp&v=1', 
    category: 'accessories',
    description: 'Versatile and breathable biker face mask, ideal for protection against wind, dust, and sun. Features a comfortable fit and a variety of cool designs to complement your riding gear. Perfect for all seasons on the road.',
    variants: [
      { name: 'BLK/WHT Camo', image: 'https://litb-cgis.rightinthebox.com/images/640x640/202012/fbdovy1606801000622.jpg?fmt=webp&v=1' },
      { name: 'Dark USA', image: 'https://litb-cgis.rightinthebox.com/images/640x640/202012/ganrnd1606800997529.jpg?fmt=webp&v=1' },
      { name: 'Bandana Full', image: 'https://litb-cgis.rightinthebox.com/images/640x640/202012/awkstp1606800998360.jpg?fmt=webp&v=1' },
      { name: 'America', image: 'https://litb-cgis.rightinthebox.com/images/640x640/202012/nzuwha1606801001747.jpg?fmt=webp&v=1' },
      { name: 'Face', image: 'https://litb-cgis.rightinthebox.com/images/640x640/202012/drqzvr1606801003754.jpg?fmt=webp&v=1' },
      { name: 'Bandana', image: 'https://litb-cgis.rightinthebox.com/images/640x640/202012/aucnku1606801006548.jpg?fmt=webp&v=1' },
    ]
  },
  { 
    id: '25', 
    title: 'Urban Zombie Riding Gloves', 
    price: 22, 
    image: 'https://img.ridewill.it/public/athena/big/404557002_1.webp', 
    category: 'accessories',
    description: 'Badass urban zombie design riding gloves that combine style and functionality. Features reinforced palms for protection, excellent grip, and a unique zombie-themed design that shows your edge. Perfect for riders who want to stand out on the road.',
    variants: [
      { name: 'M', image: 'https://img.ridewill.it/public/athena/big/404557002_1.webp' },
      { name: 'L', image: 'https://img.ridewill.it/public/athena/big/404557002_2.webp' },
      { name: 'XL', image: 'https://img.ridewill.it/public/athena/big/404557002_1.webp' },
    ]
  },
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
