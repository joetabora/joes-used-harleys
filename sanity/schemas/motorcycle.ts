/**
 * Motorcycle Schema for Sanity CMS
 * Main schema for individual motorcycle listings
 */

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'motorcycle',
  title: 'Motorcycle',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Full bike name (e.g., "2023 Street Glide Special")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'model',
      title: 'Model',
      type: 'string',
      description: 'Harley-Davidson model (e.g., Street Glide, Road Glide)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2000).max(2030),
    }),
    defineField({
      name: 'mileage',
      title: 'Mileage',
      type: 'number',
      description: 'Mileage in miles',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in USD',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'priceFormatted',
      title: 'Formatted Price',
      type: 'string',
      description: 'Display price (e.g., "$21,999")',
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          { title: 'Excellent', value: 'excellent' },
          { title: 'Very Good', value: 'very-good' },
          { title: 'Good', value: 'good' },
          { title: 'Fair', value: 'fair' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Full description of the motorcycle',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of features and modifications',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'object',
      fields: [
        { name: 'engine', type: 'string' },
        { name: 'displacement', type: 'string' },
        { name: 'torque', type: 'string' },
        { name: 'fuelCapacity', type: 'string' },
        { name: 'seatHeight', type: 'string' },
        { name: 'weight', type: 'string' },
        { name: 'transmission', type: 'string' },
        { name: 'wheelbase', type: 'string' },
      ],
    }),
    defineField({
      name: 'financing',
      title: 'Financing Info',
      type: 'string',
      description: 'Financing details (e.g., "As low as $299/month")',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this bike as featured on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'justArrived',
      title: 'Just Arrived',
      type: 'boolean',
      description: 'Mark as newly arrived',
      initialValue: false,
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom SEO title (optional, auto-generated if empty)',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Custom SEO description (optional, auto-generated if empty)',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Additional SEO keywords',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      model: 'model',
      year: 'year',
      price: 'priceFormatted',
      media: 'images.0',
    },
    prepare({ title, model, year, price, media }) {
      return {
        title: title || `${year} ${model}`,
        subtitle: price || 'Price TBD',
        media,
      };
    },
  },
});

