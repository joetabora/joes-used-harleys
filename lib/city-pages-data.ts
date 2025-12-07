/**
 * City-specific data for dedicated city landing pages
 * Used for SEO-optimized individual city pages
 */

export interface CityPageData {
  name: string;
  slug: string;
  state: string;
  stateAbbr: string;
  content: string; // 300-400 words about shipping to this city
  exampleBikes: Array<{
    year: string;
    name: string;
    price: string;
    miles: string;
    image: string;
    specs: string;
    modelSlug: string; // For internal linking
  }>;
}

export const cityPagesData: { [key: string]: CityPageData } = {
  'chicago': {
    name: 'Chicago',
    slug: 'chicago',
    state: 'Illinois',
    stateAbbr: 'IL',
    content: `When you're looking for used Harleys in Chicago, you're looking at one of the biggest motorcycle markets in the Midwest. But here's the thing – Chicago dealers charge premium prices, and their inventory moves fast. That's why smart Chicago riders ship from Milwaukee. We're just 90 miles north, but our prices are better, our selection is bigger, and we ship to Chicago for only $499.

Chicago streets are tough on bikes – potholes, traffic, salt in the winter. Every used Harley we ship to Chicago has been inspected for frame integrity, engine compression, and electrical systems. We know what Chicago riders need – bikes that can handle city traffic, highway miles, and everything in between. Whether you're cruising Lake Shore Drive or heading out to the suburbs, we've got the bike.

Shipping from Milwaukee to Chicago takes 2-3 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Chicago riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Street Glide',
        price: '$21,500',
        miles: '8,900',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 107 • Vivid Black • Tour-Pak • Highway Pegs',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide',
        price: '$22,000',
        miles: '7,200',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 107 • Vivid Black • Tour-Pak • Highway Pegs',
        modelSlug: 'road-glide'
      }
    ]
  },
  'madison': {
    name: 'Madison',
    slug: 'madison',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    content: `Madison riders know Wisconsin roads – smooth highways, scenic back roads, and everything in between. When you're looking for used Harleys in Madison, you want a bike that's been proven on Wisconsin roads, maintained properly, and priced fair. That's what we deliver from Milwaukee.

We're just 80 miles east of Madison, so shipping is fast and affordable. Most bikes arrive in 1-2 days. Every used Harley we ship to Madison comes with complete service history, Carfax, and our 48-hour guarantee. We check every bike – engine compression, transmission smoothness, frame integrity. These bikes are ready to ride, not projects.

Madison's mix of city streets and country roads is perfect for touring bikes like the Street Glide and Road Glide. We've got plenty of both, plus cruisers, sport bikes, and everything in between. Whether you're commuting to campus or exploring Wisconsin's back roads, we've got the bike.

Shipping from Milwaukee to Madison is simple – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees. Just honest pricing and bikes that are ready to ride. Madison riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic',
        price: '$19,500',
        miles: '7,800',
        image: 'https://files.catbox.moe/9t6u8x.jpg',
        specs: 'Milwaukee-Eight 107 • Billiard Red • Custom Paint • Tour-Pak',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  },
  'minneapolis': {
    name: 'Minneapolis',
    slug: 'minneapolis',
    state: 'Minnesota',
    stateAbbr: 'MN',
    content: `Minneapolis riders know quality when they see it. When you're looking for used Harleys in Minneapolis, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 330 miles southeast, but our prices are better, our selection is bigger, and we ship to Minneapolis for only $499.

Minnesota roads are tough – cold winters, salt, temperature swings. Every used Harley we ship to Minneapolis has been inspected for frame integrity, engine compression, and electrical systems. We know what Minneapolis riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to Minneapolis takes 3-5 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Minneapolis riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  },
  'detroit': {
    name: 'Detroit',
    slug: 'detroit',
    state: 'Michigan',
    stateAbbr: 'MI',
    content: `Detroit is motorcycle country – home of the Motor City, birthplace of American muscle. When you're looking for used Harleys in Detroit, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 380 miles west, but our prices are better, our selection is bigger, and we ship to Detroit for only $499.

Michigan roads are tough – potholes, salt, temperature swings. Every used Harley we ship to Detroit has been inspected for frame integrity, engine compression, and electrical systems. We know what Detroit riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to Detroit takes 3-5 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Detroit riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  },
  'indianapolis': {
    name: 'Indianapolis',
    slug: 'indianapolis',
    state: 'Indiana',
    stateAbbr: 'IN',
    content: `Indianapolis riders know the value of a good deal. When you're looking for used Harleys in Indianapolis, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 280 miles north, but our prices are better, our selection is bigger, and we ship to Indianapolis for only $499.

Indiana roads are smooth, but winters are tough. Every used Harley we ship to Indianapolis has been inspected for frame integrity, engine compression, and electrical systems. We know what Indianapolis riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to Indianapolis takes 2-4 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Indianapolis riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  },
  'st-louis': {
    name: 'St. Louis',
    slug: 'st-louis',
    state: 'Missouri',
    stateAbbr: 'MO',
    content: `St. Louis riders know a good deal when they see it. When you're looking for used Harleys in St. Louis, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 350 miles northeast, but our prices are better, our selection is bigger, and we ship to St. Louis for only $499.

Missouri roads are smooth, but weather can be unpredictable. Every used Harley we ship to St. Louis has been inspected for frame integrity, engine compression, and electrical systems. We know what St. Louis riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to St. Louis takes 3-5 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

St. Louis riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  },
  'cleveland': {
    name: 'Cleveland',
    slug: 'cleveland',
    state: 'Ohio',
    stateAbbr: 'OH',
    content: `Cleveland riders know quality when they see it. When you're looking for used Harleys in Cleveland, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 400 miles west, but our prices are better, our selection is bigger, and we ship to Cleveland for only $499.

Ohio roads are smooth, but winters are tough. Every used Harley we ship to Cleveland has been inspected for frame integrity, engine compression, and electrical systems. We know what Cleveland riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to Cleveland takes 3-5 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Cleveland riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  },
  'green-bay': {
    name: 'Green Bay',
    slug: 'green-bay',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    content: `Green Bay riders know Wisconsin roads – smooth highways, scenic back roads, and everything in between. When you're looking for used Harleys in Green Bay, you want a bike that's been proven on Wisconsin roads, maintained properly, and priced fair. That's what we deliver from Milwaukee.

We're just 115 miles south of Green Bay, so shipping is fast and affordable. Most bikes arrive in 1-2 days. Every used Harley we ship to Green Bay comes with complete service history, Carfax, and our 48-hour guarantee. We check every bike – engine compression, transmission smoothness, frame integrity. These bikes are ready to ride, not projects.

Green Bay's mix of city streets and country roads is perfect for touring bikes like the Street Glide and Road Glide. We've got plenty of both, plus cruisers, sport bikes, and everything in between. Whether you're commuting to work or exploring Wisconsin's back roads, we've got the bike.

Shipping from Milwaukee to Green Bay is simple – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees. Just honest pricing and bikes that are ready to ride. Green Bay riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic',
        price: '$19,500',
        miles: '7,800',
        image: 'https://files.catbox.moe/9t6u8x.jpg',
        specs: 'Milwaukee-Eight 107 • Billiard Red • Custom Paint • Tour-Pak',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  },
  'des-moines': {
    name: 'Des Moines',
    slug: 'des-moines',
    state: 'Iowa',
    stateAbbr: 'IA',
    content: `Des Moines riders know a good deal when they see it. When you're looking for used Harleys in Des Moines, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 330 miles east, but our prices are better, our selection is bigger, and we ship to Des Moines for only $499.

Iowa roads are smooth, but weather can be unpredictable. Every used Harley we ship to Des Moines has been inspected for frame integrity, engine compression, and electrical systems. We know what Des Moines riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to Des Moines takes 3-5 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Des Moines riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  },
  'milwaukee': {
    name: 'Milwaukee',
    slug: 'milwaukee',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    content: `Milwaukee is home. When you're looking for used Harleys in Milwaukee, you're looking at the best selection, the best prices, and the best service in Wisconsin. We're located right here in Milwaukee at House Of Harley, so you can come see the bikes in person or we'll deliver to your door.

Milwaukee roads are tough – potholes, salt, temperature swings. Every used Harley we sell in Milwaukee has been inspected for frame integrity, engine compression, and electrical systems. We know what Milwaukee riders need – bikes that can handle city traffic, highway miles, and everything in between.

Whether you're cruising Lake Michigan, exploring Wisconsin's back roads, or commuting to work, we've got the bike. Every used Harley we sell in Milwaukee comes with complete service history, Carfax, and our 48-hour guarantee. We check every bike – engine compression, transmission smoothness, frame integrity. These bikes are ready to ride, not projects.

Milwaukee riders consistently choose us because we're local, we're transparent, and we stand behind every bike. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio',
        modelSlug: 'street-glide'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio',
        modelSlug: 'road-glide'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'fat-boy'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome',
        modelSlug: 'heritage-classic'
      },
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust',
        modelSlug: 'low-rider-s'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust',
        modelSlug: 'breakout'
      }
    ]
  }
};

export function getCityPageData(slug: string): CityPageData | null {
  return cityPagesData[slug.toLowerCase()] || null;
}

export function getAllCityPageSlugs(): string[] {
  return Object.keys(cityPagesData);
}

