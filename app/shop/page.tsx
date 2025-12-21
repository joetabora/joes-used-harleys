'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';
import { products, type Product } from '@/lib/shop-products';

type CartItem = Product & {
  quantity: number;
  selectedVariant?: string;
};

export default function ShopPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'all' | 'clothing' | 'accessories' | 'parts'>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const addToCart = (product: Product, variant?: string) => {
    setCart(prevCart => {
      const cartKey = variant ? `${product.id}-${variant}` : product.id;
      const existingItem = prevCart.find(item => {
        const itemKey = item.selectedVariant ? `${item.id}-${item.selectedVariant}` : item.id;
        return itemKey === cartKey;
      });
      
      if (existingItem) {
        return prevCart.map(item => {
          const itemKey = item.selectedVariant ? `${item.id}-${item.selectedVariant}` : item.id;
          if (itemKey === cartKey) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }
      
      return [...prevCart, { ...product, quantity: 1, selectedVariant: variant }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCart(prevCart => prevCart.filter(item => {
      const itemKey = item.selectedVariant ? `${item.id}-${item.selectedVariant}` : item.id;
      const cartKey = variant ? `${productId}-${variant}` : productId;
      return itemKey !== cartKey;
    }));
  };

  const updateQuantity = (productId: string, quantity: number, variant?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item => {
        const itemKey = item.selectedVariant ? `${item.id}-${item.selectedVariant}` : item.id;
        const cartKey = variant ? `${productId}-${variant}` : productId;
        if (itemKey === cartKey) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      const { sessionId, url, error } = await response.json();

      if (error) {
        alert(`Error: ${error}`);
        setIsProcessing(false);
        return;
      }

      if (!sessionId && !url) {
        alert('Failed to create checkout session. Please try again.');
        setIsProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout URL (preferred method)
      if (url) {
        window.location.href = url;
        return;
      }

      // Fallback: use Stripe.js redirect with sessionId
      if (sessionId) {
        const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        
        if (!publishableKey) {
          alert('Stripe is not configured. Please contact support.');
          setIsProcessing(false);
          return;
        }

        // Initialize Stripe and redirect
        const stripe = await loadStripe(publishableKey);
        
        if (!stripe) {
          alert('Stripe failed to load. Please refresh the page.');
          setIsProcessing(false);
          return;
        }

        // Type assertion for redirectToCheckout
        const stripeWithRedirect = stripe as any;
        const { error: stripeError } = await stripeWithRedirect.redirectToCheckout({
          sessionId,
        });

        if (stripeError) {
          alert(`Stripe error: ${stripeError.message}`);
          setIsProcessing(false);
        }
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(`Failed to process checkout: ${error.message}`);
      setIsProcessing(false);
    }
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
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => router.push(`/shop/${product.id}`)}
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
                {/* Variant indicator */}
                {product.variants && product.variants.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(234, 88, 12, 0.9)',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-clash)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {product.variants.length} Colors
                  </div>
                )}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      if (product.variants && product.variants.length > 0) {
                        router.push(`/shop/${product.id}`);
                      } else {
                        addToCart(product);
                      }
                    }}
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
                    {product.variants && product.variants.length > 0 ? 'View Options' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Sidebar - Same as before but updated for variants */}
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
                  {cart.map(item => {
                    const itemKey = item.selectedVariant ? `${item.id}-${item.selectedVariant}` : item.id;
                    return (
                      <div
                        key={itemKey}
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
                            {item.selectedVariant && (
                              <span style={{ color: '#9ca3af', fontSize: '0.85rem', display: 'block', marginTop: '0.25rem' }}>
                                Color: {item.selectedVariant}
                              </span>
                            )}
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
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedVariant)}
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
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedVariant)}
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
                                onClick={() => removeFromCart(item.id, item.selectedVariant)}
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
                    );
                  })}
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
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  style={{
                    display: 'block',
                    width: '100%',
                    background: isProcessing 
                      ? 'rgba(234, 88, 12, 0.5)' 
                      : 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                    color: '#ffffff',
                    padding: '1.25rem',
                    fontSize: '1rem',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontFamily: 'var(--font-clash)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    boxShadow: isProcessing 
                      ? 'none' 
                      : '0 10px 30px rgba(234, 88, 12, 0.4)',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isProcessing) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(234, 88, 12, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isProcessing) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.4)';
                    }
                  }}
                >
                  {isProcessing ? '⏳ Processing...' : '💳 CHECKOUT WITH STRIPE'}
                </button>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  marginTop: '1rem',
                  lineHeight: '1.5'
                }}>
                  Free shipping on orders over $100. Secure checkout powered by Stripe.
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
          {/* Mobile Cart Button */}
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
