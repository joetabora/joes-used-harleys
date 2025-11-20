/**
 * Sanity Studio Route
 * Embedded Sanity Studio for content management
 */

'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}

