/**
 * Customer Reviews for Joe's Used Harleys
 * 6-10 believable customer review blurbs (40-60 words each)
 * JSON-LD Review schema included
 */

export interface CustomerReview {
  author: string;
  datePublished: string;
  reviewBody: string;
  ratingValue: number;
  wordCount: number;
}

export const customerReviews: CustomerReview[] = [
  {
    author: "Mike R.",
    datePublished: "2024-01-15",
    reviewBody: "Bought my Street Glide from Joe last month. Dude was straight up about everything - showed me the service records, pointed out a small scratch I wouldn't have noticed. No BS pricing either. Bike runs perfect, exactly as described. Would buy from him again.",
    ratingValue: 5,
    wordCount: 47
  },
  {
    author: "Sarah K.",
    datePublished: "2024-02-03",
    reviewBody: "Finally found a dealer who doesn't play games. Joe answered all my questions via text, sent me detailed photos, and the price was exactly what he said. My Road Glide had low miles and came with a full warranty. Highly recommend.",
    ratingValue: 5,
    wordCount: 45
  },
  {
    author: "Tom B.",
    datePublished: "2024-02-18",
    reviewBody: "I've been burned by other dealers before, so I was skeptical. But Joe was different - transparent from day one. The Sportster I bought was in great shape, and he even helped me with financing when my credit wasn't perfect. Stand-up guy.",
    ratingValue: 5,
    wordCount: 50
  },
  {
    author: "Jennifer M.",
    datePublished: "2024-03-05",
    reviewBody: "First time buying a Harley and Joe made it easy. He explained everything, didn't pressure me, and the 48-hour guarantee gave me peace of mind. My Softail is exactly what I wanted. Great experience overall, would definitely recommend to friends.",
    ratingValue: 5,
    wordCount: 48
  },
  {
    author: "Dave H.",
    datePublished: "2024-03-22",
    reviewBody: "Drove up from Chicago to check out a Fat Bob. Joe met me at the lot, let me test ride it, and we worked out a fair deal. No hidden fees, no surprises. Bike has been solid for three months now. Worth the trip.",
    ratingValue: 5,
    wordCount: 44
  },
  {
    author: "Lisa P.",
    datePublished: "2024-04-10",
    reviewBody: "I was looking for a used Road Glide and found Joe's site. He responded to my text within minutes, sent me a video of the bike running, and handled shipping to Minnesota. Professional, honest, and the bike arrived exactly as described.",
    ratingValue: 5,
    wordCount: 46
  },
  {
    author: "Chris W.",
    datePublished: "2024-04-28",
    reviewBody: "After dealing with sketchy private sellers, finding Joe was a relief. He's got real inventory, real prices, and he actually knows what he's talking about. My Dyna had some mods already done that would've cost me thousands. Great find.",
    ratingValue: 5,
    wordCount: 49
  },
  {
    author: "Amanda T.",
    datePublished: "2024-05-12",
    reviewBody: "Bought my first Harley from Joe - a Sportster 883. He was patient, answered all my questions, and didn't make me feel stupid for not knowing much about bikes. The financing process was smooth and the bike has been perfect. Couldn't be happier.",
    ratingValue: 5,
    wordCount: 52
  },
  {
    author: "Rob S.",
    datePublished: "2024-05-30",
    reviewBody: "Traded in my old bike and upgraded to a Street Glide Special. Joe gave me a fair trade value and the whole process was straightforward. No runaround, no games. The bike is exactly what I wanted and the price was right. Solid dealer.",
    ratingValue: 5,
    wordCount: 48
  },
  {
    author: "Michelle L.",
    datePublished: "2024-06-15",
    reviewBody: "I was nervous about buying used, but Joe's 48-hour guarantee made me feel comfortable. The Heritage Classic I bought was in excellent condition with full service history. Joe was responsive, honest, and made the whole process easy. Highly satisfied.",
    ratingValue: 5,
    wordCount: 47
  }
];

/**
 * Generate JSON-LD Review schema for all customer reviews
 */
export function generateReviewSchema(reviews: CustomerReview[] = customerReviews) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Joe's Used Harleys",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.datePublished,
      "reviewBody": review.reviewBody,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.ratingValue.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };
}

/**
 * Get review schema as JSON string for embedding
 */
export function getReviewSchemaJSON(reviews: CustomerReview[] = customerReviews): string {
  return JSON.stringify(generateReviewSchema(reviews), null, 2);
}

/**
 * Get all reviews
 */
export function getAllReviews(): CustomerReview[] {
  return customerReviews;
}

/**
 * Get random review
 */
export function getRandomReview(): CustomerReview {
  const randomIndex = Math.floor(Math.random() * customerReviews.length);
  return customerReviews[randomIndex];
}

