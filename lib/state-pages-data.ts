/**
 * State-level landing pages for regional SEO
 * These pages target "used harleys [state]" searches
 */

export interface StatePageData {
  name: string;
  slug: string;
  abbr: string;
  content: string;
  cities: Array<{
    name: string;
    slug: string;
  }>;
  harleyDealers: string[]; // Nearby Harley dealers for comparison
  ridingSeasons: string;
  popularRoutes: string[];
}

export const statePages: StatePageData[] = [
  {
    name: 'Wisconsin',
    slug: 'wisconsin',
    abbr: 'WI',
    ridingSeasons: 'April through October (prime season), year-round with proper gear',
    popularRoutes: [
      'Door County Coastal Byway',
      'Great River Road (Mississippi River)',
      'Kettle Moraine Scenic Drive',
      'Highway 35 (River Road)',
      'Beartooth Highway Route'
    ],
    harleyDealers: [
      'House of Harley-Davidson (Milwaukee - where I operate)',
      'Waukesha Harley-Davidson',
      'Uke\'s Harley-Davidson (Kenosha)',
      'Hal\'s Harley-Davidson (New Berlin)'
    ],
    cities: [
      { name: 'Milwaukee', slug: 'milwaukee' },
      { name: 'Madison', slug: 'madison' }
    ],
    content: `Looking for used Harleys in Wisconsin? You're in the right place – I'm based at House of Harley-Davidson in Milwaukee, the birthplace of Harley-Davidson. I ship used Harleys all across Wisconsin for just $499, from Milwaukee to Madison, Green Bay to La Crosse, and everywhere in between.

Wisconsin is Harley country. This is where it all started back in 1903, and Wisconsin riders know their bikes. That's why I don't mess around with overpriced inventory or hidden fees – Wisconsin riders can smell BS a mile away.

Every used Harley I sell in Wisconsin comes with complete service records, a 48-hour / 100-mile guarantee, and $499 flat-rate shipping anywhere in the state. I personally inspect every bike, handle all the paperwork, and make sure you're riding the same day it arrives.

Wisconsin has some of the best riding in the Midwest. Door County in spring and fall, the Great River Road along the Mississippi, Kettle Moraine's twisty roads – you need a bike that can handle it all. I stock Street Glides, Road Glides, Fat Boys, Heritage Classics, and more – all ready to ride Wisconsin's best routes.

Being based in Milwaukee means I'm right at the source. I see more used Harleys than most dealers in the entire state, I know what's a good deal and what's not, and I only stock bikes that I'd ride myself. Most of my Wisconsin customers are repeat buyers or referrals – that tells you everything.

Whether you're in Milwaukee, Madison, Green Bay, Appleton, Kenosha, Racine, Oshkosh, Eau Claire, or anywhere else in Wisconsin, I'll ship your used Harley for $499. Call or text me at 414-439-6211 – I answer fast, usually within minutes. No pressure, no corporate BS, just straight talk from one Wisconsin rider to another.

Wisconsin riders deserve Wisconsin service – that's what you get when you buy from me. New bikes drop daily on my TikTok and Instagram. Follow @suchgrime to see them first, or text me at 414-439-6211 to see current inventory. I'll find you the perfect used Harley for Wisconsin riding.`
  },
  {
    name: 'Illinois',
    slug: 'illinois',
    abbr: 'IL',
    ridingSeasons: 'April through October (best riding), winter riding possible in southern IL',
    popularRoutes: [
      'Great River Road (Illinois portion)',
      'Galena Territory hills',
      'Shawnee National Forest',
      'Route 66 Heritage Route',
      'Illinois River Road Scenic Byway'
    ],
    harleyDealers: [
      'Windy City Harley-Davidson (Chicago)',
      'Suburban Harley-Davidson (Joliet)',
      'Rockford Harley-Davidson',
      'Rawhide Harley-Davidson (Peoria)'
    ],
    cities: [
      { name: 'Chicago', slug: 'chicago' }
    ],
    content: `Shipping used Harleys to Illinois from Milwaukee – just $499 flat rate, anywhere in the state. Whether you're in Chicago, Naperville, Aurora, Rockford, Peoria, or Springfield, I'll get your bike to you fast.

I'm based in Milwaukee at House of Harley-Davidson, just 90 miles north of Chicago. That means Illinois riders get the same day-of or next-day delivery in many cases – faster than buying local, and usually cheaper too. Chicago dealers mark up everything because of their overhead. I don't have that problem.

Every used Harley I ship to Illinois comes with complete service records, a 48-hour / 100-mile guarantee, and professional transport. I personally inspect every bike, handle all paperwork, and make the whole process easy. You don't even need to leave Chicago – I bring the bike to you.

Illinois has great riding if you know where to go. Galena's hills in the northwest, Shawnee National Forest in the south, the Great River Road along the Mississippi – these roads were made for a Harley. I stock bikes that can handle everything from Chicago commuting to southern Illinois hill country.

I work with riders from Chicago to Carbondale, and everywhere in between. Bad credit? No problem – I have financing options that work for everyone. First-time buyer? I'll walk you through everything. Out-of-state buyer nervous about buying sight-unseen? I do FaceTime walkarounds and send detailed videos of every bike.

Most Chicago and Illinois riders find me through TikTok or Instagram (@suchgrime). I drop new bikes daily, and Illinois buyers know to text me fast – 414-439-6211. The good ones sell in hours, not days.

Shipping to Illinois is easy – $499 gets your used Harley delivered to your door in 1-3 days. Professional transport, fully insured, all paperwork handled. I've shipped hundreds of bikes to Illinois, and I know exactly how to make it smooth.

Whether you're in Chicago, Aurora, Joliet, Naperville, Elgin, Rockford, Peoria, Springfield, Champaign, or any other Illinois city, I'll get you riding for $499. Text me at 414-439-6211 and let's find your perfect used Harley. No pressure, no BS, just straight talk from a rider who knows bikes.`
  },
  {
    name: 'Michigan',
    slug: 'michigan',
    abbr: 'MI',
    ridingSeasons: 'May through October (peak season), winter storage recommended',
    popularRoutes: [
      'Tunnel of Trees (M-119)',
      'US-2 (Upper Peninsula)',
      'Lake Michigan Circle Tour',
      'Sleeping Bear Dunes Scenic Drive',
      'Thumb Loop (Lake Huron coast)'
    ],
    harleyDealers: [
      'Motor City Harley-Davidson (Farmington Hills)',
      'Harley-Davidson of Grand Rapids',
      'Barnett Harley-Davidson (El Paso)',
      'Thunder Road Harley-Davidson (Sterling Heights)'
    ],
    cities: [
      { name: 'Detroit', slug: 'detroit' }
    ],
    content: `Shipping used Harleys to Michigan from Milwaukee – $499 flat rate, anywhere in the state. Detroit, Grand Rapids, Ann Arbor, Lansing, Kalamazoo, Upper Peninsula – I ship everywhere.

Michigan riders know quality when they see it. You're from Motor City – you appreciate good engineering and straight talk. That's what you get with me. Every used Harley comes with complete service records, a 48-hour guarantee, and $499 shipping to your door.

I'm based in Milwaukee, just across Lake Michigan from you. That means fast delivery – usually 2-3 days max, sometimes next-day depending on where you are in Michigan. Professional transport, fully insured, all paperwork handled. You don't need to drive to Milwaukee – I bring the bike to you.

Michigan has some of the best motorcycle roads in the Midwest. The Tunnel of Trees up north, US-2 across the UP, the Lake Michigan shoreline – these roads demand a bike that can handle curves, distance, and pure riding pleasure. I stock Street Glides, Road Glides, Fat Boys, and more – all perfect for Michigan riding.

I work with Michigan riders every week. Bad credit? First-time buyer? Self-employed? I have financing options that work. I'm not a bank – I'm a rider selling to riders. If you want the bike and you're reasonable, we'll figure it out.

Most Michigan buyers find me on TikTok or Instagram (@suchgrime). I drop new bikes daily, and the good ones sell fast. Michigan riders know to text me at 414-439-6211 when they see something they want. First text gets first dibs.

Shipping from Milwaukee to Michigan is easy. I use professional transport companies who specialize in motorcycles. Your bike is fully insured during transport, secured properly, and delivered right to your door. I've shipped hundreds of bikes to Michigan with zero issues.

Whether you're in Detroit, Grand Rapids, Ann Arbor, Flint, Lansing, Kalamazoo, Marquette, Traverse City, or anywhere else in Michigan, I'll get you riding for $499. Text me at 414-439-6211 and let's find your perfect used Harley. No pressure, just straight talk.`
  },
  {
    name: 'Minnesota',
    slug: 'minnesota',
    abbr: 'MN',
    ridingSeasons: 'May through September (short but intense season)',
    popularRoutes: [
      'North Shore Scenic Drive (Highway 61)',
      'Great River Road (Mississippi River)',
      'Gunflint Trail',
      'Paul Bunyan Scenic Byway',
      'Edge of the Wilderness Scenic Byway'
    ],
    harleyDealers: [
      'Minneapolis Harley-Davidson',
      'Adamec Harley-Davidson (Jacksonville)',
      'Bikers Edge Harley-Davidson (Duluth)',
      'St. Cloud Harley-Davidson'
    ],
    cities: [],
    content: `Shipping used Harleys to Minnesota from Milwaukee – $499 flat rate, anywhere in the state. Minneapolis, St. Paul, Rochester, Duluth, Bloomington – I ship everywhere in Minnesota.

Minnesota has a short riding season, which means you need to make every mile count. I get it – I'm from Wisconsin, we have the same weather. That's why I only stock quality used Harleys that are ready to ride the day they arrive. No projects, no surprises, just solid bikes that work.

Every used Harley I ship to Minnesota comes with complete service records, a 48-hour / 100-mile guarantee, and professional transport. $499 gets your bike delivered to your door, fully insured, all paperwork handled. I've shipped bikes to Minneapolis, Duluth, Rochester, St. Cloud, and everywhere in between.

Minnesota has incredible riding when the weather cooperates. Highway 61 along Lake Superior, the Great River Road, the Gunflint Trail – these are bucket-list roads. You need a bike that's reliable, comfortable, and ready for distance. That's what I sell.

I work with Minnesota riders all the time. The process is simple: you see a bike on my TikTok or Instagram (@suchgrime), you text me at 414-439-6211, we talk about the bike, I send you detailed photos and videos, we handle the paperwork, and 2-3 days later your Harley is at your door in Minnesota.

Bad credit? No problem. First-time buyer? I'll walk you through everything. Nervous about buying from out of state? I do FaceTime walkarounds and answer every question you have. I'm not trying to pressure you – I'm trying to help you get on a bike you love.

Minnesota winters are brutal, so I recommend proper storage and winter prep. I can walk you through exactly what you need to do to keep your bike in perfect shape during the off-season. Most Minnesota buyers pick up their bikes in spring – perfect timing for summer riding.

Whether you're in Minneapolis, St. Paul, Rochester, Duluth, Bloomington, Brooklyn Park, Plymouth, or anywhere else in Minnesota, I'll ship your used Harley for $499. Text me at 414-439-6211 – I answer fast, usually within minutes. Let's get you riding this summer.`
  },
  {
    name: 'Iowa',
    slug: 'iowa',
    abbr: 'IA',
    ridingSeasons: 'April through October (excellent riding season)',
    popularRoutes: [
      'Great River Road (Iowa portion)',
      'Loess Hills Scenic Byway',
      'Delaware County loop',
      'Covered Bridges Scenic Byway',
      'Grant Wood Scenic Byway'
    ],
    harleyDealers: [
      'Harley-Davidson of Madison (Madison)',
      'J&P Cycles (Anamosa - parts/gear)',
      'Zylstra Harley-Davidson (Ames)',
      'Big Barn Harley-Davidson (Des Moines)'
    ],
    cities: [],
    content: `Shipping used Harleys to Iowa from Milwaukee – $499 flat rate, anywhere in the state. Des Moines, Cedar Rapids, Davenport, Iowa City, Waterloo – I ship everywhere in Iowa.

Iowa riders appreciate value and straight talk. You're not paying for flash – you're paying for quality and fair prices. That's exactly what I offer. Every used Harley comes with complete service records, a 48-hour guarantee, and $499 shipping to your door anywhere in Iowa.

I'm based in Milwaukee, which means I'm close enough for fast delivery but far enough that I don't compete with your local dealers. Most Iowa deliveries happen in 2-4 days – professional transport, fully insured, all paperwork handled. You don't leave home until the bike is on your driveway.

Iowa has underrated riding. The Loess Hills in western Iowa, the Great River Road along the Mississippi, Delaware County's twisty roads in the northeast – Iowa has hidden gems that most people don't know about. I stock bikes that handle everything from Iowa highways to back-road exploration.

I work with Iowa buyers regularly. The process is simple: see a bike on my TikTok or Instagram (@suchgrime), text me at 414-439-6211, we talk details, I send you photos and videos, we handle paperwork, and your Harley arrives in Iowa a few days later.

Bad credit? First-time buyer? Self-employed? I have financing options that work for Iowa buyers. I'm not a corporate dealership with strict lending rules – I work with people who want to ride. If you're reasonable and you want the bike, we'll figure it out.

Iowa has a solid riding season – longer than Minnesota, about the same as Wisconsin. You can usually ride from April through October with good weather. I recommend getting your bike early in the season so you can enjoy the whole summer.

Whether you're in Des Moines, Cedar Rapids, Davenport, Sioux City, Iowa City, Waterloo, Council Bluffs, Ames, or anywhere else in Iowa, I'll ship your used Harley for $499. Text me at 414-439-6211 and let's get you riding. No pressure, no corporate BS, just straight talk from one rider to another.`
  },
  {
    name: 'Indiana',
    slug: 'indiana',
    abbr: 'IN',
    ridingSeasons: 'April through October (excellent riding weather)',
    popularRoutes: [
      'Indiana State Road 46',
      'Ohio River Scenic Byway',
      'Hoosier National Forest loops',
      'US-20 (Heritage Trail)',
      'Brown County hills'
    ],
    harleyDealers: [
      'Indy Southside Harley-Davidson',
      'Harley-Davidson of Fort Wayne',
      'Bumpus Harley-Davidson (Collierville)',
      'Mike\'s Famous Harley-Davidson (New Castle)'
    ],
    cities: [],
    content: `Shipping used Harleys to Indiana from Milwaukee – $499 flat rate, anywhere in the state. Indianapolis, Fort Wayne, Evansville, South Bend, Bloomington – I ship everywhere in Indiana.

Indiana riders know value when they see it. You're practical people who appreciate quality and fair prices. That's what I offer – quality used Harleys at honest prices, with $499 flat-rate shipping to anywhere in Indiana. No games, no hidden fees, just good bikes at fair prices.

Every used Harley I ship to Indiana comes with complete service records, a 48-hour / 100-mile guarantee, and professional transport. Most Indiana deliveries happen in 2-4 days – your bike shows up at your door, fully insured, all paperwork handled. Easy.

Indiana has great riding if you know where to go. Southern Indiana's hills (Brown County, Hoosier National Forest), the Ohio River Scenic Byway, State Road 46 – these roads are perfect for a Harley. I stock Street Glides, Road Glides, Fat Boys, and more, all ready for Indiana riding.

I work with Indiana buyers every week. The process is straightforward: you see a bike on my TikTok or Instagram (@suchgrime), you text me at 414-439-6211, we talk about it, I send detailed photos and videos, we handle paperwork, and 2-4 days later your Harley is delivered to Indiana.

Bad credit? No problem – I have financing options that work for Indiana buyers. First-time buyer? I'll walk you through the whole process. Nervous about buying sight-unseen? I do FaceTime walkarounds and answer every question until you're comfortable.

Most Indiana buyers are surprised by how easy the process is. You don't drive to Milwaukee, you don't deal with out-of-state registration hassles (I handle that), you don't worry about transport (I arrange it). You just text me, pick your bike, handle paperwork, and wait for delivery.

Indiana has a solid riding season – April through October with good weather. That gives you 6-7 months of riding every year. Buy early in the season and you'll get maximum use out of your bike.

Whether you're in Indianapolis, Fort Wayne, Evansville, South Bend, Carmel, Bloomington, Fishers, Hammond, Muncie, or anywhere else in Indiana, I'll ship your used Harley for $499. Text me at 414-439-6211. No pressure, just straight talk from one Midwest rider to another.`
  },
  {
    name: 'Ohio',
    slug: 'ohio',
    abbr: 'OH',
    ridingSeasons: 'April through October (extended riding season)',
    popularRoutes: [
      'Route 555 (Triple Nickel)',
      'Ohio State Route 7 (River Road)',
      'Hocking Hills Scenic Byway',
      'Lake Erie Coastal Ohio Trail',
      'Wayne National Forest loops'
    ],
    harleyDealers: [
      'Harley-Davidson of Cleveland',
      'Cincinnati Harley-Davidson',
      'Columbus Harley-Davidson',
      'Stinger Harley-Davidson (Akron)'
    ],
    cities: [
      { name: 'Cleveland', slug: 'cleveland' },
      { name: 'Columbus', slug: 'columbus' }
    ],
    content: `Shipping used Harleys to Ohio from Milwaukee – $499 flat rate, anywhere in the state. Cleveland, Columbus, Cincinnati, Toledo, Akron – I ship everywhere in Ohio.

Ohio riders know their bikes. You have Route 555 (the famous Triple Nickel), Hocking Hills, Wayne National Forest – some of the best riding in the Midwest. You need a bike that can handle twisty roads, long distances, and everything in between. That's what I sell.

Every used Harley I ship to Ohio comes with complete service records, a 48-hour / 100-mile guarantee, and $499 flat-rate shipping to your door. Professional transport, fully insured, all paperwork handled. Most Ohio deliveries happen in 2-4 days.

I'm based in Milwaukee, which means I see a huge volume of used Harleys. I only stock the good ones – bikes with complete service records, proper maintenance, and honest condition. I'm not trying to move junk – I'm trying to build a reputation with riders like you.

The process is simple: you see a bike on my TikTok or Instagram (@suchgrime), you text me at 414-439-6211, we talk details, I send you photos and videos, we handle paperwork, and your bike gets delivered to Ohio a few days later.

Bad credit? First-time buyer? Self-employed with tax returns that don't show your real income? I work with Ohio buyers in all situations. I'm not a corporate bank with strict lending rules – I'm a rider helping riders get on bikes. If you want it and you're reasonable, we'll figure it out.

Ohio has one of the longest riding seasons in the Midwest – usually April through October with decent weather. Southern Ohio sometimes gets even more. That means you get maximum use out of your bike every year.

Most Ohio buyers are repeat customers or referrals. Once you work with me once, you realize how much easier and cheaper it is than dealing with local dealers. No pressure, no BS, just straight talk and fair prices.

Whether you're in Cleveland, Columbus, Cincinnati, Toledo, Akron, Dayton, Canton, Youngstown, or anywhere else in Ohio, I'll ship your used Harley for $499. Text me at 414-439-6211 – I answer fast, usually within minutes. Let's find your perfect bike.`
  }
];

export function getStatePageData(slug: string): StatePageData | undefined {
  return statePages.find(state => state.slug === slug);
}

export function getAllStatePageSlugs(): string[] {
  return statePages.map(state => state.slug);
}
