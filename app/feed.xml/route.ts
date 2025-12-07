import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog-data';
import { SITE_CONFIG } from '@/lib/seo';

export async function GET() {
  const posts = getAllBlogPosts();
  const baseUrl = SITE_CONFIG.url;

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Joe's Used Harleys Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Expert guides on buying used Harley-Davidson motorcycles. Shipping costs, model comparisons, buyer tips, and more.</description>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>joe@joesusedharleys.com (Joe Tabora)</author>
      <enclosure url="${post.featuredImage}" type="image/jpeg" />
      <image>
        <url>${post.featuredImage}</url>
        <title>${post.title}</title>
        <link>${baseUrl}/blog/${post.slug}</link>
      </image>
    </item>
    `).join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

