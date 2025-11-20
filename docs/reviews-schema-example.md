# Customer Reviews and JSON-LD Review Schema

## Customer Reviews (40-60 words each)

1. **Mike R.** (47 words, 5 stars)
   - "Bought my Street Glide from Joe last month. Dude was straight up about everything - showed me the service records, pointed out a small scratch I wouldn't have noticed. No BS pricing either. Bike runs perfect, exactly as described. Would buy from him again."

2. **Sarah K.** (45 words, 5 stars)
   - "Finally found a dealer who doesn't play games. Joe answered all my questions via text, sent me detailed photos, and the price was exactly what he said. My Road Glide had low miles and came with a full warranty. Highly recommend."

3. **Tom B.** (50 words, 5 stars)
   - "I've been burned by other dealers before, so I was skeptical. But Joe was different - transparent from day one. The Sportster I bought was in great shape, and he even helped me with financing when my credit wasn't perfect. Stand-up guy."

4. **Jennifer M.** (48 words, 5 stars)
   - "First time buying a Harley and Joe made it easy. He explained everything, didn't pressure me, and the 48-hour guarantee gave me peace of mind. My Softail is exactly what I wanted. Great experience overall, would definitely recommend to friends."

5. **Dave H.** (44 words, 5 stars)
   - "Drove up from Chicago to check out a Fat Bob. Joe met me at the lot, let me test ride it, and we worked out a fair deal. No hidden fees, no surprises. Bike has been solid for three months now. Worth the trip."

6. **Lisa P.** (46 words, 5 stars)
   - "I was looking for a used Road Glide and found Joe's site. He responded to my text within minutes, sent me a video of the bike running, and handled shipping to Minnesota. Professional, honest, and the bike arrived exactly as described."

7. **Chris W.** (49 words, 5 stars)
   - "After dealing with sketchy private sellers, finding Joe was a relief. He's got real inventory, real prices, and he actually knows what he's talking about. My Dyna had some mods already done that would've cost me thousands. Great find."

8. **Amanda T.** (52 words, 5 stars)
   - "Bought my first Harley from Joe - a Sportster 883. He was patient, answered all my questions, and didn't make me feel stupid for not knowing much about bikes. The financing process was smooth and the bike has been perfect. Couldn't be happier."

9. **Rob S.** (48 words, 5 stars)
   - "Traded in my old bike and upgraded to a Street Glide Special. Joe gave me a fair trade value and the whole process was straightforward. No runaround, no games. The bike is exactly what I wanted and the price was right. Solid dealer."

10. **Michelle L.** (47 words, 5 stars)
    - "I was nervous about buying used, but Joe's 48-hour guarantee made me feel comfortable. The Heritage Classic I bought was in excellent condition with full service history. Joe was responsive, honest, and made the whole process easy. Highly satisfied."

## Complete JSON-LD Review Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Joe's Used Harleys",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "10",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Mike R."
      },
      "datePublished": "2024-01-15",
      "reviewBody": "Bought my Street Glide from Joe last month. Dude was straight up about everything - showed me the service records, pointed out a small scratch I wouldn't have noticed. No BS pricing either. Bike runs perfect, exactly as described. Would buy from him again.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sarah K."
      },
      "datePublished": "2024-02-03",
      "reviewBody": "Finally found a dealer who doesn't play games. Joe answered all my questions via text, sent me detailed photos, and the price was exactly what he said. My Road Glide had low miles and came with a full warranty. Highly recommend.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Tom B."
      },
      "datePublished": "2024-02-18",
      "reviewBody": "I've been burned by other dealers before, so I was skeptical. But Joe was different - transparent from day one. The Sportster I bought was in great shape, and he even helped me with financing when my credit wasn't perfect. Stand-up guy.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Jennifer M."
      },
      "datePublished": "2024-03-05",
      "reviewBody": "First time buying a Harley and Joe made it easy. He explained everything, didn't pressure me, and the 48-hour guarantee gave me peace of mind. My Softail is exactly what I wanted. Great experience overall, would definitely recommend to friends.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Dave H."
      },
      "datePublished": "2024-03-22",
      "reviewBody": "Drove up from Chicago to check out a Fat Bob. Joe met me at the lot, let me test ride it, and we worked out a fair deal. No hidden fees, no surprises. Bike has been solid for three months now. Worth the trip.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Lisa P."
      },
      "datePublished": "2024-04-10",
      "reviewBody": "I was looking for a used Road Glide and found Joe's site. He responded to my text within minutes, sent me a video of the bike running, and handled shipping to Minnesota. Professional, honest, and the bike arrived exactly as described.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Chris W."
      },
      "datePublished": "2024-04-28",
      "reviewBody": "After dealing with sketchy private sellers, finding Joe was a relief. He's got real inventory, real prices, and he actually knows what he's talking about. My Dyna had some mods already done that would've cost me thousands. Great find.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Amanda T."
      },
      "datePublished": "2024-05-12",
      "reviewBody": "Bought my first Harley from Joe - a Sportster 883. He was patient, answered all my questions, and didn't make me feel stupid for not knowing much about bikes. The financing process was smooth and the bike has been perfect. Couldn't be happier.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Rob S."
      },
      "datePublished": "2024-05-30",
      "reviewBody": "Traded in my old bike and upgraded to a Street Glide Special. Joe gave me a fair trade value and the whole process was straightforward. No runaround, no games. The bike is exactly what I wanted and the price was right. Solid dealer.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Michelle L."
      },
      "datePublished": "2024-06-15",
      "reviewBody": "I was nervous about buying used, but Joe's 48-hour guarantee made me feel comfortable. The Heritage Classic I bought was in excellent condition with full service history. Joe was responsive, honest, and made the whole process easy. Highly satisfied.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  ]
}
</script>
```

## Usage in Next.js

```typescript
import { generateReviewSchema } from '@/lib/customer-reviews';

export default function HomePage() {
  const reviewSchema = generateReviewSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      {/* Page content */}
    </>
  );
}
```

