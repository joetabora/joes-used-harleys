/**
 * Model-specific data for Harley-Davidson motorcycles
 * Used for dynamic model pages with SEO content, specs, and financing info
 */

export interface ModelData {
  name: string;
  slug: string;
  seoContent: string; // 300-500 words
  specs: {
    engine: string;
    displacement: string;
    torque: string;
    fuelCapacity: string;
    seatHeight: string;
    weight: string;
    transmission: string;
    wheelbase: string;
  };
  startingPrice: string;
  financingInfo: string;
  image?: string;
}

export const modelDatabase: { [key: string]: ModelData } = {
  'street-glide': {
    name: 'Street Glide',
    slug: 'street-glide',
    seoContent: `When searching for a used Street Glide in Milwaukee, you're looking at one of Harley-Davidson's most iconic touring motorcycles. The Street Glide combines the legendary Milwaukee-Eight engine with a distinctive batwing fairing, premium audio system, and touring-focused ergonomics that make it perfect for long-distance rides along Lake Michigan or cross-country adventures. Milwaukee riders consistently choose the Street Glide for its perfect balance of style, comfort, and performance.

Our used Street Glide motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 107 or 114 cubic inch engine, delivering smooth power delivery and exceptional reliability. The frame-mounted batwing fairing provides excellent wind protection while maintaining the classic Harley-Davidson aesthetic that riders love. Whether you're commuting through Milwaukee's city streets or embarking on weekend tours through Wisconsin's scenic countryside, the Street Glide delivers the performance and comfort you demand.

Every used Street Glide we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County, Waukesha, Racine, and all of southeastern Wisconsin. Our inventory includes low-mileage Street Glides with premium upgrades like Stage 1 performance kits, custom exhaust systems, and enhanced audio packages that would cost thousands more if added to a new bike.

Milwaukee riders appreciate the Street Glide's versatility – it's equally at home on city streets as it is on the open highway. The comfortable riding position, ample storage capacity, and advanced infotainment system make it ideal for both daily commuting and extended touring. When you buy a used Street Glide in Milwaukee from Joe's Used Harleys, you're getting a motorcycle that's been proven reliable on Wisconsin roads and maintained to the highest standards.`,
    specs: {
      engine: 'Milwaukee-Eight 107 or 114',
      displacement: '107 cu in (1,753 cc) or 114 cu in (1,868 cc)',
      torque: '111 ft-lb @ 3,250 rpm (107) or 122 ft-lb @ 3,000 rpm (114)',
      fuelCapacity: '6.0 gallons',
      seatHeight: '26.1 inches',
      weight: '805 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$21,000',
    financingInfo: 'Financing available starting at $299/month with approved credit. We work with multiple lenders to secure competitive rates for all credit situations, including first-time buyers and self-employed individuals.',
    image: 'https://i.imgur.com/3Vzbyie.jpeg'
  },
  'road-glide': {
    name: 'Road Glide',
    slug: 'road-glide',
    seoContent: `The used Road Glide in Milwaukee represents Harley-Davidson's most distinctive touring platform, featuring the iconic frame-mounted sharknose fairing that sets it apart from every other motorcycle on the road. Milwaukee riders who choose the Road Glide appreciate its aggressive styling, superior wind protection, and stable handling characteristics that make it ideal for high-speed touring and long-distance adventures.

Our used Road Glide motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight engine platform, delivering exceptional power and smooth operation across all RPM ranges. The frame-mounted fairing provides superior aerodynamics and wind management compared to fork-mounted fairings, resulting in reduced rider fatigue on extended rides. Whether you're cruising along Lake Michigan's shoreline or exploring Wisconsin's country roads, the Road Glide delivers the performance and comfort that serious touring riders demand.

Every used Road Glide we sell in Milwaukee undergoes comprehensive inspection, includes complete service history, and comes with our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee, Waukesha, Racine, and southeastern Wisconsin. Our inventory includes Road Glides with premium upgrades like Stage 1 and Stage 2 performance packages, custom audio systems, and touring accessories that enhance both performance and comfort.

Milwaukee riders consistently choose the Road Glide for its unique combination of aggressive styling and touring functionality. The frame-mounted fairing provides excellent wind protection while maintaining the bike's distinctive appearance, and the comfortable riding position makes it perfect for extended journeys. When you buy a used Road Glide in Milwaukee from Joe's Used Harleys, you're investing in a motorcycle that's been proven reliable and maintained to the highest standards.`,
    specs: {
      engine: 'Milwaukee-Eight 107 or 114',
      displacement: '107 cu in (1,753 cc) or 114 cu in (1,868 cc)',
      torque: '111 ft-lb @ 3,250 rpm (107) or 122 ft-lb @ 3,000 rpm (114)',
      fuelCapacity: '6.0 gallons',
      seatHeight: '26.1 inches',
      weight: '850 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$22,000',
    financingInfo: 'Financing available starting at $319/month with approved credit. Competitive rates available for all credit situations, including bad credit, first-time buyers, and self-employed individuals.',
    image: 'https://i.imgur.com/2Vzbyie.jpeg'
  },
  'road-king': {
    name: 'Road King',
    slug: 'road-king',
    seoContent: `The used Road King in Milwaukee represents the classic American touring motorcycle, combining timeless styling with modern performance and reliability. Milwaukee riders who choose the Road King appreciate its traditional design, comfortable touring capabilities, and the ability to customize it to their personal preferences. With its detachable windshield and classic hard saddlebags, the Road King offers the perfect blend of heritage styling and contemporary engineering.

Our used Road King motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight engine, delivering smooth power delivery and exceptional reliability. The classic styling includes chrome accents, traditional paint schemes, and the iconic Harley-Davidson silhouette that has defined American motorcycling for generations. Whether you're commuting through Milwaukee's streets or embarking on cross-country tours, the Road King delivers the performance and style that touring riders demand.

Every used Road King we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes low-mileage Road Kings with premium upgrades like performance exhaust systems, custom paint, and touring accessories that enhance both aesthetics and functionality.

Milwaukee riders consistently choose the Road King for its versatility and classic appeal. The detachable windshield allows for customization based on riding conditions, while the comfortable touring seat and ergonomics make it perfect for extended journeys. When you buy a used Road King in Milwaukee from Joe's Used Harleys, you're investing in a motorcycle that combines heritage styling with modern reliability and performance.`,
    specs: {
      engine: 'Milwaukee-Eight 107',
      displacement: '107 cu in (1,753 cc)',
      torque: '111 ft-lb @ 3,250 rpm',
      fuelCapacity: '6.0 gallons',
      seatHeight: '26.1 inches',
      weight: '820 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$20,500',
    financingInfo: 'Financing available starting at $289/month with approved credit. We work with multiple lenders to secure competitive rates for all credit situations.',
    image: 'https://i.imgur.com/4Vzbyie.jpeg'
  },
  'sportster': {
    name: 'Sportster',
    slug: 'sportster',
    seoContent: `The used Sportster in Milwaukee represents Harley-Davidson's most versatile and accessible platform, offering nimble handling, classic V-twin power, and endless customization potential. Milwaukee riders who choose the Sportster appreciate its lightweight design, responsive performance, and the ability to make it uniquely their own. Whether you're a first-time Harley owner or a seasoned rider looking for a nimble city bike, the Sportster delivers the authentic Harley-Davidson experience in a compact, manageable package.

Our used Sportster motorcycles for sale in Milwaukee include both 883 and 1200 models, each offering distinct performance characteristics and styling options. The Evolution engine platform provides reliable power delivery and the classic Harley-Davidson sound that riders love. Whether you're commuting through Milwaukee's city streets, exploring Wisconsin's back roads, or customizing your Sportster for a unique look, this platform offers the perfect foundation for your riding lifestyle.

Every used Sportster we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Sportsters with various customization levels, from stock configurations to heavily modified bikes with performance upgrades, custom paint, and aftermarket accessories.

Milwaukee riders consistently choose the Sportster for its versatility, affordability, and customization potential. The lightweight design makes it perfect for city riding and maneuvering through traffic, while the powerful engine provides plenty of performance for highway cruising and weekend adventures. When you buy a used Sportster in Milwaukee from Joe's Used Harleys, you're getting a motorcycle that offers the perfect entry point into Harley-Davidson ownership with the reliability and performance that riders demand.`,
    specs: {
      engine: 'Evolution 883 or 1200',
      displacement: '883 cc or 1,200 cc',
      torque: '54 ft-lb @ 3,750 rpm (883) or 73 ft-lb @ 3,500 rpm (1200)',
      fuelCapacity: '3.3 gallons',
      seatHeight: '27.3 inches',
      weight: '545 lbs (dry)',
      transmission: '5-speed',
      wheelbase: '60.0 inches'
    },
    startingPrice: '$8,500',
    financingInfo: 'Financing available starting at $149/month with approved credit. Perfect for first-time buyers and riders looking for an affordable entry into Harley-Davidson ownership.',
    image: 'https://i.imgur.com/5Vzbyie.jpeg'
  },
  'softail': {
    name: 'Softail',
    slug: 'softail',
    seoContent: `The used Softail in Milwaukee represents Harley-Davidson's classic cruiser platform, combining traditional styling with modern engineering and performance. Milwaukee riders who choose the Softail appreciate its clean, minimalist design, comfortable riding position, and the smooth ride quality that comes from the hidden rear suspension system. Whether you prefer the classic Heritage Classic, the muscular Fat Boy, or the sporty Breakout, the Softail platform offers a model to match your personal style and riding preferences.

Our used Softail motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight engine, delivering smooth power delivery and exceptional reliability. The Softail frame design eliminates visible rear suspension components, creating the clean, hardtail look that riders love while providing modern suspension comfort. Whether you're cruising through Milwaukee's streets or embarking on weekend adventures, the Softail delivers the performance and style that cruiser riders demand.

Every used Softail we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes various Softail models with premium upgrades like performance exhaust systems, custom paint, and aftermarket accessories that enhance both aesthetics and performance.

Milwaukee riders consistently choose the Softail for its classic styling, comfortable ride, and versatile platform that accommodates various riding styles. The hidden rear suspension provides modern comfort while maintaining the traditional hardtail appearance, and the powerful engine delivers the performance that riders expect. When you buy a used Softail in Milwaukee from Joe's Used Harleys, you're investing in a motorcycle that combines heritage styling with contemporary reliability and performance.`,
    specs: {
      engine: 'Milwaukee-Eight 107 or 114',
      displacement: '107 cu in (1,753 cc) or 114 cu in (1,868 cc)',
      torque: '111 ft-lb @ 3,250 rpm (107) or 122 ft-lb @ 3,000 rpm (114)',
      fuelCapacity: '5.0 gallons',
      seatHeight: '26.0 inches',
      weight: '680 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$18,500',
    financingInfo: 'Financing available starting at $259/month with approved credit. Competitive rates available for all credit situations.',
    image: 'https://i.imgur.com/6Vzbyie.jpeg'
  },
  'fat-bob': {
    name: 'Fat Bob',
    slug: 'fat-bob',
    seoContent: `The used Fat Bob in Milwaukee represents Harley-Davidson's aggressive, performance-focused cruiser, combining muscular styling with powerful engine performance and responsive handling. Milwaukee riders who choose the Fat Bob appreciate its distinctive dual headlight design, wide front tire, and the powerful Milwaukee-Eight engine that delivers exceptional acceleration and torque. Whether you're navigating Milwaukee's city streets or exploring Wisconsin's back roads, the Fat Bob delivers the aggressive performance and bold styling that riders demand.

Our used Fat Bob motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 107 or 114 engine, delivering smooth power delivery and exceptional reliability. The aggressive styling includes the distinctive dual headlight configuration, wide front tire, and muscular fuel tank design that sets it apart from other cruisers. Whether you're commuting through Milwaukee or embarking on weekend adventures, the Fat Bob delivers the performance and style that aggressive riders demand.

Every used Fat Bob we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Fat Bobs with premium upgrades like performance exhaust systems, Stage 1 and Stage 2 performance packages, and custom accessories that enhance both aesthetics and performance.

Milwaukee riders consistently choose the Fat Bob for its aggressive styling, powerful performance, and responsive handling characteristics. The wide front tire provides excellent stability and cornering confidence, while the powerful engine delivers the acceleration and torque that performance-oriented riders demand. When you buy a used Fat Bob in Milwaukee from Joe's Used Harleys, you're investing in a motorcycle that combines aggressive styling with powerful performance and modern reliability.`,
    specs: {
      engine: 'Milwaukee-Eight 107 or 114',
      displacement: '107 cu in (1,753 cc) or 114 cu in (1,868 cc)',
      torque: '111 ft-lb @ 3,250 rpm (107) or 122 ft-lb @ 3,000 rpm (114)',
      fuelCapacity: '5.0 gallons',
      seatHeight: '26.0 inches',
      weight: '680 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$19,500',
    financingInfo: 'Financing available starting at $279/month with approved credit. Competitive rates available for all credit situations.',
    image: 'https://i.imgur.com/7Vzbyie.jpeg'
  },
  'ultra-limited': {
    name: 'Ultra Limited',
    slug: 'ultra-limited',
    seoContent: `The used Ultra Limited in Milwaukee represents Harley-Davidson's flagship touring motorcycle, offering the ultimate in luxury, comfort, and long-distance touring capability. Milwaukee riders who choose the Ultra Limited appreciate its premium amenities, advanced infotainment system, and the comprehensive touring features that make cross-country journeys effortless. With its batwing fairing, premium audio system, and luxurious seating, the Ultra Limited represents the pinnacle of Harley-Davidson touring motorcycles.

Our used Ultra Limited motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 114 engine, delivering exceptional power and smooth operation across all RPM ranges. The premium touring amenities include advanced infotainment systems, premium audio packages, heated grips, and luxurious touring seats that make extended journeys comfortable and enjoyable. Whether you're embarking on cross-country tours or weekend getaways, the Ultra Limited delivers the luxury and performance that serious touring riders demand.

Every used Ultra Limited we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Ultra Limiteds with premium upgrades like enhanced audio systems, custom paint, and touring accessories that enhance both comfort and functionality.

Milwaukee riders consistently choose the Ultra Limited for its premium amenities, luxurious comfort, and comprehensive touring capabilities. The advanced infotainment system, premium audio, and comfortable seating make extended journeys enjoyable, while the powerful engine delivers the performance that touring riders demand. When you buy a used Ultra Limited in Milwaukee from Joe's Used Harleys, you're investing in the ultimate touring motorcycle that combines luxury, comfort, and performance.`,
    specs: {
      engine: 'Milwaukee-Eight 114',
      displacement: '114 cu in (1,868 cc)',
      torque: '122 ft-lb @ 3,000 rpm',
      fuelCapacity: '6.0 gallons',
      seatHeight: '26.1 inches',
      weight: '900 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$28,000',
    financingInfo: 'Financing available starting at $399/month with approved credit. Premium financing options available for qualified buyers.',
    image: 'https://i.imgur.com/8Vzbyie.jpeg'
  },
  'breakout': {
    name: 'Breakout',
    slug: 'breakout',
    seoContent: `The used Breakout in Milwaukee represents Harley-Davidson's most aggressive and style-forward cruiser, combining muscular design with powerful performance and distinctive styling. Milwaukee riders who choose the Breakout appreciate its wide rear tire, slammed stance, and the powerful Milwaukee-Eight engine that delivers exceptional acceleration and torque. Whether you're cruising through Milwaukee's streets or making a statement at local bike nights, the Breakout delivers the aggressive styling and performance that riders demand.

Our used Breakout motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 114 engine, delivering smooth power delivery and exceptional reliability. The aggressive styling includes the distinctive wide rear tire, slammed suspension, and muscular fuel tank design that creates the ultimate power cruiser aesthetic. Whether you're commuting through Milwaukee or showcasing your style, the Breakout delivers the performance and presence that aggressive riders demand.

Every used Breakout we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Breakouts with premium upgrades like performance exhaust systems, Stage 1 and Stage 2 performance packages, and custom accessories that enhance both aesthetics and performance.

Milwaukee riders consistently choose the Breakout for its aggressive styling, powerful performance, and distinctive presence. The wide rear tire and slammed stance create the ultimate power cruiser look, while the powerful engine delivers the acceleration and torque that performance-oriented riders demand. When you buy a used Breakout in Milwaukee from Joe's Used Harleys, you're investing in a motorcycle that combines aggressive styling with powerful performance and modern reliability.`,
    specs: {
      engine: 'Milwaukee-Eight 114',
      displacement: '114 cu in (1,868 cc)',
      torque: '122 ft-lb @ 3,000 rpm',
      fuelCapacity: '5.0 gallons',
      seatHeight: '26.0 inches',
      weight: '680 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$20,500',
    financingInfo: 'Financing available starting at $289/month with approved credit. Competitive rates available for all credit situations.',
    image: 'https://i.imgur.com/9Vzbyie.jpeg'
  },
  'fat-boy': {
    name: 'Fat Boy',
    slug: 'fat-boy',
    seoContent: `The used Fat Boy in Milwaukee represents one of Harley-Davidson's most iconic motorcycles, combining classic styling with modern performance and the distinctive solid-disc wheels that have made it legendary. Milwaukee riders who choose the Fat Boy appreciate its muscular presence, timeless design, and the powerful Milwaukee-Eight engine that delivers smooth power delivery and exceptional reliability. Whether you're cruising through Milwaukee's streets or making a statement wherever you go, the Fat Boy delivers the iconic styling and performance that riders demand.

Our used Fat Boy motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 107 or 114 engine, delivering smooth power delivery and exceptional reliability. The iconic styling includes the distinctive solid-disc wheels, muscular fuel tank, and classic Harley-Davidson design elements that have made the Fat Boy legendary. Whether you're commuting through Milwaukee or showcasing your style, the Fat Boy delivers the performance and presence that riders demand.

Every used Fat Boy we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Fat Boys with premium upgrades like performance exhaust systems, custom paint, and aftermarket accessories that enhance both aesthetics and performance.

Milwaukee riders consistently choose the Fat Boy for its iconic styling, muscular presence, and powerful performance. The distinctive solid-disc wheels and classic design create the ultimate cruiser aesthetic, while the powerful engine delivers the performance that riders expect. When you buy a used Fat Boy in Milwaukee from Joe's Used Harleys, you're investing in an iconic motorcycle that combines legendary styling with modern reliability and performance.`,
    specs: {
      engine: 'Milwaukee-Eight 107 or 114',
      displacement: '107 cu in (1,753 cc) or 114 cu in (1,868 cc)',
      torque: '111 ft-lb @ 3,250 rpm (107) or 122 ft-lb @ 3,000 rpm (114)',
      fuelCapacity: '5.0 gallons',
      seatHeight: '26.0 inches',
      weight: '680 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$19,000',
    financingInfo: 'Financing available starting at $269/month with approved credit. Competitive rates available for all credit situations.',
    image: 'https://i.imgur.com/1Vzbyie.jpeg'
  },
  'heritage-classic': {
    name: 'Heritage Classic',
    slug: 'heritage-classic',
    seoContent: `The used Heritage Classic in Milwaukee represents Harley-Davidson's tribute to classic American motorcycling, combining retro styling with modern engineering and performance. Milwaukee riders who choose the Heritage Classic appreciate its authentic vintage design, comfortable touring capabilities, and the powerful Milwaukee-Eight engine that delivers smooth power delivery and exceptional reliability. Whether you're cruising through Milwaukee's streets or embarking on weekend adventures, the Heritage Classic delivers the classic styling and performance that riders demand.

Our used Heritage Classic motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 107 engine, delivering smooth power delivery and exceptional reliability. The authentic vintage styling includes classic paint schemes, chrome accents, and traditional design elements that pay homage to Harley-Davidson's heritage. Whether you're commuting through Milwaukee or showcasing your appreciation for classic design, the Heritage Classic delivers the performance and style that riders demand.

Every used Heritage Classic we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Heritage Classics with premium upgrades like performance exhaust systems, custom paint, and touring accessories that enhance both aesthetics and functionality.

Milwaukee riders consistently choose the Heritage Classic for its authentic vintage styling, comfortable ride, and modern reliability. The classic design elements create the ultimate retro cruiser aesthetic, while the powerful engine delivers the performance that riders expect. When you buy a used Heritage Classic in Milwaukee from Joe's Used Harleys, you're investing in a motorcycle that combines heritage styling with contemporary reliability and performance.`,
    specs: {
      engine: 'Milwaukee-Eight 107',
      displacement: '107 cu in (1,753 cc)',
      torque: '111 ft-lb @ 3,250 rpm',
      fuelCapacity: '5.0 gallons',
      seatHeight: '26.0 inches',
      weight: '680 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$19,500',
    financingInfo: 'Financing available starting at $279/month with approved credit. Competitive rates available for all credit situations.',
    image: 'https://i.imgur.com/4Vzbyie.jpeg'
  },
  'low-rider': {
    name: 'Low Rider',
    slug: 'low-rider',
    seoContent: `The used Low Rider in Milwaukee represents Harley-Davidson's sporty cruiser platform, combining aggressive styling with powerful performance and responsive handling. Milwaukee riders who choose the Low Rider appreciate its forward-mounted foot controls, sporty ergonomics, and the powerful Milwaukee-Eight engine that delivers exceptional acceleration and torque. Whether you're navigating Milwaukee's city streets or exploring Wisconsin's back roads, the Low Rider delivers the sporty performance and aggressive styling that riders demand.

Our used Low Rider motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 107 or 114 engine, delivering smooth power delivery and exceptional reliability. The sporty styling includes forward-mounted foot controls, aggressive handlebars, and the distinctive Low Rider aesthetic that sets it apart from other cruisers. Whether you're commuting through Milwaukee or showcasing your style, the Low Rider delivers the performance and presence that sporty riders demand.

Every used Low Rider we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Low Riders with premium upgrades like performance exhaust systems, Stage 1 and Stage 2 performance packages, and custom accessories that enhance both aesthetics and performance.

Milwaukee riders consistently choose the Low Rider for its sporty styling, powerful performance, and responsive handling characteristics. The forward-mounted foot controls and aggressive ergonomics create the ultimate sport cruiser experience, while the powerful engine delivers the acceleration and torque that performance-oriented riders demand. When you buy a used Low Rider in Milwaukee from Joe's Used Harleys, you're investing in a motorcycle that combines sporty styling with powerful performance and modern reliability.`,
    specs: {
      engine: 'Milwaukee-Eight 107 or 114',
      displacement: '107 cu in (1,753 cc) or 114 cu in (1,868 cc)',
      torque: '111 ft-lb @ 3,250 rpm (107) or 122 ft-lb @ 3,000 rpm (114)',
      fuelCapacity: '5.0 gallons',
      seatHeight: '26.0 inches',
      weight: '680 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$20,000',
    financingInfo: 'Financing available starting at $289/month with approved credit. Competitive rates available for all credit situations.',
    image: 'https://i.imgur.com/5Vzbyie.jpeg'
  },
  'electra-glide': {
    name: 'Electra Glide',
    slug: 'electra-glide',
    seoContent: `The used Electra Glide in Milwaukee represents Harley-Davidson's classic full-dress touring motorcycle, combining comprehensive touring amenities with powerful performance and reliable engineering. Milwaukee riders who choose the Electra Glide appreciate its full fairing, spacious hard saddlebags, and the powerful Milwaukee-Eight engine that delivers smooth power delivery for extended touring. Whether you're embarking on cross-country journeys or weekend getaways, the Electra Glide delivers the comprehensive touring capabilities that riders demand.

Our used Electra Glide motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 107 engine, delivering smooth power delivery and exceptional reliability. The comprehensive touring amenities include full fairing for wind protection, spacious hard saddlebags for storage, and comfortable touring seats that make extended journeys comfortable. Whether you're commuting through Milwaukee or embarking on long-distance tours, the Electra Glide delivers the performance and comfort that touring riders demand.

Every used Electra Glide we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Electra Glides with premium upgrades like enhanced audio systems, custom paint, and touring accessories that enhance both comfort and functionality.

Milwaukee riders consistently choose the Electra Glide for its comprehensive touring amenities, comfortable ride, and reliable performance. The full fairing and spacious storage make it perfect for extended journeys, while the powerful engine delivers the performance that touring riders expect. When you buy a used Electra Glide in Milwaukee from Joe's Used Harleys, you're investing in a classic touring motorcycle that combines comprehensive amenities with reliable performance and modern engineering.`,
    specs: {
      engine: 'Milwaukee-Eight 107',
      displacement: '107 cu in (1,753 cc)',
      torque: '111 ft-lb @ 3,250 rpm',
      fuelCapacity: '6.0 gallons',
      seatHeight: '26.1 inches',
      weight: '850 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$24,500',
    financingInfo: 'Financing available starting at $349/month with approved credit. Premium financing options available for qualified buyers.',
    image: 'https://i.imgur.com/10Vzbyie.jpeg'
  },
  'softail-deluxe': {
    name: 'Softail Deluxe',
    slug: 'softail-deluxe',
    seoContent: `The used Softail Deluxe in Milwaukee represents Harley-Davidson's premium classic cruiser, combining authentic vintage styling with modern performance and luxury amenities. Milwaukee riders who choose the Softail Deluxe appreciate its classic design elements, premium chrome finishes, and the powerful Milwaukee-Eight engine that delivers smooth power delivery and exceptional reliability. Whether you're cruising through Milwaukee's streets or showcasing your appreciation for classic design, the Softail Deluxe delivers the premium styling and performance that riders demand.

Our used Softail Deluxe motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 107 engine, delivering smooth power delivery and exceptional reliability. The premium classic styling includes extensive chrome finishes, classic paint schemes, and authentic design elements that pay homage to Harley-Davidson's heritage. Whether you're commuting through Milwaukee or showcasing your style, the Softail Deluxe delivers the performance and presence that riders demand.

Every used Softail Deluxe we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Softail Deluxes with premium upgrades like performance exhaust systems, custom paint, and luxury accessories that enhance both aesthetics and functionality.

Milwaukee riders consistently choose the Softail Deluxe for its premium classic styling, comfortable ride, and modern reliability. The extensive chrome finishes and classic design elements create the ultimate premium cruiser aesthetic, while the powerful engine delivers the performance that riders expect. When you buy a used Softail Deluxe in Milwaukee from Joe's Used Harleys, you're investing in a premium motorcycle that combines classic styling with contemporary reliability and performance.`,
    specs: {
      engine: 'Milwaukee-Eight 107',
      displacement: '107 cu in (1,753 cc)',
      torque: '111 ft-lb @ 3,250 rpm',
      fuelCapacity: '5.0 gallons',
      seatHeight: '26.0 inches',
      weight: '680 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$20,000',
    financingInfo: 'Financing available starting at $289/month with approved credit. Competitive rates available for all credit situations.',
    image: 'https://i.imgur.com/11Vzbyie.jpeg'
  },
  'cv-street-glide': {
    name: 'CVO Street Glide',
    slug: 'cv-street-glide',
    seoContent: `The used CVO Street Glide in Milwaukee represents Harley-Davidson's premium touring motorcycle, combining exclusive styling with the most powerful engine and premium amenities available. Milwaukee riders who choose the CVO Street Glide appreciate its exclusive paint schemes, premium audio systems, and the powerful Milwaukee-Eight 117 engine that delivers exceptional power and performance. Whether you're embarking on cross-country tours or showcasing your appreciation for premium motorcycles, the CVO Street Glide delivers the exclusive styling and performance that riders demand.

Our used CVO Street Glide motorcycles for sale in Milwaukee feature the powerful Milwaukee-Eight 117 engine, delivering exceptional power and smooth operation across all RPM ranges. The exclusive styling includes unique paint schemes, premium audio systems, and luxury amenities that set CVO models apart from standard touring motorcycles. Whether you're commuting through Milwaukee or embarking on extended journeys, the CVO Street Glide delivers the performance and luxury that premium riders demand.

Every used CVO Street Glide we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes CVO Street Glides with premium upgrades and exclusive features that enhance both aesthetics and functionality.

Milwaukee riders consistently choose the CVO Street Glide for its exclusive styling, premium amenities, and powerful performance. The unique paint schemes and luxury features create the ultimate premium touring experience, while the powerful engine delivers the performance that premium riders demand. When you buy a used CVO Street Glide in Milwaukee from Joe's Used Harleys, you're investing in the ultimate premium touring motorcycle that combines exclusive styling with powerful performance and luxury amenities.`,
    specs: {
      engine: 'Milwaukee-Eight 117',
      displacement: '117 cu in (1,923 cc)',
      torque: '127 ft-lb @ 3,500 rpm',
      fuelCapacity: '6.0 gallons',
      seatHeight: '26.1 inches',
      weight: '805 lbs (dry)',
      transmission: '6-speed Cruise Drive',
      wheelbase: '64.0 inches'
    },
    startingPrice: '$32,000',
    financingInfo: 'Financing available starting at $449/month with approved credit. Premium financing options available for qualified buyers.',
    image: 'https://i.imgur.com/12Vzbyie.jpeg'
  },
  'pan-america': {
    name: 'Pan America',
    slug: 'pan-america',
    seoContent: `The used Pan America in Milwaukee represents Harley-Davidson's revolutionary adventure touring motorcycle, combining off-road capability with on-road performance and advanced technology. Milwaukee riders who choose the Pan America appreciate its powerful Revolution Max engine, advanced electronics, and the versatility to handle both highway cruising and off-road adventures. Whether you're exploring Wisconsin's back roads or embarking on cross-country adventures, the Pan America delivers the performance and capability that adventure riders demand.

Our used Pan America motorcycles for sale in Milwaukee feature the powerful Revolution Max 1250 engine, delivering exceptional power and smooth operation across all RPM ranges. The advanced technology includes multiple riding modes, cornering ABS, traction control, and electronic suspension adjustment that adapts to various riding conditions. Whether you're commuting through Milwaukee or exploring off-road trails, the Pan America delivers the performance and versatility that adventure riders demand.

Every used Pan America we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes Pan Americas with premium upgrades like luggage systems, crash protection, and adventure accessories that enhance both functionality and capability.

Milwaukee riders consistently choose the Pan America for its revolutionary design, advanced technology, and versatile performance. The powerful engine and advanced electronics create the ultimate adventure touring experience, while the off-road capability delivers the versatility that adventure riders demand. When you buy a used Pan America in Milwaukee from Joe's Used Harleys, you're investing in a revolutionary motorcycle that combines adventure capability with touring comfort and advanced technology.`,
    specs: {
      engine: 'Revolution Max 1250',
      displacement: '1,250 cc',
      torque: '94 ft-lb @ 6,750 rpm',
      fuelCapacity: '5.6 gallons',
      seatHeight: '32.1 inches (adjustable)',
      weight: '534 lbs (dry)',
      transmission: '6-speed',
      wheelbase: '62.2 inches'
    },
    startingPrice: '$18,000',
    financingInfo: 'Financing available starting at $259/month with approved credit. Competitive rates available for all credit situations.',
    image: 'https://i.imgur.com/13Vzbyie.jpeg'
  },
  'livewire': {
    name: 'LiveWire',
    slug: 'livewire',
    seoContent: `The used LiveWire in Milwaukee represents Harley-Davidson's revolutionary electric motorcycle, combining instant torque delivery with advanced technology and zero emissions. Milwaukee riders who choose the LiveWire appreciate its instant acceleration, silent operation, and the advanced electronics that deliver a unique riding experience. Whether you're commuting through Milwaukee's streets or exploring Wisconsin's roads, the LiveWire delivers the performance and innovation that forward-thinking riders demand.

Our used LiveWire motorcycles for sale in Milwaukee feature the powerful electric motor, delivering instant torque and smooth power delivery across all RPM ranges. The advanced technology includes multiple riding modes, regenerative braking, and smartphone connectivity that enhances the riding experience. Whether you're commuting through Milwaukee or showcasing your commitment to innovation, the LiveWire delivers the performance and technology that modern riders demand.

Every used LiveWire we sell in Milwaukee comes with complete service records, comprehensive inspections, and our 48-hour guarantee. Located at House Of Harley on W Layton Ave, we serve riders throughout Milwaukee County and southeastern Wisconsin. Our inventory includes LiveWires with premium upgrades and accessories that enhance both functionality and performance.

Milwaukee riders consistently choose the LiveWire for its revolutionary design, instant performance, and advanced technology. The electric motor delivers instant torque and smooth operation, while the advanced electronics create a unique riding experience that sets it apart from traditional motorcycles. When you buy a used LiveWire in Milwaukee from Joe's Used Harleys, you're investing in the future of motorcycling that combines instant performance with zero emissions and advanced technology.`,
    specs: {
      engine: 'Electric Motor',
      displacement: 'N/A',
      torque: '86 ft-lb (instant)',
      fuelCapacity: 'N/A (Battery)',
      seatHeight: '30.5 inches',
      weight: '549 lbs',
      transmission: 'Single-speed',
      wheelbase: '58.7 inches'
    },
    startingPrice: '$22,000',
    financingInfo: 'Financing available starting at $319/month with approved credit. Special financing programs available for electric vehicles.',
    image: 'https://i.imgur.com/14Vzbyie.jpeg'
  }
};

/**
 * Get model data by slug
 */
export function getModelData(slug: string): ModelData | null {
  return modelDatabase[slug.toLowerCase()] || null;
}

/**
 * Get all model slugs for static generation
 */
export function getAllModelSlugs(): string[] {
  return Object.keys(modelDatabase);
}

