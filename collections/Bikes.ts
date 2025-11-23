import { CollectionConfig } from 'payload/types';

export const Bikes: CollectionConfig = {
  slug: 'bikes',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'year', 'model', 'price', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full bike name (e.g., "2023 Harley-Davidson Street Glide Special")',
      },
    },
    {
      name: 'year',
      type: 'number',
      required: true,
      admin: {
        description: 'Model year',
      },
    },
    {
      name: 'model',
      type: 'text',
      required: true,
      admin: {
        description: 'Bike model (e.g., "Street Glide Special", "Road Glide", "Fat Boy")',
      },
    },
    {
      name: 'mileage',
      type: 'number',
      admin: {
        description: 'Mileage in miles',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      admin: {
        description: 'Price in dollars (e.g., 26999)',
      },
    },
    {
      name: 'priceFormatted',
      type: 'text',
      required: true,
      admin: {
        description: 'Formatted price for display (e.g., "$26,999")',
      },
    },
    {
      name: 'specs',
      type: 'textarea',
      admin: {
        description: 'Bike specifications (e.g., "2023 Harley-Davidson Street Glide Special • 8,742 miles • Vivid Black • Stage 2")',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main bike image',
      },
    },
    {
      name: 'financing',
      type: 'text',
      admin: {
        description: 'Financing info (e.g., "As low as $399/mo")',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this bike on the homepage',
      },
    },
    {
      name: 'justArrived',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark as "Just Arrived"',
      },
    },
  ],
};

