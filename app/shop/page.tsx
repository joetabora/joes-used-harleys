'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';

// Product types
type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: 'clothing' | 'accessories' | 'parts';
};

type CartItem = Product & {
  quantity: number;
};

// Product data
const products: Product[] = [
  // Clothing
  { id: '1', title: 'Skull & Crossbones Tee', price: 39, image: 'https://files.catbox.moe/placeholder-clothing-1.jpg', category: 'clothing' },
  { id: '2', title: 'Harley Heritage Hoodie', price: 79, image: 'https://files.catbox.moe/placeholder-clothing-2.jpg', category: 'clothing' },
  { id: '3', title: 'Biker Denim Jacket', price: 149, image: 'https://files.catbox.moe/placeholder-clothing-3.jpg', category: 'clothing' },
  { id: '4', title: 'Rider Logo Tee', price: 29, image: 'https://files.catbox.moe/placeholder-clothing-4.jpg', category: 'clothing' },
  { id: '5', title: 'Punk Rock Hoodie', price: 69, image: 'https://files.catbox.moe/placeholder-clothing-5.jpg', category: 'clothing' },
  
  // Accessories
  { id: '6', title: 'Leather Riding Gloves', price: 49, image: 'https://files.catbox.moe/placeholder-accessories-1.jpg', category: 'accessories' },
  { id: '7', title: 'Biker Wallet Chain', price: 35, image: 'https://files.catbox.moe/placeholder-accessories-2.jpg', category: 'accessories' },
  { id: '8', title: 'Patched Vest', price: 89, image: 'https://files.catbox.moe/placeholder-accessories-3.jpg', category: 'accessories' },
  { id: '9', title: 'Skull Ring Set', price: 45, image: 'https://files.catbox.moe/placeholder-accessories-4.jpg', category: 'accessories' },
  { id: '10', title: 'Leather Belt Buckle', price: 39, image: 'https://files.catbox.moe/placeholder-accessories-5.jpg', category: 'accessories' },
  
  // Parts
  { id: '11', title: 'Chrome Handlebar Grips', price: 59, image: 'https://files.catbox.moe/placeholder-parts-1.jpg', category: 'parts' },
  { id: '12', title: 'Mirror Set - Chrome', price: 79, image: 'https://files.catbox.moe/placeholder-parts-2.jpg', category: 'parts' },
  { id: '13', title: 'Exhaust Tips - Black', price: 89, image: 'https://files.catbox.moe/placeholder-parts-3.jpg', category: 'parts' },
  { id: '14', title: 'Foot Pegs - Chrome', price: 65, image: 'https://files.catbox.moe/placeholder-parts-4.jpg', category: 'parts' },
  { id: '15', title: 'LED Turn Signals', price: 49, image: 'https://files.catbox.moe/placeholder-parts-5.jpg', category: 'parts' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'clothing' | 'accessories' | 'parts'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('juh-shop-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart from localStorage');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('juh-shop-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'parts', label: 'Parts' },
  ] as const;

  return (
    <>
      {/* SEO Structured Data */}
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section style={{
        padding: '12rem 2rem 6rem',
        background: 'linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #000000 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
        `}} />

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '2rem',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-2px',
            lineHeight: '1.1'
          }}>
            Joe's Shop – Biker Gear, Clothing & Parts
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            color: '#9ca3af',
            marginBottom: '2rem',
            lineHeight: '1.8',
            fontWeight: 500,
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            Hand-picked rider essentials. $499 ships bikes — free shipping on gear over $100. Text Joe 414-439-6211 for questions.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section style={{
        padding: '2rem 1.5rem',
        background: '#0a0a0a',
        borderBottom: '1px solid rgba(234, 88, 12, 0.2)',
        position: 'sticky',
        top: '80px',
        zIndex: 100,
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              style={{
                background: activeCategory === cat.id
                  ? 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                padding: '0.75rem 2rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                fontFamily: 'var(--font-clash)',
                border: activeCategory === cat.id
                  ? 'none'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.background = 'rgba(234, 88, 12, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(234, 88, 12, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section style={{
        padding: '4rem 1.5rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
        minHeight: '60vh'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(234, 88, 12, 0.4)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(234, 88, 12, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Product Image */}
              <div style={{
                width: '100%',
                height: '280px',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.9
                  }}
                  onError={(e) => {
                    // Fallback to placeholder if image fails
                    e.currentTarget.src = 'https://via.placeholder.com/400x400/1a1a1a/ea580c?text=' + encodeURIComponent(product.title);
                  }}
                />
                {/* Chrome accent overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(234, 88, 12, 0.6) 50%, transparent 100%)'
                }}></div>
              </div>

              {/* Product Info */}
              <div style={{
                padding: '1.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-clash)',
                  margin: 0,
                  lineHeight: '1.3'
                }}>
                  {product.title}
                </h3>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto'
                }}>
                  <span style={{
                    color: '#ea580c',
                    fontSize: '1.5rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-clash)'
                  }}>
                    ${product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                      color: '#ffffff',
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontFamily: 'var(--font-clash)',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 5px 20px rgba(234, 88, 12, 0.3)',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(234, 88, 12, 0.3)';
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              zIndex: 2000,
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => setIsCartOpen(false)}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            maxWidth: '420px',
            height: '100vh',
            background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
            borderLeft: '1px solid rgba(234, 88, 12, 0.3)',
            zIndex: 2001,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-10px 0 60px rgba(0, 0, 0, 0.8)',
            transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s ease'
          }}
          className="cart-sidebar"
          >
            <style dangerouslySetInnerHTML={{ __html: `
              @media (max-width: 768px) {
                .cart-sidebar {
                  max-width: 100% !important;
                  border-left: none !important;
                }
              }
            `}} />
            {/* Cart Header */}
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid rgba(234, 88, 12, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                color: '#ffffff',
                fontSize: '1.5rem',
                fontWeight: 900,
                fontFamily: 'var(--font-clash)',
                margin: 0
              }}>
                CART ({getCartItemCount()})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(234, 88, 12, 0.2)';
                  e.currentTarget.style.borderColor = '#ea580c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem'
            }}>
              {cart.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  color: '#9ca3af'
                }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    style={{
                      background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                      color: '#ffffff',
                      padding: '0.75rem 2rem',
                      fontSize: '0.9rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontFamily: 'var(--font-clash)',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: 'pointer'
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cart.map(item => (
                    <div
                      key={item.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'flex',
                        gap: '1rem'
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          background: '#1a1a1a'
                        }}
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/80x80/1a1a1a/ea580c?text=' + encodeURIComponent(item.title.substring(0, 2));
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          color: '#ffffff',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          margin: '0 0 0.5rem 0',
                          fontFamily: 'var(--font-clash)'
                        }}>
                          {item.title}
                        </h4>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '0.5rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              −
                            </button>
                            <span style={{ color: '#ffffff', minWidth: '30px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              +
                            </button>
                          </div>
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: '0.25rem'
                          }}>
                            <span style={{
                              color: '#ea580c',
                              fontSize: '1rem',
                              fontWeight: 700,
                              fontFamily: 'var(--font-clash)'
                            }}>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#9ca3af',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div style={{
                padding: '2rem',
                borderTop: '1px solid rgba(234, 88, 12, 0.2)',
                background: 'rgba(234, 88, 12, 0.05)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <span style={{
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-clash)'
                  }}>
                    TOTAL:
                  </span>
                  <span style={{
                    color: '#ea580c',
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-clash)'
                  }}>
                    ${getCartTotal().toFixed(2)}
                  </span>
                </div>
                <a
                  href={`sms:4144396211?body=Hey Joe! I want to order: ${cart.map(item => `${item.quantity}x ${item.title} ($${item.price})`).join(', ')}. Total: $${getCartTotal().toFixed(2)}`}
                  style={{
                    display: 'block',
                    background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                    color: '#ffffff',
                    padding: '1.25rem',
                    fontSize: '1rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-clash)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(234, 88, 12, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.4)';
                  }}
                >
                  💬 TEXT JOE TO ORDER
                </a>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  marginTop: '1rem',
                  lineHeight: '1.5'
                }}>
                  Free shipping on orders over $100. Manual fulfillment via text.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Cart Button (Floating) */}
      {cart.length > 0 && !isCartOpen && (
        <>
          <style dangerouslySetInnerHTML={{ __html: `
            @media (max-width: 768px) {
              .cart-btn-desktop {
                display: none !important;
              }
              .cart-btn-mobile {
                display: flex !important;
              }
            }
            @media (min-width: 769px) {
              .cart-btn-desktop {
                display: flex !important;
              }
              .cart-btn-mobile {
                display: none !important;
              }
            }
          `}} />
          {/* Desktop Cart Button */}
          <button
            className="cart-btn-desktop"
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'fixed',
              bottom: '120px',
              right: '2rem',
              zIndex: 998,
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              color: '#ffffff',
              padding: '1rem 2rem',
              fontSize: '0.9rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontFamily: 'var(--font-clash)',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(234, 88, 12, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 50px rgba(234, 88, 12, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(234, 88, 12, 0.5)';
            }}
          >
            <span>🛒</span>
            <span>CART ({getCartItemCount()})</span>
            <span style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.85rem'
            }}>
              ${getCartTotal().toFixed(2)}
            </span>
          </button>
          {/* Mobile Cart Button - in sticky bar area */}
          <button
            className="cart-btn-mobile"
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'fixed',
              bottom: '80px',
              left: '1rem',
              right: '1rem',
              zIndex: 998,
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              color: '#ffffff',
              padding: '1rem',
              fontSize: '0.9rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontFamily: 'var(--font-clash)',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              boxShadow: '0 10px 40px rgba(234, 88, 12, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease'
            }}
          >
            <span>🛒</span>
            <span>CART ({getCartItemCount()}) - ${getCartTotal().toFixed(2)}</span>
          </button>
        </>
      )}

      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </>
  );
}
