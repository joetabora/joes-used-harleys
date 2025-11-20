/**
 * Model Page Schema for Sanity CMS
 * SEO landing pages for specific Harley models
 */

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'modelPage',
  title: 'Model Page',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Model Name',
      type: 'string',
      description: 'Harley-Davidson model name (e.g., Street Glide, Road Glide)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Main content for the model page (300-500 words)',
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
      name: 'startingPrice',
      title: 'Starting Price',
      type: 'string',
      description: 'Starting price (e.g., "$21,999")',
    }),
    defineField({
      name: 'financingInfo',
      title: 'Financing Information',
      type: 'text',
      description: 'Financing details for this model',
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
      title: 'name',
      media: 'heroImage',
    },
  },
});

