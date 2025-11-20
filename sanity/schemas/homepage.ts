/**
 * Homepage Settings Schema for Sanity CMS
 * Controls homepage content and featured bikes
 */

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main hero headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Hero subheadline text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero Video URL',
      type: 'url',
      description: 'Optional video URL for hero background',
    }),
    defineField({
      name: 'featuredBikes',
      title: 'Featured Bikes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'motorcycle' }] }],
      description: 'Motorcycles to feature on homepage',
    }),
    defineField({
      name: 'introContent',
      title: 'Introduction Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'SEO-optimized intro section (300-500 words)',
    }),
    defineField({
      name: 'trustContent',
      title: 'Trust Section Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Why Buy From Joe section content',
    }),
    // SEO Fields
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom SEO title (optional)',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Custom SEO description (optional)',
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
    prepare() {
      return {
        title: 'Homepage Settings',
      };
    },
  },
});

