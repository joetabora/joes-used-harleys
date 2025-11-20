/**
 * Sanity Studio Configuration
 * Configures Sanity Studio for Next.js app router
 */

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

// Check if we're in a browser environment for Sanity Studio
if (typeof window !== 'undefined') {
  // Client-side only code
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';

export default defineConfig({
  name: 'joes-used-harleys',
  title: "Joe's Used Harleys CMS",
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Motorcycles')
              .child(
                S.documentTypeList('motorcycle')
                  .title('Motorcycles')
                  .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Model Pages')
              .child(
                S.documentTypeList('modelPage')
                  .title('Model Pages')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),
            S.listItem()
              .title('Homepage Settings')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            S.listItem()
              .title('Global Settings')
              .child(
                S.document()
                  .schemaType('globalSettings')
                  .documentId('globalSettings')
              ),
            S.divider(),
            S.listItem()
              .title('All Documents')
              .child(
                S.documentTypeList('motorcycle')
                  .title('All Motorcycles')
              ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    productionUrl: async (prev, { document }: { document: any }) => {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://joes-used-harleys.vercel.app';
      
      if (document._type === 'motorcycle' && document.slug?.current) {
        return `${baseUrl}/bikes/${document.slug.current}`;
      }
      
      if (document._type === 'modelPage' && document.slug?.current) {
        return `${baseUrl}/models/${document.slug.current}`;
      }
      
      return prev;
    },
  },
});

