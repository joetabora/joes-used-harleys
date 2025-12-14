'use client';

import { useState } from 'react';

export const BLOG_CATEGORIES = ['Shipping', 'Models', 'Beginners', 'Engines', 'Wisconsin'] as const;
export type BlogCategory = typeof BLOG_CATEGORIES[number];

interface BlogFilterProps {
  categories: BlogCategory[];
  selectedCategory: BlogCategory | null;
  onCategoryChange: (category: BlogCategory | null) => void;
}

export function BlogFilter({ categories, selectedCategory, onCategoryChange }: BlogFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      background: '#000000',
      border: '2px solid #1A1A1A',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '2rem'
    }}>
      {/* Mobile: Collapsible Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          background: 'transparent',
          border: 'none',
          color: '#FF6600',
          fontSize: '1.1rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          cursor: 'pointer',
          padding: '0.5rem 0',
          fontFamily: 'var(--font-clash)'
        }}
        className="filter-toggle"
        aria-expanded={isOpen}
        aria-label="Toggle filter categories"
      >
        <span>Filter by Category</span>
        <span style={{
          fontSize: '1.5rem',
          transition: 'transform 0.3s',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
          ▼
        </span>
      </button>

      {/* Categories List */}
      <div
        style={{
          display: isOpen ? 'flex' : 'none',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #2A2A2A'
        }}
        className="filter-categories"
      >
        <button
          onClick={() => onCategoryChange(null)}
          style={{
            padding: '0.75rem 1.5rem',
            background: selectedCategory === null ? '#FF6600' : '#0A0A0A',
            color: selectedCategory === null ? '#000000' : '#FFFFFF',
            border: selectedCategory === null ? '2px solid #FF6600' : '2px solid #1A1A1A',
            fontWeight: 800,
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-clash)',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            if (selectedCategory !== null) {
              e.currentTarget.style.borderColor = '#FF6600';
              e.currentTarget.style.color = '#FF6600';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedCategory !== null) {
              e.currentTarget.style.borderColor = '#1A1A1A';
              e.currentTarget.style.color = '#FFFFFF';
            }
          }}
        >
          ALL POSTS
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            style={{
              padding: '0.75rem 1.5rem',
              background: selectedCategory === category ? '#FF6600' : '#0A0A0A',
              color: selectedCategory === category ? '#000000' : '#FFFFFF',
              border: selectedCategory === category ? '2px solid #FF6600' : '2px solid #1A1A1A',
              fontWeight: 800,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-clash)',
              borderRadius: '8px'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.borderColor = '#FF6600';
                e.currentTarget.style.color = '#FF6600';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== category) {
                e.currentTarget.style.borderColor = '#1A1A1A';
                e.currentTarget.style.color = '#FFFFFF';
              }
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 769px) {
          .filter-toggle {
            display: none !important;
          }
          .filter-categories {
            display: flex !important;
          }
        }
      `}} />
    </div>
  );
}

