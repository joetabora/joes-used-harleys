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

// Shared bike inventory for all cities
const sharedBikes = [
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
];

export const cityPagesData: { [key: string]: CityPageData } = {
  'los-angeles': {
    name: 'Los Angeles',
    slug: 'los-angeles',
    state: 'California',
    stateAbbr: 'CA',
    content: `When you're looking for used Harleys in Los Angeles, you're dealing with one of the most expensive motorcycle markets in the country. LA dealers charge premium prices, and their inventory is limited. That's why smart Los Angeles riders ship from Milwaukee. We're 2,000 miles away, but our prices are better, our selection is bigger, and we ship to Los Angeles for only $499.

Los Angeles weather is perfect for year-round riding – no salt, no snow, just endless sunshine. Every used Harley we ship to LA has been inspected for frame integrity, engine compression, and electrical systems. We know what LA riders need – bikes that can handle freeway traffic, canyon roads, and everything in between. Whether you're cruising the Pacific Coast Highway or navigating city streets, we've got the bike.

Shipping from Milwaukee to Los Angeles takes 5-7 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Los Angeles riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'san-diego': {
    name: 'San Diego',
    slug: 'san-diego',
    state: 'California',
    stateAbbr: 'CA',
    content: `San Diego riders know perfect weather – 70 degrees year-round, endless sunshine, perfect for riding. When you're looking for used Harleys in San Diego, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're 2,000 miles away, but our prices are better, our selection is bigger, and we ship to San Diego for only $499.

San Diego's mix of coastal highways and mountain roads is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to San Diego has been inspected for frame integrity, engine compression, and electrical systems. We know what San Diego riders need – bikes that can handle freeway traffic, twisty mountain roads, and everything in between.

Shipping from Milwaukee to San Diego takes 5-7 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

San Diego riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'san-francisco': {
    name: 'San Francisco',
    slug: 'san-francisco',
    state: 'California',
    stateAbbr: 'CA',
    content: `San Francisco riders know hills, fog, and perfect riding weather. When you're looking for used Harleys in San Francisco, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're 2,100 miles away, but our prices are better, our selection is bigger, and we ship to San Francisco for only $499.

San Francisco's mix of city streets, coastal highways, and mountain roads is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to San Francisco has been inspected for frame integrity, engine compression, and electrical systems. We know what San Francisco riders need – bikes that can handle hills, fog, and everything in between.

Shipping from Milwaukee to San Francisco takes 5-7 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

San Francisco riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'miami': {
    name: 'Miami',
    slug: 'miami',
    state: 'Florida',
    stateAbbr: 'FL',
    content: `Miami riders know year-round riding – no winter, no salt, just endless sunshine and perfect weather. When you're looking for used Harleys in Miami, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're 1,400 miles away, but our prices are better, our selection is bigger, and we ship to Miami for only $499.

Miami's mix of coastal highways and city streets is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Miami has been inspected for frame integrity, engine compression, and electrical systems. We know what Miami riders need – bikes that can handle humidity, heat, and everything in between.

Shipping from Milwaukee to Miami takes 4-6 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Miami riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'tampa': {
    name: 'Tampa',
    slug: 'tampa',
    state: 'Florida',
    stateAbbr: 'FL',
    content: `Tampa riders know year-round riding – no winter, no salt, just endless sunshine and perfect weather. When you're looking for used Harleys in Tampa, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're 1,200 miles away, but our prices are better, our selection is bigger, and we ship to Tampa for only $499.

Tampa's mix of coastal highways and city streets is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Tampa has been inspected for frame integrity, engine compression, and electrical systems. We know what Tampa riders need – bikes that can handle humidity, heat, and everything in between.

Shipping from Milwaukee to Tampa takes 4-6 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Tampa riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'orlando': {
    name: 'Orlando',
    slug: 'orlando',
    state: 'Florida',
    stateAbbr: 'FL',
    content: `Orlando riders know year-round riding – no winter, no salt, just endless sunshine and perfect weather. When you're looking for used Harleys in Orlando, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're 1,200 miles away, but our prices are better, our selection is bigger, and we ship to Orlando for only $499.

Orlando's mix of highways and city streets is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Orlando has been inspected for frame integrity, engine compression, and electrical systems. We know what Orlando riders need – bikes that can handle humidity, heat, and everything in between.

Shipping from Milwaukee to Orlando takes 4-6 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Orlando riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'houston': {
    name: 'Houston',
    slug: 'houston',
    state: 'Texas',
    stateAbbr: 'TX',
    content: `Houston riders know big city riding – wide highways, heavy traffic, and year-round weather. When you're looking for used Harleys in Houston, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're 1,100 miles away, but our prices are better, our selection is bigger, and we ship to Houston for only $499.

Houston's mix of highways and city streets is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Houston has been inspected for frame integrity, engine compression, and electrical systems. We know what Houston riders need – bikes that can handle humidity, heat, and everything in between.

Shipping from Milwaukee to Houston takes 4-6 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Houston riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'dallas': {
    name: 'Dallas',
    slug: 'dallas',
    state: 'Texas',
    stateAbbr: 'TX',
    content: `Dallas riders know big city riding – wide highways, heavy traffic, and year-round weather. When you're looking for used Harleys in Dallas, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're 1,000 miles away, but our prices are better, our selection is bigger, and we ship to Dallas for only $499.

Dallas's mix of highways and city streets is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Dallas has been inspected for frame integrity, engine compression, and electrical systems. We know what Dallas riders need – bikes that can handle humidity, heat, and everything in between.

Shipping from Milwaukee to Dallas takes 4-6 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Dallas riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'austin': {
    name: 'Austin',
    slug: 'austin',
    state: 'Texas',
    stateAbbr: 'TX',
    content: `Austin riders know hill country riding – twisty roads, perfect weather, and year-round sunshine. When you're looking for used Harleys in Austin, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're 1,100 miles away, but our prices are better, our selection is bigger, and we ship to Austin for only $499.

Austin's mix of hill country roads and city streets is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Austin has been inspected for frame integrity, engine compression, and electrical systems. We know what Austin riders need – bikes that can handle twisty roads, heat, and everything in between.

Shipping from Milwaukee to Austin takes 4-6 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Austin riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'chicago': {
    name: 'Chicago',
    slug: 'chicago',
    state: 'Illinois',
    stateAbbr: 'IL',
    content: `When you're looking for used Harleys in Chicago, you're looking at one of the biggest motorcycle markets in the Midwest. But here's the thing – Chicago dealers charge premium prices, and their inventory moves fast. That's why smart Chicago riders ship from Milwaukee. We're just 90 miles north, but our prices are better, our selection is bigger, and we ship to Chicago for only $499.

Chicago streets are tough on bikes – potholes, traffic, salt in the winter. Every used Harley we ship to Chicago has been inspected for frame integrity, engine compression, and electrical systems. We know what Chicago riders need – bikes that can handle city traffic, highway miles, and everything in between. Whether you're cruising Lake Shore Drive or heading out to the suburbs, we've got the bike.

Shipping from Milwaukee to Chicago takes 2-3 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Chicago riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
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
    exampleBikes: sharedBikes
  },
  'columbus': {
    name: 'Columbus',
    slug: 'columbus',
    state: 'Ohio',
    stateAbbr: 'OH',
    content: `Columbus riders know quality when they see it. When you're looking for used Harleys in Columbus, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 400 miles west, but our prices are better, our selection is bigger, and we ship to Columbus for only $499.

Ohio roads are smooth, but winters are tough. Every used Harley we ship to Columbus has been inspected for frame integrity, engine compression, and electrical systems. We know what Columbus riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to Columbus takes 3-5 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Columbus riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'milwaukee': {
    name: 'Milwaukee',
    slug: 'milwaukee',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    content: `Milwaukee is home. When you're looking for used Harleys in Milwaukee, you're looking at the best selection, the best prices, and the best service in Wisconsin. We're located right here in Milwaukee at House Of Harley, so you can come see the bikes in person or we'll deliver to your door.

Milwaukee roads are tough – potholes, salt, temperature swings. Every used Harley we sell in Milwaukee has been inspected for frame integrity, engine compression, and electrical systems. We know what Milwaukee riders need – bikes that can handle city traffic, highway miles, and everything in between. Whether you're cruising Lake Michigan, exploring Wisconsin's back roads, or commuting to work, we've got the bike.

Every used Harley we sell in Milwaukee comes with complete service history, Carfax, and our 48-hour guarantee. We check every bike – engine compression, transmission smoothness, frame integrity. These bikes are ready to ride, not projects.

Milwaukee riders consistently choose us because we're local, we're transparent, and we stand behind every bike. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
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
    exampleBikes: sharedBikes
  },
  'philadelphia': {
    name: 'Philadelphia',
    slug: 'philadelphia',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    content: `Philadelphia riders know city riding – narrow streets, heavy traffic, and tough winters. When you're looking for used Harleys in Philadelphia, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 800 miles west, but our prices are better, our selection is bigger, and we ship to Philadelphia for only $499.

Philadelphia's mix of city streets and highways is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Philadelphia has been inspected for frame integrity, engine compression, and electrical systems. We know what Philadelphia riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to Philadelphia takes 4-6 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Philadelphia riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'pittsburgh': {
    name: 'Pittsburgh',
    slug: 'pittsburgh',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    content: `Pittsburgh riders know hills and tough winters. When you're looking for used Harleys in Pittsburgh, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 600 miles west, but our prices are better, our selection is bigger, and we ship to Pittsburgh for only $499.

Pittsburgh's mix of hills, city streets, and highways is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Pittsburgh has been inspected for frame integrity, engine compression, and electrical systems. We know what Pittsburgh riders need – bikes that can handle hills, city traffic, and everything in between.

Shipping from Milwaukee to Pittsburgh takes 3-5 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Pittsburgh riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'new-york-city': {
    name: 'New York City',
    slug: 'new-york-city',
    state: 'New York',
    stateAbbr: 'NY',
    content: `New York City riders know the most expensive motorcycle market in the country. NYC dealers charge premium prices, and their inventory is limited. That's why smart New York riders ship from Milwaukee. We're 900 miles away, but our prices are better, our selection is bigger, and we ship to New York City for only $499.

New York City's mix of city streets and highways is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to New York City has been inspected for frame integrity, engine compression, and electrical systems. We know what NYC riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to New York City takes 4-6 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

New York City riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
  },
  'buffalo': {
    name: 'Buffalo',
    slug: 'buffalo',
    state: 'New York',
    stateAbbr: 'NY',
    content: `Buffalo riders know tough winters and salt. When you're looking for used Harleys in Buffalo, you want a bike that's been inspected, maintained, and priced fair. That's what we deliver from Milwaukee. We're just 500 miles west, but our prices are better, our selection is bigger, and we ship to Buffalo for only $499.

Buffalo's mix of city streets and highways is perfect for touring bikes like the Street Glide and Road Glide. Every used Harley we ship to Buffalo has been inspected for frame integrity, engine compression, and electrical systems. We know what Buffalo riders need – bikes that can handle city traffic, highway miles, and everything in between.

Shipping from Milwaukee to Buffalo takes 3-5 days. We use insured, professional motorcycle transport. Your bike arrives ready to ride – we handle all the paperwork, you just sign and go. No dealer markup, no hidden fees, no BS. Just honest pricing and bikes that are ready to ride.

Buffalo riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike with our 48-hour guarantee. If something's not right, we fix it or refund it. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: sharedBikes
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
    exampleBikes: sharedBikes
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
    exampleBikes: sharedBikes
  }
};

export function getCityPageData(slug: string | undefined): CityPageData | null {
  if (!slug) return null;
  return cityPagesData[slug.toLowerCase()] || null;
}

export function getAllCityPageSlugs(): string[] {
  return Object.keys(cityPagesData);
}
