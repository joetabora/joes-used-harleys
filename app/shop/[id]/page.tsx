'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { SEO } from '@/components/SEO';
import { getProductById, type Product } from '@/lib/shop-products';

type CartItem = Product & {
  quantity: number;
  selectedVariant?: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const product = getProductById(productId);
  
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0].name : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
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

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('juh-shop-cart', JSON.stringify(cart));
  }, [cart]);

  // Set default variant on product load
  useEffect(() => {
    if (product?.variants && product.variants.length > 0 && !selectedVariant) {
      setSelectedVariant(product.variants[0].name);
    }
  }, [product, selectedVariant]);

  if (!product) {
    return (
      <>
        <Navigation />
        <div style={{
          padding: '12rem 2rem',
          textAlign: 'center',
          background: '#000000',
          minHeight: '100vh'
        }}>
          <h1 style={{ color: '#ffffff', fontSize: '2rem', marginBottom: '1rem' }}>Product Not Found</h1>
          <Link href="/shop" style={{
            color: '#ea580c',
            textDecoration: 'none',
            fontSize: '1.1rem'
          }}>
            ← Back to Shop
          </Link>
        </div>
      </>
    );
  }

  const currentImage = selectedVariant 
    ? product.variants?.find(v => v.name === selectedVariant)?.image || product.image
    : product.image;

  const addToCart = () => {
    setCart(prevCart => {
      const cartKey = selectedVariant ? `${product.id}-${selectedVariant}` : product.id;
      const existingItem = prevCart.find(item => {
        const itemKey = item.selectedVariant ? `${item.id}-${item.selectedVariant}` : item.id;
        return itemKey === cartKey;
      });
      
      if (existingItem) {
        return prevCart.map(item => {
          const itemKey = item.selectedVariant ? `${item.id}-${item.selectedVariant}` : item.id;
          if (itemKey === cartKey) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
      }
      
      return [...prevCart, { ...product, quantity, selectedVariant, image: currentImage }];
    });
    setIsCartOpen(true);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <>
      <SEO type="website" includeLocalBusiness={true} includeOrganization={true} />
      <Navigation />

      {/* Breadcrumb */}
      <section style={{
        padding: '8rem 2rem 2rem',
        background: '#000000',
        borderBottom: '1px solid rgba(234, 88, 12, 0.2)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          color: '#9ca3af',
          fontSize: '0.9rem'
        }}>
          <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
          <span>→</span>
          <Link href="/shop" style={{ color: '#9ca3af', textDecoration: 'none' }}>Shop</Link>
          <span>→</span>
          <span style={{ color: '#ea580c' }}>{product.title}</span>
        </div>
      </section>

      {/* Product Detail */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
        minHeight: '80vh'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}
        className="product-detail-grid"
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @media (max-width: 968px) {
              .product-detail-grid {
                grid-template-columns: 1fr !important;
              }
            }
          `}} />

          {/* Product Image */}
          <div style={{
            position: 'sticky',
            top: '120px'
          }}>
            <div style={{
              width: '100%',
              aspectRatio: '1',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative'
            }}>
              <img
                src={currentImage}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/600x600/1a1a1a/ea580c?text=' + encodeURIComponent(product.title);
                }}
              />
              {/* Chrome accent */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(234, 88, 12, 0.8) 50%, transparent 100%)'
              }}></div>
            </div>

            {/* Variant Thumbnails */}
            {product.variants && product.variants.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1.5rem',
                flexWrap: 'wrap'
              }}>
                {product.variants.map(variant => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariant(variant.name)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selectedVariant === variant.name
                        ? '3px solid #ea580c'
                        : '1px solid rgba(255, 255, 255, 0.2)',
                      background: '#1a1a1a',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedVariant !== variant.name) {
                        e.currentTarget.style.borderColor = 'rgba(234, 88, 12, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedVariant !== variant.name) {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      }
                    }}
                  >
                    <img
                      src={variant.image}
                      alt={variant.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'var(--font-clash)',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {product.title}
            </h1>

            <div style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              color: '#ea580c',
              fontFamily: 'var(--font-clash)',
              marginBottom: '2rem'
            }}>
              ${product.price}
            </div>

            {/* Description */}
            {product.description && (
              <div style={{
                color: '#9ca3af',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                marginBottom: '2.5rem',
                paddingBottom: '2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {product.description}
              </div>
            )}

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-clash)',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Select Color:
                </label>
                <select
                  value={selectedVariant || ''}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-clash)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#ea580c';
                    e.currentTarget.style.background = 'rgba(234, 88, 12, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  {product.variants.map(variant => (
                    <option key={variant.name} value={variant.name} style={{ background: '#1a1a1a', color: '#ffffff' }}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 700,
                fontFamily: 'var(--font-clash)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Quantity:
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                width: 'fit-content'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
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
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  −
                </button>
                <span style={{
                  color: '#ffffff',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-clash)',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
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
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={addToCart}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                color: '#ffffff',
                padding: '1.5rem 3rem',
                fontSize: '1.1rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: 'var(--font-clash)',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(234, 88, 12, 0.4)',
                transition: 'all 0.3s ease',
                marginBottom: '1.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(234, 88, 12, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(234, 88, 12, 0.4)';
              }}
            >
              Add to Cart
            </button>

            {/* Shipping Info */}
            <div style={{
              background: 'rgba(234, 88, 12, 0.05)',
              border: '1px solid rgba(234, 88, 12, 0.2)',
              borderRadius: '12px',
              padding: '1.5rem',
              color: '#9ca3af',
              fontSize: '0.9rem',
              lineHeight: '1.6'
            }}>
              <p style={{ margin: 0, marginBottom: '0.5rem' }}>
                <strong style={{ color: '#ea580c' }}>Free shipping</strong> on orders over $100
              </p>
              <p style={{ margin: 0 }}>
                Text Joe at <strong style={{ color: '#ffffff' }}>414-439-6211</strong> for questions or custom orders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar - Simplified version */}
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
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
            border: '1px solid rgba(234, 88, 12, 0.3)',
            borderRadius: '16px',
            padding: '2rem',
            zIndex: 2001,
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
          }}>
            <h3 style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              fontWeight: 900,
              fontFamily: 'var(--font-clash)',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Added to Cart!
            </h3>
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-clash)',
                  fontWeight: 700
                }}
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push('/shop')}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-clash)',
                  fontWeight: 900,
                  textTransform: 'uppercase'
                }}
              >
                View Cart
              </button>
            </div>
          </div>
        </>
      )}

      <FloatingActionButtons />
    </>
  );
}
