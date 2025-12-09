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
    content: `Why Los Angeles riders love used Harleys from Milwaukee starts with the weather. Year-round sunshine means you can ride every single day – no salt damage, no winter storage, just endless perfect riding conditions. That's why LA riders demand bikes that are inspected, maintained, and ready to handle everything from Pacific Coast Highway cruises to canyon carving.

Los Angeles highways are some of the busiest in the world, and your bike needs to handle it. Every used Harley we ship to LA gets a complete inspection – frame integrity, engine compression, transmission smoothness, electrical systems. We know what LA riders need because we've been shipping bikes to California for years. The Street Glide excels on LA freeways with its wind protection and premium audio, while the Road Glide's frame-mounted fairing handles crosswinds better for coastal rides.

Shipping from Milwaukee to Los Angeles takes 5-7 days via insured professional transport. Your bike arrives ready to ride – we handle all the paperwork, title transfer, and registration help. No dealer markup, no hidden fees, no surprises. Just transparent pricing and bikes that are road-ready. LA dealers charge premium prices because they can – we ship the same quality bikes for thousands less, plus the $499 flat-rate shipping.

Los Angeles riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and we stand behind every bike with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, no runaround. That's the difference between buying from someone who knows motorcycles versus a corporate dealer focused on moving inventory.`,
    exampleBikes: sharedBikes
  },
  'san-diego': {
    name: 'San Diego',
    slug: 'san-diego',
    state: 'California',
    stateAbbr: 'CA',
    content: `Why San Diego riders love used Harleys from Milwaukee comes down to perfect riding weather and better prices. Seventy-degree days year-round mean your bike gets ridden, not stored. San Diego's mix of coastal highways and mountain twisties demands bikes that are inspected, proven, and ready to handle both freeway traffic and technical mountain roads.

San Diego riders know quality – the perfect weather means bikes get put through their paces. Every used Harley we ship to San Diego undergoes comprehensive inspection – frame integrity, engine compression, transmission function, brake systems, electrical. The Street Glide's premium audio and wind protection make it ideal for Highway 101 cruises, while the Road Glide's handling shines on mountain roads like Mount Palomar. Both models thrive in San Diego's climate without the salt damage and winter storage issues Midwest bikes face.

Shipping from Milwaukee to San Diego takes 5-7 days via insured professional motorcycle transport. We handle title transfer, paperwork, and registration assistance. Your bike arrives road-ready – no dealer fees, no hidden costs, just the price you agreed to plus $499 flat-rate shipping. San Diego dealers charge premium prices, but we ship the same inspected bikes for significantly less.

San Diego riders consistently choose us because we're transparent about condition, we respond quickly to texts (414-439-6211), and every bike comes with our 48-hour guarantee. If your bike arrives and something's not right, we make it right – fix it or full refund, no questions asked. That's the difference between buying from someone who knows motorcycles inside and out versus a dealership focused on margins.`,
    exampleBikes: sharedBikes
  },
  'san-francisco': {
    name: 'San Francisco',
    slug: 'san-francisco',
    state: 'California',
    stateAbbr: 'CA',
    content: `Why San Francisco riders love used Harleys from Milwaukee starts with the hills, fog, and perfect coastal riding. SF riders need bikes that handle steep grades, handlebar-to-handlebar traffic, and everything in between. The city's unique mix of urban streets, coastal highways, and mountain roads demands motorcycles that are inspected, proven, and ready for diverse riding conditions.

San Francisco's microclimates and elevation changes test every component. Every used Harley we ship to SF gets inspected for frame integrity, engine compression, transmission smoothness, brake performance, and electrical systems. The Road Glide's frame-mounted fairing handles SF's notorious crosswinds better than batwing fairings, while the Street Glide's premium audio keeps you connected during commutes. Both models handle the hills, fog, and everything San Francisco throws at them.

Shipping from Milwaukee to San Francisco takes 5-7 days via insured professional transport. We handle all paperwork, title transfer, and registration assistance. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. San Francisco dealers charge premium prices, but we ship the same quality inspected bikes for thousands less.

San Francisco riders consistently choose us because we're transparent, we respond fast to texts (Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, no excuses. That's buying from someone who understands motorcycles versus a corporate dealer focused on inventory turns.`,
    exampleBikes: sharedBikes
  },
  'miami': {
    name: 'Miami',
    slug: 'miami',
    state: 'Florida',
    stateAbbr: 'FL',
    content: `Why Miami riders love used Harleys from Milwaukee is simple – year-round riding weather and better prices. No winter storage, no salt damage, just endless perfect riding days. Miami's mix of coastal highways, city streets, and Everglades rides demands bikes that are inspected, proven, and ready to handle heat, humidity, and heavy traffic.

Miami's tropical climate means bikes get ridden constantly, and riders demand reliability. Every used Harley we ship to Miami gets comprehensive inspection – frame integrity, engine compression, transmission function, cooling systems, electrical. The Street Glide's wind protection and premium audio make it perfect for A1A coastal cruises, while the Road Glide excels on long highway runs to Key West. Both models thrive in Miami's heat without the rust and winter damage Midwest bikes face.

Shipping from Milwaukee to Miami takes 4-6 days via insured professional motorcycle transport. We handle title transfer, paperwork, and registration assistance. Your bike arrives road-ready – no dealer fees, no hidden costs, just transparent pricing plus $499 flat-rate shipping. Miami dealers charge premium prices, but we ship the same inspected bikes for significantly less.

Miami riders consistently choose us because we're transparent about condition, we respond quickly (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If your bike arrives and something's not right, we make it right – fix it or full refund, period. That's the difference between buying from someone who knows bikes versus a dealership focused on moving inventory.`,
    exampleBikes: sharedBikes
  },
  'tampa': {
    name: 'Tampa',
    slug: 'tampa',
    state: 'Florida',
    stateAbbr: 'FL',
    content: `Why Tampa riders love used Harleys from Milwaukee comes down to perfect weather, better prices, and bikes ready for Florida's unique riding conditions. Year-round sunshine means no winter storage, no salt damage – just endless riding days. Tampa's mix of coastal highways, city streets, and rural roads demands motorcycles that are inspected, proven, and ready for heat, humidity, and everything in between.

Tampa riders put their bikes through the paces in Florida's climate, and they demand reliability. Every used Harley we ship to Tampa gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, cooling systems, electrical. The Street Glide's premium audio and wind protection make it ideal for coastal cruises along the Gulf, while the Road Glide handles long highway runs better with its frame-mounted fairing. Both models excel in Tampa's weather without the rust issues northern bikes face.

Shipping from Milwaukee to Tampa takes 4-6 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just the price you agreed to plus $499 flat-rate shipping. Tampa dealers charge premium prices, but we ship the same quality inspected bikes for thousands less.

Tampa riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike comes with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, no questions. That's buying from someone who understands motorcycles versus a corporate dealer focused on margins.`,
    exampleBikes: sharedBikes
  },
  'orlando': {
    name: 'Orlando',
    slug: 'orlando',
    state: 'Florida',
    stateAbbr: 'FL',
    content: `Why Orlando riders love used Harleys from Milwaukee starts with perfect weather and better prices than local dealers. Year-round riding means no winter storage issues, no salt damage – just endless perfect days. Orlando's mix of highways, city streets, and rural Central Florida roads demands bikes that are inspected, proven, and ready for heat, humidity, and tourist traffic.

Orlando's climate means bikes get constant use, and riders demand reliability and performance. Every used Harley we ship to Orlando gets comprehensive inspection – frame integrity, engine compression, transmission function, cooling systems, electrical. The Street Glide's premium audio keeps you entertained during long rides to the coast, while the Road Glide's frame-mounted fairing handles Florida's afternoon storms better. Both models thrive in Orlando's weather without the winter damage and rust northern bikes face.

Shipping from Milwaukee to Orlando takes 4-6 days via insured professional motorcycle transport. We handle title transfer, paperwork, and registration assistance. Your bike arrives road-ready – no dealer fees, no hidden costs, just transparent pricing plus $499 flat-rate shipping. Orlando dealers charge premium prices, but we ship the same inspected bikes for significantly less.

Orlando riders consistently choose us because we're transparent about condition, we respond quickly to texts (414-439-6211), and every bike ships with our 48-hour guarantee. If your bike arrives and something's not right, we make it right – fix it or full refund, no excuses. That's the difference between buying from someone who knows motorcycles versus a dealership focused on inventory turns.`,
    exampleBikes: sharedBikes
  },
  'houston': {
    name: 'Houston',
    slug: 'houston',
    state: 'Texas',
    stateAbbr: 'TX',
    content: `Why Houston riders love used Harleys from Milwaukee comes down to big city riding demands and better prices than Texas dealers. Houston's wide highways, heavy traffic, and year-round weather mean bikes get serious use. The city's mix of freeways, city streets, and Gulf Coast runs demands motorcycles that are inspected, proven, and ready for heat, humidity, and everything Texas throws at them.

Houston riders know quality – the heat and traffic test every component. Every used Harley we ship to Houston gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, cooling systems, brake performance. The Street Glide's wind protection and premium audio make it perfect for long freeway commutes, while the Road Glide's frame-mounted fairing handles Houston's crosswinds better. Both models excel in Texas heat without the rust and winter issues northern bikes face.

Shipping from Milwaukee to Houston takes 4-6 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. Houston dealers charge premium prices, but we ship the same quality inspected bikes for thousands less.

Houston riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike comes with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, period. That's buying from someone who understands motorcycles versus a corporate dealer focused on moving inventory.`,
    exampleBikes: sharedBikes
  },
  'dallas': {
    name: 'Dallas',
    slug: 'dallas',
    state: 'Texas',
    stateAbbr: 'TX',
    content: `Why Dallas riders love used Harleys from Milwaukee starts with big city riding and better prices than local dealers. Dallas's wide highways, heavy traffic, and year-round weather mean bikes get constant use. The city's mix of freeways, city streets, and North Texas roads demands motorcycles that are inspected, proven, and ready for heat, wind, and everything the Metroplex throws at them.

Dallas riders demand reliability – the heat and traffic test every component constantly. Every used Harley we ship to Dallas gets comprehensive inspection – frame integrity, engine compression, transmission function, cooling systems, electrical. The Street Glide's premium audio and wind protection make it ideal for long freeway runs, while the Road Glide's frame-mounted fairing handles Dallas's notorious crosswinds better. Both models thrive in Texas weather without the salt damage and winter storage issues northern bikes face.

Shipping from Milwaukee to Dallas takes 4-6 days via insured professional motorcycle transport. We handle title transfer, paperwork, and registration assistance. Your bike arrives road-ready – no dealer fees, no hidden costs, just transparent pricing plus $499 flat-rate shipping. Dallas dealers charge premium prices, but we ship the same inspected bikes for significantly less.

Dallas riders consistently choose us because we're transparent about condition, we respond quickly to texts (414-439-6211), and every bike ships with our 48-hour guarantee. If your bike arrives and something's not right, we make it right – fix it or full refund, no questions. That's the difference between buying from someone who knows motorcycles inside and out versus a dealership focused on margins.`,
    exampleBikes: sharedBikes
  },
  'austin': {
    name: 'Austin',
    slug: 'austin',
    state: 'Texas',
    stateAbbr: 'TX',
    content: `Why Austin riders love used Harleys from Milwaukee is all about hill country roads and better prices. Austin's mix of twisty hill country roads, city streets, and year-round sunshine means riders demand bikes that can handle technical roads and heat. The city's unique riding culture values quality, performance, and bikes that are inspected, proven, and ready for everything from downtown commutes to weekend hill country runs.

Austin's hill country roads are some of the best in Texas, and riders know what works. Every used Harley we ship to Austin gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, brake performance, suspension. The Road Glide's frame-mounted fairing handles hill country winds better, while the Street Glide's premium audio keeps you connected during long rides. Both models excel in Austin's heat and on technical roads without the winter damage northern bikes face.

Shipping from Milwaukee to Austin takes 4-6 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. Austin dealers charge premium prices, but we ship the same quality inspected bikes for thousands less.

Austin riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike comes with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, no excuses. That's buying from someone who understands motorcycles versus a corporate dealer focused on inventory turns.`,
    exampleBikes: sharedBikes
  },
  'chicago': {
    name: 'Chicago',
    slug: 'chicago',
    state: 'Illinois',
    stateAbbr: 'IL',
    content: `Why Chicago riders love used Harleys from Milwaukee starts with being just 90 miles north – close enough to trust, far enough to offer better prices. Chicago's streets are tough on bikes – potholes, heavy traffic, salt in winter. The city's mix of Lake Shore Drive cruises, highway commuting, and suburban runs demands motorcycles that are inspected, proven, and ready for everything from city traffic to long highway miles.

Chicago riders know quality because they ride in some of the toughest conditions – potholes, traffic, salt, temperature swings. Every used Harley we ship to Chicago gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, brake systems, electrical. The Street Glide's wind protection and premium audio make it perfect for Lake Shore Drive cruises and highway commutes, while the Road Glide handles crosswinds off Lake Michigan better. Both models are proven on Wisconsin roads, so Chicago's conditions are no problem.

Shipping from Milwaukee to Chicago takes just 2-3 days via insured professional transport. We handle title transfer, paperwork, and registration assistance. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. Chicago dealers charge premium prices, but we're so close you can even come see the bikes in person if you want.

Chicago riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If something's not right, we fix it or refund it – no hassle, no questions asked. That's the difference between buying from someone who knows bikes versus a corporate dealer focused on moving inventory.`,
    exampleBikes: sharedBikes
  },
  'cleveland': {
    name: 'Cleveland',
    slug: 'cleveland',
    state: 'Ohio',
    stateAbbr: 'OH',
    content: `Why Cleveland riders love used Harleys from Milwaukee comes down to better prices and bikes proven on similar Midwest roads. Cleveland's mix of city streets, highways, and Lake Erie cruises demands motorcycles that are inspected, proven, and ready for everything from urban traffic to long rides along the lake. Ohio roads are generally smooth, but winters are tough with salt and temperature swings.

Cleveland riders know quality – the salt and winters test every component. Every used Harley we ship to Cleveland gets comprehensive inspection – frame integrity, engine compression, transmission function, brake systems, electrical, and most importantly – checking for rust and corrosion. The Street Glide's wind protection makes it perfect for Lake Erie cruises and highway runs, while the Road Glide handles crosswinds off the lake better. Both models are proven on Wisconsin roads, so Cleveland's conditions are familiar territory.

Shipping from Milwaukee to Cleveland takes 3-5 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. Cleveland dealers charge premium prices, but we ship the same quality inspected bikes for thousands less.

Cleveland riders consistently choose us because we're transparent about condition, we respond quickly (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If your bike arrives and something's not right, we make it right – fix it or full refund, no excuses. That's buying from someone who understands Midwest riding versus a dealership focused on margins.`,
    exampleBikes: sharedBikes
  },
  'columbus': {
    name: 'Columbus',
    slug: 'columbus',
    state: 'Ohio',
    stateAbbr: 'OH',
    content: `Why Columbus riders love used Harleys from Milwaukee starts with better prices and bikes proven on similar Midwest roads. Columbus's mix of city streets, highways, and rural Ohio roads demands motorcycles that are inspected, proven, and ready for everything from urban commuting to weekend rides. Ohio roads are generally smooth, but winters with salt and temperature swings test every component.

Columbus riders demand quality – they know what salt and winter do to bikes. Every used Harley we ship to Columbus gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, brake performance, electrical, and detailed rust and corrosion checks. The Street Glide's premium audio and wind protection make it perfect for long highway runs, while the Road Glide handles crosswinds better for open road rides. Both models are proven on Wisconsin roads, so Columbus's conditions are no challenge.

Shipping from Milwaukee to Columbus takes 3-5 days via insured professional transport. We handle title transfer, paperwork, and registration assistance. Your bike arrives road-ready – no dealer fees, no hidden costs, just transparent pricing plus $499 flat-rate shipping. Columbus dealers charge premium prices, but we ship the same inspected bikes for significantly less.

Columbus riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike comes with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, no questions. That's the difference between buying from someone who knows motorcycles versus a corporate dealer focused on inventory turns.`,
    exampleBikes: sharedBikes
  },
  'milwaukee': {
    name: 'Milwaukee',
    slug: 'milwaukee',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    content: `Milwaukee is home, and that's why Milwaukee riders get the best selection, best prices, and best service. We're located right here in Milwaukee at House Of Harley, so you can come see the bikes in person, test ride, or we'll deliver to your door. Milwaukee's mix of city streets, Lake Michigan cruises, and Wisconsin back roads demands motorcycles that are inspected, proven, and ready for everything from urban commuting to weekend adventures.

Milwaukee roads are tough – potholes, salt, temperature swings from below zero to ninety degrees. Every used Harley we sell in Milwaukee gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, brake systems, electrical, and detailed rust checks. The Street Glide's wind protection makes it perfect for Lake Michigan cruises and highway runs, while the Road Glide handles crosswinds off the lake better. Both models are proven on Wisconsin roads because that's where we ride them.

Every used Harley we sell in Milwaukee comes with complete service history, Carfax reports, and our 48-hour guarantee. We check every bike ourselves – engine compression, transmission function, frame integrity, everything. These bikes are ready to ride, not projects. We're local, so if something's not right, you can bring it back – no shipping, no hassle.

Milwaukee riders consistently choose us because we're right here, we're transparent, and we stand behind every bike. If something's not right, we fix it or refund it – that's it. That's the difference between buying from someone who knows bikes and rides these same roads versus a corporate dealer focused on moving inventory.`,
    exampleBikes: sharedBikes
  },
  'madison': {
    name: 'Madison',
    slug: 'madison',
    state: 'Wisconsin',
    stateAbbr: 'WI',
    content: `Why Madison riders love used Harleys from Milwaukee starts with being just 80 miles away – close enough to trust, fast enough shipping to get your bike in 1-2 days. Madison's mix of city streets, scenic country roads, and Wisconsin highways demands motorcycles that are inspected, proven, and ready for everything from campus commutes to weekend rides through the Driftless Area.

Madison riders know Wisconsin roads – smooth highways, scenic back roads, and everything in between. Every used Harley we ship to Madison gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, brake systems, electrical. The Street Glide's premium audio and wind protection make it perfect for long highway runs, while the Road Glide handles open road riding better. Both models are proven on Wisconsin roads, so Madison's conditions are familiar territory.

Shipping from Milwaukee to Madison is simple – we're so close that most bikes arrive in 1-2 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. You can even come to Milwaukee to see the bikes in person if you prefer.

Every used Harley we ship to Madison comes with complete service history, Carfax reports, and our 48-hour guarantee. We check every bike ourselves – engine compression, transmission function, frame integrity. These bikes are ready to ride, not projects. Madison riders consistently choose us because we're transparent, we ship fast, and we stand behind every bike. If something's not right, we fix it or refund it – that's the difference between buying from someone who knows Wisconsin riding versus a dealership focused on margins.`,
    exampleBikes: sharedBikes
  },
  'philadelphia': {
    name: 'Philadelphia',
    slug: 'philadelphia',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    content: `Why Philadelphia riders love used Harleys from Milwaukee comes down to better prices and bikes proven on similar urban roads. Philadelphia's narrow streets, heavy traffic, and tough winters demand motorcycles that are inspected, proven, and ready for everything from city commuting to highway runs. The city's mix of historic neighborhoods, main thoroughfares, and Pennsylvania back roads tests every component.

Philadelphia riders know quality – the narrow streets and tough winters test bikes constantly. Every used Harley we ship to Philadelphia gets comprehensive inspection – frame integrity, engine compression, transmission function, brake systems, electrical, and detailed rust checks. The Street Glide's maneuverability and premium audio make it perfect for city streets and highway runs, while the Road Glide's frame-mounted fairing handles crosswinds better for longer rides. Both models are proven on Midwest roads, so Philadelphia's conditions are manageable.

Shipping from Milwaukee to Philadelphia takes 4-6 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. Philadelphia dealers charge premium prices, but we ship the same quality inspected bikes for thousands less.

Philadelphia riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, no excuses. That's buying from someone who understands motorcycles versus a corporate dealer focused on moving inventory.`,
    exampleBikes: sharedBikes
  },
  'pittsburgh': {
    name: 'Pittsburgh',
    slug: 'pittsburgh',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    content: `Why Pittsburgh riders love used Harleys from Milwaukee starts with hills, tough winters, and better prices. Pittsburgh's mix of steep hills, city streets, and Pennsylvania highways demands motorcycles that are inspected, proven, and ready for everything from urban commuting to mountain rides. The city's unique terrain with bridges, tunnels, and elevation changes tests every component.

Pittsburgh riders demand quality – the hills and tough winters test bikes constantly. Every used Harley we ship to Pittsburgh gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, brake performance, electrical, and detailed rust checks. The Street Glide's power and premium audio make it perfect for tackling hills and long rides, while the Road Glide's frame-mounted fairing handles crosswinds better on open roads. Both models are proven on Midwest roads, so Pittsburgh's conditions are no problem.

Shipping from Milwaukee to Pittsburgh takes 3-5 days via insured professional transport. We handle title transfer, paperwork, and registration assistance. Your bike arrives road-ready – no dealer fees, no hidden costs, just transparent pricing plus $499 flat-rate shipping. Pittsburgh dealers charge premium prices, but we ship the same inspected bikes for significantly less.

Pittsburgh riders consistently choose us because we're transparent about condition, we respond quickly (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If your bike arrives and something's not right, we make it right – fix it or full refund, no questions. That's the difference between buying from someone who knows motorcycles versus a dealership focused on margins.`,
    exampleBikes: sharedBikes
  },
  'new-york-city': {
    name: 'New York City',
    slug: 'new-york-city',
    state: 'New York',
    stateAbbr: 'NY',
    content: `Why New York City riders love used Harleys from Milwaukee is all about the most expensive motorcycle market in the country and better prices. NYC dealers charge premium prices, and their inventory is limited. NYC's mix of city streets, highway runs, and everything in between demands motorcycles that are inspected, proven, and ready for heavy traffic, toll roads, and diverse riding conditions.

New York City riders know value – they're used to premium pricing, so when they find better prices for the same quality, they jump on it. Every used Harley we ship to NYC gets comprehensive inspection – frame integrity, engine compression, transmission function, brake systems, electrical. The Street Glide's maneuverability and premium audio make it perfect for city streets and highway runs, while the Road Glide's frame-mounted fairing handles crosswinds better for longer rides out of the city. Both models are proven on Midwest roads, so NYC's conditions are manageable.

Shipping from Milwaukee to New York City takes 4-6 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. NYC dealers charge premium prices because they can – we ship the same quality inspected bikes for thousands less.

New York City riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, period. That's buying from someone who understands motorcycles versus a corporate dealer focused on inventory turns.`,
    exampleBikes: sharedBikes
  },
  'buffalo': {
    name: 'Buffalo',
    slug: 'buffalo',
    state: 'New York',
    stateAbbr: 'NY',
    content: `Why Buffalo riders love used Harleys from Milwaukee comes down to tough winters, salt, and better prices. Buffalo's mix of city streets, highways, and Lake Erie cruises demands motorcycles that are inspected, proven, and ready for everything from urban commuting to long rides. The city's harsh winters with salt and snow test every component, so riders demand quality inspections.

Buffalo riders know quality – the salt and tough winters test bikes constantly. Every used Harley we ship to Buffalo gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, brake performance, electrical, and most importantly – detailed rust and corrosion checks. The Street Glide's wind protection makes it perfect for Lake Erie cruises and highway runs, while the Road Glide handles crosswinds off the lake better. Both models are proven on Wisconsin roads, so Buffalo's conditions are familiar territory.

Shipping from Milwaukee to Buffalo takes 3-5 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. Buffalo dealers charge premium prices, but we ship the same quality inspected bikes for thousands less.

Buffalo riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, no questions asked. That's the difference between buying from someone who understands Midwest and Great Lakes riding versus a dealership focused on moving inventory.`,
    exampleBikes: sharedBikes
  },
  'detroit': {
    name: 'Detroit',
    slug: 'detroit',
    state: 'Michigan',
    stateAbbr: 'MI',
    content: `Why Detroit riders love used Harleys from Milwaukee starts with being Motor City – birthplace of American muscle, home of riders who know quality. Detroit's mix of city streets, highways, and Michigan roads demands motorcycles that are inspected, proven, and ready for everything from urban commuting to long rides. The city's roads are tough with potholes, salt, and temperature swings, so riders demand bikes that can handle it.

Detroit riders know motorcycles – it's in the city's DNA. Every used Harley we ship to Detroit gets comprehensive inspection – frame integrity, engine compression, transmission smoothness, brake systems, electrical, and detailed rust checks. The Street Glide's power and premium audio make it perfect for city streets and highway runs, while the Road Glide's frame-mounted fairing handles crosswinds better. Both models are proven on Wisconsin roads, so Detroit's conditions are no problem.

Shipping from Milwaukee to Detroit takes 3-5 days via insured professional transport. We handle title transfer, paperwork, and registration assistance. Your bike arrives road-ready – no dealer fees, no hidden costs, just transparent pricing plus $499 flat-rate shipping. Detroit dealers charge premium prices, but we ship the same inspected bikes for significantly less.

Detroit riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, period. That's buying from someone who understands motorcycles inside and out versus a corporate dealer focused on margins.`,
    exampleBikes: sharedBikes
  },
  'st-louis': {
    name: 'St. Louis',
    slug: 'st-louis',
    state: 'Missouri',
    stateAbbr: 'MO',
    content: `Why St. Louis riders love used Harleys from Milwaukee comes down to better prices and bikes proven on similar Midwest roads. St. Louis's mix of city streets, highways, and Missouri roads demands motorcycles that are inspected, proven, and ready for everything from urban commuting to long rides. Missouri roads are generally smooth, but weather can be unpredictable, so riders demand reliable bikes.

St. Louis riders know quality – they understand what works on Midwest roads. Every used Harley we ship to St. Louis gets comprehensive inspection – frame integrity, engine compression, transmission function, brake systems, electrical. The Street Glide's premium audio and wind protection make it perfect for long highway runs and city streets, while the Road Glide's frame-mounted fairing handles crosswinds better for open road riding. Both models are proven on Wisconsin roads, so St. Louis's conditions are familiar territory.

Shipping from Milwaukee to St. Louis takes 3-5 days via insured professional transport. We handle all paperwork, title transfer, and registration help. Your bike arrives ready to ride – no dealer markup, no hidden fees, just transparent pricing plus $499 flat-rate shipping. St. Louis dealers charge premium prices, but we ship the same quality inspected bikes for thousands less.

St. Louis riders consistently choose us because we're transparent, we respond fast (text Joe at 414-439-6211), and every bike ships with our 48-hour guarantee. If something's not right when your bike arrives, we fix it or refund it – no hassle, no excuses. That's the difference between buying from someone who knows motorcycles versus a corporate dealer focused on inventory turns.`,
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
