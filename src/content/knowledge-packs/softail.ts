import {
  definePack,
  sharedFinancingNotes,
  sharedInsuranceNotes,
} from "@/content/knowledge-packs/_shared";

export const softailPacks = [
  definePack({
    slug: "softail-standard",
    overview: [
      "Softail Standard is a minimal Softail cruiser with a stripped look and modern Softail chassis manners.",
      "It prioritizes simplicity over Touring luggage and fairings.",
      "Milwaukee-Eight Softail power is typical for years covered in this taxonomy.",
    ],
    engines: [
      "Milwaukee-Eight Softail engines on current-generation Standards.",
      "Confirm displacement and year specifics on the VIN.",
    ],
    rideCharacteristics: [
      "Lighter visual and often lighter feel than Touring baggers.",
      "Softail chassis with cruiser ergonomics.",
      "Less wind protection — gear up for highway miles.",
    ],
    comfort: [
      "Fine for shorter and medium rides; long interstate days need a good seat and wind strategy.",
      "Minimal bodywork means more wind blast than a bagger.",
    ],
    passenger: {
      level: "fair",
      notes:
        "Passenger capability depends on seat and peg setup; many Standards are rider-focused. Confirm two-up hardware before assuming passenger use.",
    },
    roadTrip: {
      level: "fair",
      notes:
        "Doable with luggage add-ons and planning; not a Touring bagger substitute for all-day interstate comfort.",
    },
    beginner: {
      level: "fair",
      notes:
        "More approachable than Touring, but still a powerful Softail. Skill and parking-lot practice matter.",
    },
    maintenance: [
      "Softail Milwaukee-Eight service intervals.",
      "Chain or belt final drive inspection as equipped.",
      "Check for custom wiring from prior personalization.",
    ],
    ownership: [
      "Popular blank canvas for personalization.",
      "Budget for seat, bars, and luggage if you need them later.",
    ],
    buyingChecks: [
      "Title and service history.",
      "Tire age and brake condition.",
      "Evidence of drops (lever tips, pegs, covers).",
      "Aftermarket electrical quality.",
      "Whether passenger hardware is included if you need it.",
    ],
    strengths: [
      "Clean Softail look without Touring bulk.",
      "Modern Softail chassis.",
      "Easy platform to personalize.",
    ],
    tradeOffs: [
      "Limited stock wind and luggage protection.",
      "Passenger comfort may be secondary.",
      "Highway comfort depends on seat and rider gear.",
    ],
    idealRider: [
      "Riders who want Softail manners without heavy touring gear.",
    ],
    accessories: [
      "Windshields",
      "Soft luggage or detachable bags",
      "Passenger seat/pegs if not equipped",
      "Crash bars",
    ],
    upgrades: [
      "Comfort seat",
      "Handlebar and control adjustments",
      "Lighting",
    ],
    stage1: [
      "Intake and exhaust Stage 1-style kits with calibration",
      "Confirm prior tunes with documentation",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Softail Standard vs Street Bob?",
        answer:
          "Both are lean Softails. Styling and equipment differ by year. Sit on both and compare live inventory rather than buying a badge.",
      },
      {
        question: "Can I tour on a Softail Standard?",
        answer:
          "Short trips yes; long interstate days need seat, wind, and luggage solutions. Touring baggers remain better for two-up distance.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "beginner"],
  }),

  definePack({
    slug: "fat-boy",
    overview: [
      "Fat Boy is the iconic solid-disc-wheel Softail with a muscular stance.",
      "Style-forward cruiser that still rides on Softail chassis comfort.",
      "Used Twin Cam and Milwaukee-Eight Fat Boys exist — verify generation.",
    ],
    engines: [
      "Twin Cam on older Fat Boys.",
      "Milwaukee-Eight (including larger Softail displacements) on later years.",
      "Confirm by VIN.",
    ],
    rideCharacteristics: [
      "Wide visual stance and solid-disc front presence.",
      "Cruiser Softail manners — not a bagger.",
      "Highway wind requires gear or a windshield add-on.",
    ],
    comfort: [
      "Softail comfort for cruising; long days depend on seat choice.",
      "Less weather protection than Touring.",
    ],
    passenger: {
      level: "good",
      notes:
        "Many Fat Boys support two-up riding when passenger seat and pegs are fitted. Comfort varies by seat design.",
    },
    roadTrip: {
      level: "fair",
      notes:
        "Weekend trips are common; full Touring baggers remain better for luggage-heavy distance.",
    },
    beginner: {
      level: "fair",
      notes:
        "Manageable for some experienced beginners relative to Touring, but power and weight still demand respect.",
    },
    maintenance: [
      "Softail service by year/engine.",
      "Inspect disc wheels for curb damage.",
      "Check custom exhaust and electrical work.",
    ],
    ownership: [
      "Strong aftermarket and personalization culture.",
      "Chrome and finish care in salted winters.",
    ],
    buyingChecks: [
      "Service history and title.",
      "Wheel and tire condition.",
      "Drop evidence on covers and levers.",
      "Authenticity of advertised displacement/trim.",
    ],
    strengths: [
      "Instantly recognizable Fat Boy style.",
      "Softail cruising comfort.",
      "Deep used market.",
    ],
    tradeOffs: [
      "Not a Touring luggage bike stock.",
      "Wide stance can complicate tight filtering/parking.",
      "Style premiums should not hide maintenance gaps.",
    ],
    idealRider: [
      "Style-forward cruiser buyers who still want Softail comfort.",
    ],
    accessories: [
      "Windshields",
      "Luggage options",
      "Crash protection",
      "Passenger comfort pieces",
    ],
    upgrades: [
      "Seat",
      "Bars",
      "Lighting and exhaust (legal)",
    ],
    stage1: [
      "Stage 1-style intake/exhaust with tune",
      "Verify prior performance paperwork",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Is Fat Boy only about looks?",
        answer:
          "Looks are a big part of the appeal, but Softail chassis comfort matters too. Still inspect tires, brakes, and service history like any used bike.",
      },
      {
        question: "Fat Boy vs Breakout?",
        answer:
          "Both are style-led Softails with different stance and ergonomics. Sit on both — Joe can show what is actually on the floor.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "insurance"],
  }),

  definePack({
    slug: "low-rider",
    overview: [
      "Low Rider (including S / ST variants in the used market) is a performance-leaning Softail with a sportier attitude.",
      "Expect a more aggressive posture than Heritage or classic cruisers.",
      "Milwaukee-Eight Softail power is typical for modern years.",
    ],
    engines: [
      "Milwaukee-Eight Softail engines on modern Low Rider variants.",
      "Confirm exact model variant (S, ST, etc.) and displacement by VIN.",
    ],
    rideCharacteristics: [
      "Sportier Softail feel than baggers or retro Heritage.",
      "More aggressive ergos on many S/ST examples.",
      "Still a cruiser platform — not a sportbike.",
    ],
    comfort: [
      "Comfort depends heavily on bars, seat, and whether it is an ST-style fairing bike.",
      "Long highway days may need a better seat.",
    ],
    passenger: {
      level: "fair",
      notes:
        "Passenger use varies by variant and seat. Confirm pegs and seat before assuming two-up comfort.",
    },
    roadTrip: {
      level: "fair",
      notes:
        "Capable for spirited day rides; Touring bikes remain stronger for luggage-heavy trips.",
    },
    beginner: {
      level: "poor",
      notes:
        "Performance-leaning Softails are a poor match for true beginners — power delivery and posture demand experience.",
    },
    maintenance: [
      "Softail service schedules.",
      "Inspect fairing mounts on ST-style bikes.",
      "Check for track-day or aggressive riding wear.",
    ],
    ownership: [
      "Popular for performance-oriented Softail buyers.",
      "Document any tuner or exhaust work.",
    ],
    buyingChecks: [
      "Exact trim (Low Rider / S / ST) vs listing photos.",
      "Tires, brakes, service history.",
      "Crash or tip-over evidence.",
      "Tune and exhaust paperwork.",
    ],
    strengths: [
      "Sporty Softail character.",
      "Strong presence without full Touring bulk.",
      "Modern Softail performance variants available used.",
    ],
    tradeOffs: [
      "Less beginner-friendly.",
      "Passenger and luggage stories vary by build.",
      "Aggressive ergos can fatigue on long days.",
    ],
    idealRider: [
      "Riders who want Softail chassis with a more aggressive feel.",
    ],
    accessories: [
      "Crash protection",
      "Comfort seat",
      "Luggage solutions",
      "Phone mounts",
    ],
    upgrades: [
      "Controls and levers",
      "Seat",
      "Lighting",
    ],
    stage1: [
      "Intake/exhaust Stage 1-style with calibration",
      "Be wary of untuned intake/exhaust combinations",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Low Rider S vs ST?",
        answer:
          "ST-style bikes typically add more touring-oriented fairing content. Verify the actual variant on the VIN and by sitting on the bike.",
      },
      {
        question: "Is Low Rider a good first Harley?",
        answer:
          "Usually no for brand-new riders. Consider lighter or less aggressive Softails or Sportsters first.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "beginner"],
  }),

  definePack({
    slug: "heritage-classic",
    overview: [
      "Heritage Classic pairs Softail manners with retro styling, often with windshield and leather bags for light touring.",
      "It bridges classic looks and weekend-trip practicality.",
      "Modern examples use Milwaukee-Eight Softail engines.",
    ],
    engines: [
      "Milwaukee-Eight Softail engines on current-generation Heritage.",
      "Confirm displacement by year/VIN.",
    ],
    rideCharacteristics: [
      "Retro Softail cruising with more wind and luggage help than bare Standards.",
      "Relaxed posture for leisurely miles.",
    ],
    comfort: [
      "Windshield and bags improve comfort for day trips versus stripped Softails.",
      "Still lighter-duty than full Touring Ultras.",
    ],
    passenger: {
      level: "good",
      notes:
        "Generally supportive of two-up weekend rides when passenger accommodations are stock and undamaged.",
    },
    roadTrip: {
      level: "good",
      notes:
        "Strong for light touring and weekend routes; full baggers still win for max luggage and weather.",
    },
    beginner: {
      level: "fair",
      notes:
        "More approachable than Touring for some riders, but Softail power still requires training and caution.",
    },
    maintenance: [
      "Softail service intervals.",
      "Leather bag and windshield hardware care.",
      "Chrome and brightwork in Midwest winters.",
    ],
    ownership: [
      "Classic looks with usable light-tour gear.",
      "Leather care if bags are leather.",
    ],
    buyingChecks: [
      "Windshield and bag condition.",
      "Service history, tires, brakes.",
      "Corrosion on chrome and hardware.",
      "Title clarity.",
    ],
    strengths: [
      "Retro style with practical light touring pieces.",
      "Softail comfort.",
      "Good weekend two-up story.",
    ],
    tradeOffs: [
      "Not a full-dress Touring substitute.",
      "Leather and chrome need care.",
      "Heavier than Sportsters.",
    ],
    idealRider: [
      "Buyers who want classic looks with weekend-trip storage.",
    ],
    accessories: [
      "Passenger backrest",
      "Crash bars",
      "Highway pegs",
      "Additional luggage",
    ],
    upgrades: [
      "Comfort seat",
      "Lighting",
      "Grips and controls",
    ],
    stage1: [
      "Stage 1-style intake/exhaust with tune",
      "Keep calibration paperwork with the bike",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Heritage vs Road King?",
        answer:
          "Heritage is Softail light-touring with retro style; Road King is a Touring platform with more open chrome-forward presentation. Compare weight, luggage, and how they feel at parking-lot speeds.",
      },
      {
        question: "Good for Wisconsin fall rides?",
        answer:
          "Yes when windshield and bags are solid and tires are fresh. Dress for wind and plan fuel stops.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "passenger", "routes", "financing"],
  }),

  definePack({
    slug: "breakout",
    overview: [
      "Breakout is a long, low Softail with a stretched custom look.",
      "Style and presence lead; upright touring posture does not.",
      "Milwaukee-Eight Softail power on modern years.",
    ],
    engines: [
      "Milwaukee-Eight Softail engines.",
      "Confirm year and displacement on the VIN.",
    ],
    rideCharacteristics: [
      "Stretched stance and custom silhouette.",
      "Different turning feel than shorter Softails — practice at low speed.",
      "Limited stock wind protection.",
    ],
    comfort: [
      "Style-first ergonomics; long highway days may fatigue without a seat/windshield plan.",
    ],
    passenger: {
      level: "fair",
      notes:
        "Passenger space is often secondary to the stretched look. Verify seat and pegs.",
    },
    roadTrip: {
      level: "fair",
      notes:
        "Possible with planning; not optimized for luggage-heavy touring.",
    },
    beginner: {
      level: "poor",
      notes:
        "Geometry and power make Breakout a poor first bike for most new riders.",
    },
    maintenance: [
      "Softail service.",
      "Inspect stretch-related wear on tires and steering stops.",
      "Custom parts quality check.",
    ],
    ownership: [
      "Strong custom aftermarket culture.",
      "Expect personalization costs if you chase a look.",
    ],
    buyingChecks: [
      "Low-speed tip-over evidence.",
      "Tire wear patterns.",
      "Service history and title.",
      "Aftermarket electrical quality.",
    ],
    strengths: [
      "Dramatic custom presence.",
      "Softail platform under the style.",
    ],
    tradeOffs: [
      "Less practical for touring and beginners.",
      "Passenger comfort may be limited.",
      "Low-speed handling needs practice.",
    ],
    idealRider: [
      "Riders prioritizing style and presence over upright touring posture.",
    ],
    accessories: [
      "Windshields",
      "Seat options",
      "Crash protection",
    ],
    upgrades: [
      "Comfort seat",
      "Bars",
      "Lighting",
    ],
    stage1: [
      "Stage 1-style intake/exhaust with calibration",
      "Document tunes for resale",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Is Breakout hard to turn?",
        answer:
          "The stretched stance feels different at parking-lot speeds. Practice in an empty lot before traffic — Joe can help you find a unit to sit on.",
      },
      {
        question: "Breakout vs Fat Boy?",
        answer:
          "Both are style-led Softails with different stance and wheel language. Compare in person.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing"],
  }),

  definePack({
    slug: "street-bob",
    overview: [
      "Street Bob is a bobber-inspired Softail with a lean feature set.",
      "Simple Softail personalized easily by owners.",
      "Milwaukee-Eight Softail engines on modern years.",
    ],
    engines: [
      "Milwaukee-Eight Softail.",
      "Confirm displacement by VIN.",
    ],
    rideCharacteristics: [
      "Lean Softail cruiser manners.",
      "Minimal bodywork and a bobber attitude.",
      "Highway wind is real without add-ons.",
    ],
    comfort: [
      "Fine for shorter rides; long days need seat and wind solutions.",
    ],
    passenger: {
      level: "fair",
      notes:
        "Often rider-focused. Confirm passenger seat and pegs if two-up matters.",
    },
    roadTrip: {
      level: "fair",
      notes:
        "Doable with luggage and windshield add-ons; not a Touring replacement.",
    },
    beginner: {
      level: "fair",
      notes:
        "Simpler Softail story than baggers, but power still requires training.",
    },
    maintenance: [
      "Softail service intervals.",
      "Inspect personalization wiring and mounts.",
    ],
    ownership: [
      "Blank-canvas Softail for personalization.",
      "Budget for the accessories you will eventually want.",
    ],
    buyingChecks: [
      "Drop damage on covers and levers.",
      "Tire and brake condition.",
      "Title and service history.",
      "Quality of prior custom work.",
    ],
    strengths: [
      "Simple Softail character.",
      "Easy to personalize.",
      "Less bulk than Touring.",
    ],
    tradeOffs: [
      "Limited stock wind and luggage.",
      "Passenger may be an afterthought.",
      "Highway comfort depends on upgrades.",
    ],
    idealRider: [
      "Riders who want a simple Softail they can personalize.",
    ],
    accessories: [
      "Windshield",
      "Luggage",
      "Passenger kit",
      "Crash bars",
    ],
    upgrades: [
      "Seat",
      "Bars",
      "Lighting",
    ],
    stage1: [
      "Intake/exhaust Stage 1-style with tune",
      "Keep calibration records",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Street Bob vs Softail Standard?",
        answer:
          "Both lean Softails with different styling cues by year. Sit on both and compare live stock.",
      },
      {
        question: "Good first Softail?",
        answer:
          "Possibly for riders with training who want something simpler than Touring — still respect the power and weight.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "beginner", "financing"],
  }),
];
