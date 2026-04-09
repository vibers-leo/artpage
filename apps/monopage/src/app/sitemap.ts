import type { MetadataRoute } from 'next';

const BASE_URL = 'https://monopage.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/onboard`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
