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
  // Clothing
  { 
    id: '1', 
    title: 'Skull & Crossbones Tee', 
    price: 39, 
    image: 'https://files.catbox.moe/placeholder-clothing-1.jpg', 
    category: 'clothing',
    description: 'Badass skull and crossbones design on premium cotton tee. Perfect for riders who want to show their edge. Available in multiple sizes.'
  },
  { 
    id: '2', 
    title: 'Harley Heritage Hoodie', 
    price: 79, 
    image: 'https://files.catbox.moe/placeholder-clothing-2.jpg', 
    category: 'clothing',
    description: 'Classic Harley-Davidson heritage design on a comfortable, warm hoodie. Built for long rides and cold weather.'
  },
  { 
    id: '3', 
    title: 'Biker Denim Jacket', 
    price: 149, 
    image: 'https://files.catbox.moe/placeholder-clothing-3.jpg', 
    category: 'clothing',
    description: 'Authentic biker-style denim jacket with premium construction. Durable, stylish, and built to last.'
  },
  { 
    id: '4', 
    title: 'Rider Logo Tee', 
    price: 29, 
    image: 'https://files.catbox.moe/placeholder-clothing-4.jpg', 
    category: 'clothing',
    description: 'Simple, classic rider logo tee. Comfortable cotton blend perfect for everyday wear.'
  },
  { 
    id: '5', 
    title: 'Punk Rock Hoodie', 
    price: 69, 
    image: 'https://files.catbox.moe/placeholder-clothing-5.jpg', 
    category: 'clothing',
    description: 'Punk-inspired design on a premium hoodie. Stand out from the crowd with this bold statement piece.'
  },
  
  // Accessories
  { 
    id: '6', 
    title: 'Leather Riding Gloves', 
    price: 49, 
    image: 'https://files.catbox.moe/placeholder-accessories-1.jpg', 
    category: 'accessories',
    description: 'Premium leather riding gloves with reinforced palms. Protection and style for every ride.'
  },
  { 
    id: '7', 
    title: 'Biker Wallet Chain', 
    price: 35, 
    image: 'https://files.catbox.moe/placeholder-accessories-2.jpg', 
    category: 'accessories',
    description: 'Classic biker wallet chain. Heavy-duty construction with secure attachment. Essential biker accessory.'
  },
  { 
    id: '8', 
    title: 'Patched Vest', 
    price: 89, 
    image: 'https://files.catbox.moe/placeholder-accessories-3.jpg', 
    category: 'accessories',
    description: 'Custom patched vest ready for your patches. Show your club, your style, your story.'
  },
  { 
    id: '9', 
    title: 'Skull Ring Set', 
    price: 45, 
    image: 'https://files.catbox.moe/placeholder-accessories-4.jpg', 
    category: 'accessories',
    description: 'Set of skull-themed rings. Mix and match to create your perfect biker look.'
  },
  { 
    id: '10', 
    title: 'Leather Belt Buckle', 
    price: 39, 
    image: 'https://files.catbox.moe/placeholder-accessories-5.jpg', 
    category: 'accessories',
    description: 'Heavy-duty leather belt with custom buckle. Classic biker style that never goes out of fashion.'
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
  
  // Wind Breaker Skull Face Mask - Combined with color variants
  { 
    id: '16', 
    title: 'Wind Breaker Skull Face Mask', 
    price: 25, 
    image: 'https://bikerforward.com/cdn/shop/products/BF60019-BeigeRainbow_b122189d-e38c-4868-ab19-6b41cea454d5_1800x1800.jpg?v=1658810713', 
    category: 'accessories',
    description: 'Windproof skull face mask perfect for riding, outdoor sports, and protection from dust and wind. Made with breathable material that keeps you comfortable. Features a badass skull design that shows your style. Available in 8 color variations to match your gear.',
    variants: [
      { name: 'Khaki Red Lenses', image: 'https://bikerforward.com/cdn/shop/products/BF60019-BeigeRainbow_b122189d-e38c-4868-ab19-6b41cea454d5_1800x1800.jpg?v=1658810713' },
      { name: 'Black Gray Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN014CFzlN1yYGlkt7chu__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
      { name: 'Green Gray Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN01c7zhjN1yYGlcqfU6y__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
      { name: 'Black Color Lenses', image: 'https://bikerforward.com/cdn/shop/products/2-1_1800x1800.png?v=1658810701' },
      { name: 'Green Color Lenses', image: 'https://bikerforward.com/cdn/shop/products/BF60019-GreenRainbow_c1f36dab-76e2-4868-ab19-6b41cea454d5_1800x1800.jpg?v=1658810713' },
      { name: 'Black Red Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN014EQpek1yYGlkt7chu__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
      { name: 'Khaki Color Lenses', image: 'https://bikerforward.com/cdn/shop/products/BF60019-BeigeRainbow_b122189d-e38c-46e5-8417-5f456e1010bc_1800x1800.jpg?v=1658810713' },
      { name: 'Khaki Grey Lenses', image: 'https://bikerforward.com/cdn/shop/products/O1CN017A5E5L1yYGlgHnxc8__2211604466590-0-cib_1800x1800.jpg?v=1658810713' },
    ]
  },
  
  // Parts
  { 
    id: '11', 
    title: 'Chrome Handlebar Grips', 
    price: 59, 
    image: 'https://files.catbox.moe/placeholder-parts-1.jpg', 
    category: 'parts',
    description: 'Premium chrome handlebar grips for better control and style. Easy installation, universal fit.'
  },
  { 
    id: '12', 
    title: 'Mirror Set - Chrome', 
    price: 79, 
    image: 'https://files.catbox.moe/placeholder-parts-2.jpg', 
    category: 'parts',
    description: 'Chrome mirror set with wide-angle view. Enhances safety and adds classic chrome style to your ride.'
  },
  { 
    id: '13', 
    title: 'Exhaust Tips - Black', 
    price: 89, 
    image: 'https://files.catbox.moe/placeholder-parts-3.jpg', 
    category: 'parts',
    description: 'Black exhaust tips for a meaner look. Easy bolt-on installation, no welding required.'
  },
  { 
    id: '14', 
    title: 'Foot Pegs - Chrome', 
    price: 65, 
    image: 'https://files.catbox.moe/placeholder-parts-4.jpg', 
    category: 'parts',
    description: 'Chrome foot pegs for better grip and style. Universal fit, easy installation.'
  },
  { 
    id: '15', 
    title: 'LED Turn Signals', 
    price: 49, 
    image: 'https://files.catbox.moe/placeholder-parts-5.jpg', 
    category: 'parts',
    description: 'Bright LED turn signals for improved visibility and safety. Plug-and-play installation.'
  },
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}
