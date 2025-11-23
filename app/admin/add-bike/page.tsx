'use client';

import { useState } from 'react';

export default function AddBikePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    model: '',
    mileage: '',
    price: '',
    priceFormatted: '',
    specs: '',
    financing: '',
    featured: false,
    justArrived: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/bikes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add bike');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        year: '',
        model: '',
        mileage: '',
        price: '',
        priceFormatted: '',
        specs: '',
        financing: '',
        featured: false,
        justArrived: false,
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Auto-format price when price changes
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = e.target.value;
    setFormData(prev => ({
      ...prev,
      price: price,
      priceFormatted: price ? `$${parseInt(price).toLocaleString()}` : '',
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <h1 style={{
        fontFamily: 'Clash Display, sans-serif',
        fontSize: '2.5rem',
        color: '#FF6600',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        Add New Bike
      </h1>

      {success && (
        <div style={{
          background: '#10b981',
          color: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: '600',
        }}>
          ✅ Bike added successfully! It will appear on your site shortly.
        </div>
      )}

      {error && (
        <div style={{
          background: '#ef4444',
          color: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        background: '#1A1A1A',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #2A2A2A',
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#FF6600',
            fontWeight: '600',
          }}>
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., 2023 Harley-Davidson Street Glide Special"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#000',
              border: '1px solid #2A2A2A',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#FF6600',
              fontWeight: '600',
            }}>
              Year *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              placeholder="2023"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#000',
                border: '1px solid #2A2A2A',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#FF6600',
              fontWeight: '600',
            }}>
              Model *
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              placeholder="Street Glide Special"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#000',
                border: '1px solid #2A2A2A',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#FF6600',
              fontWeight: '600',
            }}>
              Mileage
            </label>
            <input
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="8742"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#000',
                border: '1px solid #2A2A2A',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#FF6600',
              fontWeight: '600',
            }}>
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handlePriceChange}
              required
              placeholder="26999"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#000',
                border: '1px solid #2A2A2A',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '1rem',
              }}
            />
            {formData.priceFormatted && (
              <p style={{ marginTop: '0.5rem', color: '#AAA', fontSize: '0.9rem' }}>
                Will display as: {formData.priceFormatted}
              </p>
            )}
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#FF6600',
            fontWeight: '600',
          }}>
            Specs
          </label>
          <textarea
            name="specs"
            value={formData.specs}
            onChange={handleChange}
            placeholder="2023 Harley-Davidson Street Glide Special • 8,742 miles • Vivid Black • Stage 2"
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#000',
              border: '1px solid #2A2A2A',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#FF6600',
            fontWeight: '600',
          }}>
            Financing
          </label>
          <input
            type="text"
            name="financing"
            value={formData.financing}
            onChange={handleChange}
            placeholder="As low as $399/mo"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#000',
              border: '1px solid #2A2A2A',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            color: '#fff',
          }}>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
            <span style={{ color: '#FF6600', fontWeight: '600' }}>Featured</span>
          </label>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            color: '#fff',
          }}>
            <input
              type="checkbox"
              name="justArrived"
              checked={formData.justArrived}
              onChange={handleChange}
              style={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            />
            <span style={{ color: '#FF6600', fontWeight: '600' }}>Just Arrived</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? '#666' : '#FF6600',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Adding Bike...' : 'Add Bike to Inventory'}
        </button>

        <p style={{
          marginTop: '1.5rem',
          color: '#AAA',
          fontSize: '0.9rem',
          textAlign: 'center',
        }}>
          Note: You'll need to add the image in Airtable after creating the bike.
        </p>
      </form>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        background: '#1A1A1A',
        borderRadius: '8px',
        border: '1px solid #2A2A2A',
      }}>
        <h3 style={{ color: '#FF6600', marginBottom: '0.5rem' }}>Quick Tips:</h3>
        <ul style={{ color: '#AAA', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>After adding the bike, go to Airtable to upload the image</li>
          <li>The bike will appear on your site within 60 seconds</li>
          <li>Use the "Featured" checkbox to highlight special bikes</li>
          <li>Use "Just Arrived" for new inventory</li>
        </ul>
      </div>
    </div>
  );
}

