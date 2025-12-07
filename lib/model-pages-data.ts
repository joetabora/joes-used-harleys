/**
 * Model-specific data for dedicated model pages
 * Used for SEO-optimized individual model landing pages
 */

export interface ModelPageData {
  name: string;
  slug: string;
  displayName: string; // For H1 (e.g., "Low Rider S" vs "Low Rider S")
  content: string; // 400-500 words
  exampleBikes: Array<{
    year: string;
    name: string;
    price: string;
    miles: string;
    image: string;
    specs: string;
  }>;
}

export const modelPagesData: { [key: string]: ModelPageData } = {
  'street-glide': {
    name: 'Street Glide',
    slug: 'street-glide',
    displayName: 'Street Glide',
    content: `When you're hunting for a used Street Glide in Milwaukee, you're looking at the bike that defines American touring. The batwing fairing, Milwaukee-Eight power, and that deep V-twin rumble that makes every ride feel like a mission. Milwaukee riders know this bike – it's the one you see on Lake Michigan cruises, the one that handles Wisconsin's mix of city streets and open highways like it was built for it.

The Milwaukee-Eight 107 or 114 engine in these used Street Glides delivers power where you need it. Not just top-end speed – we're talking torque that pulls from idle, smooth power delivery that doesn't beat you up on long rides. The frame-mounted batwing fairing cuts wind without the front-end weight you get on fork-mounted setups. That matters when you're dealing with Milwaukee's crosswinds off the lake or navigating traffic on I-94.

Every used Street Glide we sell in Milwaukee comes with full service history, Carfax, and our 48-hour guarantee. I personally check every bike – engine compression, transmission smoothness, frame integrity, electrical systems. No surprises. You get photos of any imperfections, documentation of all mods, and complete service records. These bikes are ready to ride, not projects.

Common upgrades you'll find on our used Street Glides: Stage 1 performance kits (air cleaner, tuner, exhaust), premium audio systems, highway pegs, luggage upgrades. Stuff that would cost you $3,000-$5,000 if you added it to a new bike. We price these bikes fair – what you see is what you pay, no prep fees or hidden add-ons.

Milwaukee roads are tough on bikes. Potholes, salt, temperature swings. These Street Glides have proven they can handle it. Every one in our inventory has been ridden on Wisconsin roads, maintained properly, and inspected thoroughly. That's the difference between buying from a guy who knows bikes versus a corporate dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Street Glide Special',
        price: '$23,999',
        miles: '4,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Black Denim • Stage 1 • Premium Audio'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Street Glide',
        price: '$21,500',
        miles: '8,900',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 107 • Vivid Black • Tour-Pak • Highway Pegs'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Street Glide Special',
        price: '$19,999',
        miles: '12,500',
        image: 'https://files.catbox.moe/9t6u8x.jpg',
        specs: 'Milwaukee-Eight 114 • Billiard Red • Custom Exhaust • LED Lighting'
      }
    ]
  },
  'road-glide': {
    name: 'Road Glide',
    slug: 'road-glide',
    displayName: 'Road Glide',
    content: `The used Road Glide in Milwaukee is for riders who want something different. That frame-mounted sharknose fairing isn't just styling – it's better aerodynamics, less front-end weight, and superior wind management. Milwaukee riders who know bikes choose the Road Glide because it handles better at speed, cuts through crosswinds like they're nothing, and gives you that aggressive touring look that stands out.

The Milwaukee-Eight 107 or 114 in these Road Glides delivers the same reliable power as the Street Glide, but the frame-mounted fairing changes everything about how it rides. Less weight on the front end means better handling in corners. Better wind management means less fatigue on long rides. That sharknose design isn't just for looks – it works.

Every used Road Glide we sell in Milwaukee gets the same treatment: full inspection, service history, Carfax, 48-hour guarantee. I check compression, transmission smoothness, frame condition, all of it. These bikes are ready to ride, not fixer-uppers. You get complete documentation, photos of any issues, and honest pricing. No games.

Common upgrades on our Road Glides: Stage 1 and Stage 2 performance packages, premium audio upgrades, custom paint, touring accessories. The kind of stuff that costs serious money if you add it new. We price these bikes based on condition and upgrades, not market hype. Fair pricing, no BS.

Wisconsin riding is tough. These Road Glides have proven they can handle Milwaukee's mix of city traffic, highway miles, and backroad adventures. Every bike in our inventory has been ridden, maintained, and inspected. That's what you get when you buy from someone who actually rides, not a corporate dealer.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Road Glide Special',
        price: '$24,500',
        miles: '3,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Audio'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road Glide',
        price: '$22,000',
        miles: '7,200',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 107 • Vivid Black • Tour-Pak • Highway Pegs'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Road Glide Special',
        price: '$20,999',
        miles: '11,000',
        image: 'https://files.catbox.moe/4q7w3e.jpg',
        specs: 'Milwaukee-Eight 114 • Billiard Red • Custom Exhaust • LED Accents'
      }
    ]
  },
  'fat-boy': {
    name: 'Fat Boy',
    slug: 'fat-boy',
    displayName: 'Fat Boy',
    content: `The used Fat Boy in Milwaukee is an icon. Those solid-disc wheels, that muscular stance, the Milwaukee-Eight power – it's the bike that made Harley-Davidson legendary. Milwaukee riders choose the Fat Boy because it's unmistakable, powerful, and built to last. This isn't a bike that blends in – it's a statement.

The Milwaukee-Eight 107 or 114 in these Fat Boys delivers smooth, reliable power. Not the peaky, high-RPM stuff – we're talking torque that pulls from idle, power that's usable on city streets and highway cruises. The solid-disc wheels aren't just for looks – they're part of what makes this bike feel planted and stable.

Every used Fat Boy we sell in Milwaukee comes with full documentation: service history, Carfax, inspection reports, our 48-hour guarantee. I check every bike personally – engine, transmission, frame, electrical, all of it. These bikes are ready to ride, not projects. You get honest pricing, complete transparency, no surprises.

Common upgrades on our Fat Boys: performance exhaust systems, Stage 1 kits, custom paint, aftermarket wheels, upgraded seats. The kind of mods that make these bikes unique. We price based on condition and upgrades, not hype. Fair pricing, no dealer games.

Milwaukee riders know the Fat Boy. It's been around, it's proven, and it works on Wisconsin roads. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's the difference between buying from someone who knows bikes versus a corporate dealer.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Fat Boy 114',
        price: '$20,500',
        miles: '2,100',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Fat Boy',
        price: '$18,999',
        miles: '6,500',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 107 • Billiard Red • Premium Wheels • Upgraded Seat'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Fat Boy 114',
        price: '$17,500',
        miles: '10,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • LED Lighting'
      }
    ]
  },
  'heritage-classic': {
    name: 'Heritage Classic',
    slug: 'heritage-classic',
    displayName: 'Heritage Classic',
    content: `The used Heritage Classic in Milwaukee is for riders who want that authentic vintage look with modern reliability. Classic paint, chrome everywhere, that retro styling that pays homage to Harley-Davidson's history. Milwaukee riders choose the Heritage Classic because it looks like it came from another era but rides like a modern bike.

The Milwaukee-Eight 107 in these Heritage Classics delivers smooth, reliable power. Not the peaky stuff – we're talking torque that's usable, power delivery that's smooth across the RPM range. The classic styling includes retro paint schemes, chrome accents, and design elements that look like they came from the '50s but with modern engineering underneath.

Every used Heritage Classic we sell in Milwaukee gets the full treatment: inspection, service history, Carfax, 48-hour guarantee. I check compression, transmission, frame condition, all of it. These bikes are ready to ride, not restoration projects. You get complete documentation and honest pricing.

Common upgrades on our Heritage Classics: performance exhaust, custom paint, chrome accessories, upgraded seats, luggage options. Stuff that enhances the classic look while adding modern functionality. We price these bikes fair – condition and upgrades, not market hype.

Wisconsin roads are tough, but these Heritage Classics handle them. Every bike in our inventory has been ridden on Milwaukee streets, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually rides these bikes, not a dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Heritage Classic 114',
        price: '$21,000',
        miles: '3,200',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Premium Chrome'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Heritage Classic',
        price: '$19,500',
        miles: '7,800',
        image: 'https://files.catbox.moe/9t6u8x.jpg',
        specs: 'Milwaukee-Eight 107 • Billiard Red • Custom Paint • Tour-Pak'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Heritage Classic 114',
        price: '$18,000',
        miles: '11,500',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Premium Accessories'
      }
    ]
  },
  'low-rider-s': {
    name: 'Low Rider S',
    slug: 'low-rider-s',
    displayName: 'Low Rider S',
    content: `The used Low Rider S in Milwaukee is for riders who want performance. Forward controls, aggressive stance, Milwaukee-Eight 117 power – this is Harley's sport cruiser, built for riders who want to push it. Milwaukee riders choose the Low Rider S because it handles, accelerates, and looks aggressive.

The Milwaukee-Eight 117 in these Low Rider S models is the biggest engine Harley makes for this platform. We're talking 127 ft-lb of torque, power that pulls hard from idle, acceleration that'll put a smile on your face. The forward-mounted foot controls and aggressive ergonomics put you in a sporty position – this isn't a laid-back cruiser.

Every used Low Rider S we sell in Milwaukee comes with full documentation: service history, Carfax, inspection reports, 48-hour guarantee. I check every bike – compression, transmission smoothness, frame condition, all of it. These bikes are ready to ride hard, not fix.

Common upgrades on our Low Rider S bikes: Stage 1 and Stage 2 performance packages, aftermarket exhaust, upgraded suspension, custom bars, performance tires. The kind of mods that enhance what this bike does best – go fast and handle well. We price based on condition and upgrades, fair pricing.

Milwaukee's mix of city streets and open roads is perfect for the Low Rider S. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually rides these bikes hard, not a dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Low Rider S',
        price: '$22,500',
        miles: '2,800',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 117 • Vivid Black • Stage 1 • Performance Exhaust'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Low Rider S',
        price: '$20,999',
        miles: '5,600',
        image: 'https://files.catbox.moe/4q7w3e.jpg',
        specs: 'Milwaukee-Eight 117 • Billiard Red • Stage 2 • Upgraded Suspension'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Low Rider S',
        price: '$19,500',
        miles: '9,400',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 117 • Gunship Gray • Stage 1 • Custom Bars'
      }
    ]
  },
  'breakout': {
    name: 'Breakout',
    slug: 'breakout',
    displayName: 'Breakout',
    content: `The used Breakout in Milwaukee is Harley's power cruiser – wide rear tire, slammed stance, Milwaukee-Eight 114 power. This is the bike for riders who want to make a statement. Milwaukee riders choose the Breakout because it looks aggressive, rides aggressive, and turns heads everywhere.

The Milwaukee-Eight 114 in these Breakouts delivers 122 ft-lb of torque – power that pulls hard from idle, acceleration that's immediate. The wide 240mm rear tire and slammed suspension create that power cruiser look that sets it apart. This isn't a bike that blends in – it's built to stand out.

Every used Breakout we sell in Milwaukee gets the full inspection: engine, transmission, frame, all of it. Service history, Carfax, 48-hour guarantee. These bikes are ready to ride, not projects. You get complete documentation and honest pricing – no dealer games.

Common upgrades on our Breakouts: Stage 1 and Stage 2 performance packages, aftermarket exhaust, custom paint, upgraded wheels, performance suspension. The kind of mods that enhance the power cruiser aesthetic. We price based on condition and upgrades, fair pricing.

Milwaukee streets are perfect for the Breakout's aggressive styling. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually rides these bikes, not a corporate dealer.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Breakout 114',
        price: '$21,500',
        miles: '1,900',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 114 • Vivid Black • Stage 1 • Custom Exhaust'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Breakout',
        price: '$19,999',
        miles: '6,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Milwaukee-Eight 114 • Billiard Red • Stage 2 • Premium Wheels'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Breakout 114',
        price: '$18,500',
        miles: '10,800',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Milwaukee-Eight 114 • Gunship Gray • Stage 1 • Custom Paint'
      }
    ]
  },
  'softail-standard': {
    name: 'Softail Standard',
    slug: 'softail-standard',
    displayName: 'Softail Standard',
    content: `The used Softail Standard in Milwaukee is the foundation of Harley's cruiser lineup – clean design, Milwaukee-Eight power, that classic Softail look. Milwaukee riders choose the Softail Standard because it's a blank canvas – you can customize it however you want, or ride it stock and it still looks great.

The Milwaukee-Eight 107 in these Softail Standards delivers smooth, reliable power. Not the peaky stuff – we're talking torque that's usable, power delivery that's smooth. The hidden rear suspension gives you that hardtail look with modern ride quality. It's the best of both worlds.

Every used Softail Standard we sell in Milwaukee comes with full documentation: service history, Carfax, inspection reports, 48-hour guarantee. I check every bike – compression, transmission, frame condition, all of it. These bikes are ready to ride, not fix.

Common upgrades on our Softail Standards: performance exhaust, Stage 1 kits, custom paint, aftermarket bars, upgraded seats. The kind of mods that make these bikes unique. We price based on condition and upgrades, fair pricing.

Wisconsin roads work well with the Softail Standard's balanced design. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually rides, not a dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Softail Standard',
        price: '$16,500',
        miles: '3,500',
        image: 'https://files.catbox.moe/9t6u8x.jpg',
        specs: 'Milwaukee-Eight 107 • Vivid Black • Stage 1 • Custom Bars'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Softail Standard',
        price: '$15,000',
        miles: '8,100',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Milwaukee-Eight 107 • Billiard Red • Performance Exhaust • Upgraded Seat'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Softail Standard',
        price: '$13,999',
        miles: '12,300',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Milwaukee-Eight 107 • Gunship Gray • Stage 1 • Custom Paint'
      }
    ]
  },
  'road-king': {
    name: 'Road King',
    slug: 'road-king',
    displayName: 'Road King',
    content: `The used Road King in Milwaukee is the classic American touring bike – detachable windshield, hard saddlebags, Milwaukee-Eight power. Milwaukee riders choose the Road King because it's versatile – strip the windshield for city riding, add it back for touring. It's the bike that does everything.

The Milwaukee-Eight 107 in these Road Kings delivers smooth, reliable power for touring. Not peaky performance – we're talking torque that pulls from idle, power delivery that's smooth across the RPM range. The classic styling includes chrome accents, traditional paint, and that iconic Harley-Davidson touring look.

Every used Road King we sell in Milwaukee gets the full inspection: engine, transmission, frame, all of it. Service history, Carfax, 48-hour guarantee. These bikes are ready to tour, not fix. You get complete documentation and honest pricing.

Common upgrades on our Road Kings: performance exhaust, Stage 1 kits, custom paint, touring accessories, upgraded audio. The kind of mods that enhance touring capability. We price based on condition and upgrades, fair pricing.

Milwaukee's location makes it perfect for Road King touring – head north to Door County, east to Lake Michigan, or south to Chicago. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually tours on these bikes.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Road King Special',
        price: '$22,000',
        miles: '4,600',
        image: 'https://files.catbox.moe/4q7w3e.jpg',
        specs: 'Milwaukee-Eight 107 • Vivid Black • Stage 1 • Tour-Pak'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Road King',
        price: '$20,500',
        miles: '7,900',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Milwaukee-Eight 107 • Billiard Red • Premium Audio • Highway Pegs'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Road King Special',
        price: '$19,000',
        miles: '11,200',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Milwaukee-Eight 107 • Gunship Gray • Stage 1 • Custom Paint'
      }
    ]
  },
  'pan-america-1250': {
    name: 'Pan America 1250',
    slug: 'pan-america-1250',
    displayName: 'Pan America 1250',
    content: `The used Pan America 1250 in Milwaukee is Harley's adventure bike – Revolution Max engine, off-road capability, on-road performance. Milwaukee riders choose the Pan America because it's different – it handles dirt roads, highway miles, and everything in between. This is Harley doing something new.

The Revolution Max 1250 engine delivers 94 ft-lb of torque – power that's smooth, usable, and reliable. The adjustable suspension, multiple riding modes, and advanced electronics make this bike versatile. Whether you're exploring Wisconsin's back roads or commuting through Milwaukee, the Pan America handles it.

Every used Pan America we sell in Milwaukee comes with full documentation: service history, inspection reports, 48-hour guarantee. I check every bike – engine, suspension, electronics, all of it. These bikes are ready to ride, not fix. You get complete transparency and honest pricing.

Common upgrades on our Pan Americas: luggage systems, crash protection, adventure accessories, performance exhaust, upgraded suspension. The kind of mods that enhance adventure capability. We price based on condition and upgrades, fair pricing.

Wisconsin's mix of paved roads and dirt trails is perfect for the Pan America. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually rides these bikes off-road, not a dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Pan America 1250 Special',
        price: '$19,500',
        miles: '3,100',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Revolution Max 1250 • Vivid Black • Adventure Package • Luggage'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Pan America 1250',
        price: '$17,999',
        miles: '6,800',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Revolution Max 1250 • Billiard Red • Crash Protection • Touring Setup'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Pan America 1250 Special',
        price: '$16,500',
        miles: '10,500',
        image: 'https://files.catbox.moe/9t6u8x.jpg',
        specs: 'Revolution Max 1250 • Gunship Gray • Adventure Accessories • Performance Exhaust'
      }
    ]
  },
  'nightster': {
    name: 'Nightster',
    slug: 'nightster',
    displayName: 'Nightster',
    content: `The used Nightster in Milwaukee is Harley's modern sport cruiser – Revolution Max 975 engine, aggressive styling, nimble handling. Milwaukee riders choose the Nightster because it's different – it's not a traditional cruiser, it's a sporty bike that handles well and looks aggressive.

The Revolution Max 975 engine delivers 70 ft-lb of torque – power that's smooth, usable, and perfect for city riding and highway cruising. The sporty ergonomics, aggressive styling, and nimble handling make this bike fun to ride. Whether you're navigating Milwaukee traffic or exploring back roads, the Nightster delivers.

Every used Nightster we sell in Milwaukee comes with full documentation: service history, inspection reports, 48-hour guarantee. I check every bike – engine, suspension, electronics, all of it. These bikes are ready to ride, not fix. You get complete transparency and honest pricing.

Common upgrades on our Nightsters: performance exhaust, Stage 1 kits, custom bars, upgraded suspension, aftermarket accessories. The kind of mods that enhance the sporty character. We price based on condition and upgrades, fair pricing.

Milwaukee's city streets are perfect for the Nightster's nimble handling. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually rides these bikes, not a dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Nightster',
        price: '$14,500',
        miles: '2,400',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Revolution Max 975 • Vivid Black • Stage 1 • Performance Exhaust'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Nightster',
        price: '$13,000',
        miles: '5,700',
        image: 'https://files.catbox.moe/2p9m1k.jpg',
        specs: 'Revolution Max 975 • Billiard Red • Custom Bars • Upgraded Suspension'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Nightster',
        price: '$11,999',
        miles: '9,100',
        image: 'https://files.catbox.moe/4q7w3e.jpg',
        specs: 'Revolution Max 975 • Gunship Gray • Stage 1 • Aftermarket Accessories'
      }
    ]
  },
  'sportster-s': {
    name: 'Sportster S',
    slug: 'sportster-s',
    displayName: 'Sportster S',
    content: `The used Sportster S in Milwaukee is Harley's performance sport cruiser – Revolution Max 1250 engine, aggressive styling, sporty handling. Milwaukee riders choose the Sportster S because it's fast, handles well, and looks aggressive. This is the Sportster reimagined for performance.

The Revolution Max 1250 engine delivers 94 ft-lb of torque – power that pulls hard, acceleration that's immediate. The sporty ergonomics, aggressive styling, and responsive handling make this bike fun to ride hard. Whether you're pushing it on back roads or navigating city traffic, the Sportster S delivers.

Every used Sportster S we sell in Milwaukee comes with full documentation: service history, inspection reports, 48-hour guarantee. I check every bike – engine, suspension, electronics, all of it. These bikes are ready to ride hard, not fix. You get complete transparency and honest pricing.

Common upgrades on our Sportster S bikes: performance exhaust, Stage 1 and Stage 2 kits, upgraded suspension, custom bars, aftermarket accessories. The kind of mods that enhance performance. We price based on condition and upgrades, fair pricing.

Milwaukee's mix of city streets and open roads is perfect for the Sportster S. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually rides these bikes hard, not a dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Sportster S',
        price: '$16,500',
        miles: '1,800',
        image: 'https://files.catbox.moe/6r5t7u.jpg',
        specs: 'Revolution Max 1250 • Vivid Black • Stage 1 • Performance Exhaust'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Sportster S',
        price: '$15,000',
        miles: '4,500',
        image: 'https://files.catbox.moe/8v7x1z.jpg',
        specs: 'Revolution Max 1250 • Billiard Red • Stage 2 • Upgraded Suspension'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Sportster S',
        price: '$13,999',
        miles: '8,200',
        image: 'https://files.catbox.moe/3n8q1r.jpg',
        specs: 'Revolution Max 1250 • Gunship Gray • Stage 1 • Custom Bars'
      }
    ]
  },
  'iron-883': {
    name: 'Iron 883',
    slug: 'iron-883',
    displayName: 'Iron 883',
    content: `The used Iron 883 in Milwaukee is the entry point to Harley-Davidson – Evolution 883 engine, classic styling, affordable price. Milwaukee riders choose the Iron 883 because it's accessible, reliable, and customizable. This is the bike that gets people into Harley ownership.

The Evolution 883 engine delivers 54 ft-lb of torque – power that's smooth, reliable, and perfect for city riding and highway cruising. The classic styling, nimble handling, and affordable price make this bike a great first Harley. Whether you're learning to ride or want a nimble city bike, the Iron 883 delivers.

Every used Iron 883 we sell in Milwaukee comes with full documentation: service history, inspection reports, 48-hour guarantee. I check every bike – engine, transmission, frame, all of it. These bikes are ready to ride, not fix. You get complete transparency and honest pricing.

Common upgrades on our Iron 883 bikes: performance exhaust, Stage 1 kits, custom bars, upgraded seats, aftermarket accessories. The kind of mods that make these bikes unique. We price based on condition and upgrades, fair pricing.

Milwaukee's city streets are perfect for the Iron 883's nimble handling. Every bike in our inventory has been ridden, maintained properly, and inspected thoroughly. That's what you get when you buy from someone who actually rides these bikes, not a dealer who just moves inventory.`,
    exampleBikes: [
      {
        year: '2023',
        name: '2023 Harley-Davidson Iron 883',
        price: '$9,500',
        miles: '2,600',
        image: 'https://files.catbox.moe/7p4h2s.jpg',
        specs: 'Evolution 883 • Vivid Black • Stage 1 • Performance Exhaust'
      },
      {
        year: '2022',
        name: '2022 Harley-Davidson Iron 883',
        price: '$8,500',
        miles: '5,400',
        image: 'https://files.catbox.moe/9t6u8x.jpg',
        specs: 'Evolution 883 • Billiard Red • Custom Bars • Upgraded Seat'
      },
      {
        year: '2021',
        name: '2021 Harley-Davidson Iron 883',
        price: '$7,999',
        miles: '9,800',
        image: 'https://files.catbox.moe/1y3h5j.jpg',
        specs: 'Evolution 883 • Gunship Gray • Stage 1 • Aftermarket Accessories'
      }
    ]
  }
};

export function getModelPageData(slug: string): ModelPageData | null {
  return modelPagesData[slug.toLowerCase()] || null;
}

export function getAllModelPageSlugs(): string[] {
  return Object.keys(modelPagesData);
}

