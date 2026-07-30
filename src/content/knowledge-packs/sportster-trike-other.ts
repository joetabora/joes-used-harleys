import {
  definePack,
  sharedFinancingNotes,
  sharedInsuranceNotes,
} from "@/content/knowledge-packs/_shared";

export const sportsterPacks = [
  definePack({
    slug: "iron-883",
    overview: [
      "Iron 883 is an approachable air-cooled Sportster often chosen as a first Harley.",
      "Lighter and simpler than Softail and Touring platforms.",
      "Evolution Sportster power — different service story than Revolution Max bikes.",
    ],
    engines: [
      "Evolution Sportster 883 family.",
      "Air-cooled Sportster maintenance differs from liquid-cooled Revolution Max.",
    ],
    rideCharacteristics: [
      "Manageable size relative to baggers.",
      "Upright Sportster ergonomics with a raw, simple character.",
      "Highway vibes and wind are real at interstate speeds.",
    ],
    comfort: [
      "Good for local and regional rides; long interstate days can fatigue without a seat plan.",
      "Minimal weather protection.",
    ],
    passenger: {
      level: "fair",
      notes:
        "Short two-up hops are common; long two-up trips are less comfortable than Touring.",
    },
    roadTrip: {
      level: "fair",
      notes:
        "Possible with planning and breaks; Touring bikes remain better for luggage and wind.",
    },
    beginner: {
      level: "good",
      notes:
        "Among the better Harley starting points when paired with rider training — still take a safety course and practice.",
    },
    maintenance: [
      "Air-cooled Sportster service intervals.",
      "Watch oil changes and primary service as specified for the year.",
      "Inspect rubber mounts and exhaust fasteners.",
    ],
    ownership: [
      "Lower complexity than Touring electronics packages.",
      "Easy personalization platform.",
    ],
    buyingChecks: [
      "Tip-over evidence (common on lighter bikes).",
      "Tire age, brakes, cables/controls.",
      "Service history and title.",
      "Aftermarket electrical quality.",
    ],
    strengths: [
      "Approachable size and complexity.",
      "Strong first-Harley reputation.",
      "Simple ownership story.",
    ],
    tradeOffs: [
      "Less power and highway comfort than bigger platforms.",
      "Passenger and luggage are limited stock.",
      "Vibration character is part of the air-cooled Sportster experience.",
    ],
    idealRider: [
      "Newer riders and anyone wanting a lighter, simpler Harley.",
    ],
    accessories: [
      "Windshield",
      "Soft luggage",
      "Passenger seat/pegs",
      "Engine guards",
    ],
    upgrades: [
      "Comfort seat",
      "Bars and controls",
      "Lighting",
    ],
    stage1: [
      "Intake/exhaust packages exist for Sportsters — tune appropriately",
      "Avoid unverified performance claims",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: [
      ...sharedInsuranceNotes,
      "Smaller Sportsters are often less expensive to insure than large Touring bikes — still get a real quote.",
    ],
    faqs: [
      {
        question: "Is Iron 883 a good first Harley?",
        answer:
          "Often yes for new riders who take a safety course and practice. Sit on it, confirm you can flat-foot comfortably enough for your skill, and do not skip training.",
      },
      {
        question: "Iron 883 vs Forty-Eight?",
        answer:
          "Forty-Eight is a fat-tire style Sportster with a different stance. Iron 883 is often the more approachable daily choice — compare in person.",
      },
    ],
    relatedGuideTopics: ["beginner", "buying", "maintenance", "financing", "insurance"],
  }),

  definePack({
    slug: "forty-eight",
    overview: [
      "Forty-Eight is a fat-tire Sportster with a distinctive peashooter look and bold stance.",
      "Style-forward within the classic Sportster size class.",
      "Evolution Sportster power on years in this taxonomy.",
    ],
    engines: [
      "Evolution Sportster (typically 1200-class Forty-Eight examples).",
      "Confirm exact displacement by VIN.",
    ],
    rideCharacteristics: [
      "Fat front tire changes steering feel versus Iron 883.",
      "Sportster size with stronger visual presence.",
      "Highway comfort is limited without add-ons.",
    ],
    comfort: [
      "Short, stylish rides are the sweet spot.",
      "Solo-focused posture on many examples.",
    ],
    passenger: {
      level: "fair",
      notes: "Short hops possible; not a two-up touring tool.",
    },
    roadTrip: {
      level: "poor",
      notes:
        "Possible but not ideal for luggage-heavy distance — limited stock comfort and storage.",
    },
    beginner: {
      level: "fair",
      notes:
        "Still Sportster-sized, but fat-tire manners and power can surprise newer riders. Training required.",
    },
    maintenance: [
      "Air-cooled Sportster service.",
      "Inspect fat front tire wear and pressure habits.",
      "Check custom exhaust mounts.",
    ],
    ownership: [
      "Style icon within Sportster ranks.",
      "Personalization is common — document mods.",
    ],
    buyingChecks: [
      "Tire condition (especially fat front).",
      "Tip-over scars.",
      "Service history and title.",
      "Aftermarket wiring.",
    ],
    strengths: [
      "Distinctive stance and peashooter aesthetic.",
      "Sportster footprint.",
      "Strong used style appeal.",
    ],
    tradeOffs: [
      "Less practical for long trips and passengers.",
      "Fat tire steering feel is an acquired taste.",
      "Not as beginner-gentle as some 883s.",
    ],
    idealRider: [
      "Style-minded riders who want Sportster size with bold stance.",
    ],
    accessories: [
      "Solo seat options",
      "Minimal luggage",
      "Engine guards",
    ],
    upgrades: [
      "Seat",
      "Bars",
      "Lighting",
    ],
    stage1: [
      "Sportster intake/exhaust Stage 1-style with proper setup",
      "No invented dyno numbers — verify any claims on paperwork",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Why the fat tire?",
        answer:
          "It is part of the Forty-Eight look and changes steering feel. Try it in a parking lot before highway traffic.",
      },
      {
        question: "Good daily rider?",
        answer:
          "Yes for shorter commuting and style-led riding. For long two-up trips, look at Softail light-touring or Touring.",
      },
    ],
    relatedGuideTopics: ["buying", "beginner", "maintenance", "financing"],
  }),

  definePack({
    slug: "sportster-s",
    overview: [
      "Sportster S is a modern Sportster with Revolution Max power and a performance focus.",
      "Different feel and service story than air-cooled Sportsters.",
      "Liquid-cooled platform — do not treat maintenance like an Iron 883.",
    ],
    engines: [
      "Revolution Max liquid-cooled engine family.",
      "Confirm year calibration and any dealer updates via VIN/service history.",
    ],
    rideCharacteristics: [
      "Sharper, more modern performance character.",
      "Different ergonomics than classic Sportsters.",
      "Power delivery demands respect — not a toy.",
    ],
    comfort: [
      "Performance posture may fatigue on long days without a seat plan.",
      "Wind protection is limited stock.",
    ],
    passenger: {
      level: "fair",
      notes: "Check passenger accommodations by year; not Touring-oriented.",
    },
    roadTrip: {
      level: "fair",
      notes:
        "Capable of distance for experienced riders; luggage and wind solutions help.",
    },
    beginner: {
      level: "poor",
      notes:
        "Modern performance Sportster is a poor first bike for most absolute beginners.",
    },
    maintenance: [
      "Follow Revolution Max service requirements (liquid-cooled).",
      "Software/service bulletins matter — ask for dealer history.",
      "Inspect tires and brakes after spirited use.",
    ],
    ownership: [
      "Modern electronics and cooling system ownership differs from air-cooled Sportsters.",
      "Document any exhaust/tune work carefully.",
    ],
    buyingChecks: [
      "Service history at a shop familiar with Revolution Max.",
      "Tire and brake wear.",
      "Crash damage and scraped parts.",
      "Unauthorized tunes.",
    ],
    strengths: [
      "Modern performance in a Sportster badge.",
      "Liquid-cooled power character.",
      "Distinct from classic air-cooled Sportsters.",
    ],
    tradeOffs: [
      "Not beginner-first.",
      "Different maintenance from Iron 883 / Forty-Eight.",
      "Less classic Harley vibration character — preference varies.",
    ],
    idealRider: [
      "Riders who want a sharper, more modern Sportster experience.",
    ],
    accessories: [
      "Crash protection",
      "Comfort seat",
      "Luggage solutions",
    ],
    upgrades: [
      "Seat and controls",
      "Lighting",
      "Legal exhaust with proper calibration",
    ],
    stage1: [
      "Performance intake/exhaust only with correct calibration for Revolution Max",
      "Prefer documented dealer or reputable tuner work",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Is Sportster S like an Iron 883?",
        answer:
          "No. Revolution Max Sportster S is a modern performance platform. Maintenance, feel, and power differ from air-cooled Sportsters.",
      },
      {
        question: "Good first bike?",
        answer:
          "Generally no for brand-new riders. Consider Iron 883, Nightster with training, or start with a safety course and honest skill assessment.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "beginner", "financing", "engine"],
  }),

  definePack({
    slug: "nightster",
    overview: [
      "Nightster is a lighter Revolution Max Sportster aimed at approachable modern performance.",
      "Bridges newer riders toward modern Harley power without classic air-cooled packaging.",
      "Still requires training — modern power is real.",
    ],
    engines: [
      "Revolution Max liquid-cooled family (Nightster calibrations).",
      "Confirm year and service history.",
    ],
    rideCharacteristics: [
      "More approachable packaging than Sportster S for many riders.",
      "Modern power delivery versus Evolution Sportsters.",
      "Lightweight relative to Softail/Touring.",
    ],
    comfort: [
      "Good for regional rides; plan seat comfort for longer days.",
    ],
    passenger: {
      level: "fair",
      notes: "Short trips possible; verify passenger kit.",
    },
    roadTrip: {
      level: "fair",
      notes: "Doable with breaks and luggage add-ons.",
    },
    beginner: {
      level: "good",
      notes:
        "Among better modern starting points when the rider completes training — still respect the throttle.",
    },
    maintenance: [
      "Revolution Max service schedules.",
      "Dealer history for updates.",
      "Tire and brake inspections.",
    ],
    ownership: [
      "Modern Sportster ownership with liquid cooling.",
      "Keep software/service records with the bike.",
    ],
    buyingChecks: [
      "Service history.",
      "Tip-over evidence.",
      "Unauthorized performance mods.",
      "Title clarity.",
    ],
    strengths: [
      "Approachable modern Harley performance.",
      "Lighter than Softail/Touring.",
      "Good bridge from training into Harley ownership.",
    ],
    tradeOffs: [
      "Not classic air-cooled character.",
      "Luggage and two-up limited versus Touring.",
      "Still too much bike if you skip training.",
    ],
    idealRider: [
      "Newer or returning riders who want modern power in a manageable package.",
    ],
    accessories: [
      "Windshield",
      "Luggage",
      "Engine guards",
      "Passenger kit",
    ],
    upgrades: [
      "Comfort seat",
      "Controls",
      "Lighting",
    ],
    stage1: [
      "Only modify intake/exhaust with correct Revolution Max calibration",
      "Prefer documented work",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Nightster vs Sportster S?",
        answer:
          "Nightster is generally positioned as more approachable; Sportster S is more performance-forward. Sit on both and compare power delivery honestly for your skill.",
      },
      {
        question: "Nightster vs Iron 883?",
        answer:
          "Different eras and engine tech. Iron 883 is classic air-cooled Sportster; Nightster is liquid-cooled Revolution Max. Choose based on feel and service comfort, not the Sportster name alone.",
      },
    ],
    relatedGuideTopics: ["beginner", "buying", "maintenance", "financing", "engine"],
  }),
];

export const trikeOtherPacks = [
  definePack({
    slug: "tri-glide",
    overview: [
      "Tri Glide Ultra is Harley’s three-wheel Touring platform focused on passenger and cargo.",
      "Three-wheel stability changes the ownership and riding story versus two-wheel Touring.",
      "Milwaukee-Eight Touring power on modern years.",
    ],
    engines: [
      "Milwaukee-Eight Touring engines on modern Tri Glides.",
      "Confirm year and options by VIN.",
    ],
    rideCharacteristics: [
      "Three-wheel stability at stops and in parking lots.",
      "Different cornering limits than two-wheel bikes — training recommended.",
      "Touring mass with reverse on many examples — verify equipment.",
    ],
    comfort: [
      "Strong Touring comfort and weather protection.",
      "Passenger and cargo are central to the design.",
    ],
    passenger: {
      level: "excellent",
      notes:
        "Built around passenger comfort and luggage when rear accommodations and trunk/tour-pak areas are intact.",
    },
    roadTrip: {
      level: "excellent",
      notes:
        "Excellent distance tool for riders who want three-wheel Touring capability.",
    },
    beginner: {
      level: "fair",
      notes:
        "Three wheels help at stops, but size and Touring complexity still require training and respect — not automatic for absolute beginners.",
    },
    maintenance: [
      "Touring service plus rear axle/tire care unique to trikes.",
      "Inspect reverse system if equipped.",
      "Brake system condition is critical.",
    ],
    ownership: [
      "Needs more storage width than two-wheel Touring.",
      "Tire replacement patterns differ from two-wheel bikes.",
    ],
    buyingChecks: [
      "Rear tire wear and alignment story.",
      "Reverse operation if advertised.",
      "Service history, brakes, title.",
      "Body and trunk water leaks.",
    ],
    strengths: [
      "Three-wheel Touring stability.",
      "Passenger and cargo focus.",
      "Full-dress comfort.",
    ],
    tradeOffs: [
      "Width and weight — parking and trailering considerations.",
      "Different dynamics than two-wheel riding.",
      "Higher complexity and tire costs possible.",
    ],
    idealRider: [
      "Riders who want Touring capability with three-wheel stability.",
    ],
    accessories: [
      "Passenger comfort upgrades",
      "Additional lighting",
      "Cover and storage solutions",
    ],
    upgrades: [
      "Comfort seating",
      "Audio",
      "Lighting",
    ],
    stage1: [
      "Performance changes should be documented and tuned for the platform",
      "Prefer reputable trike-experienced shops",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: [
      ...sharedInsuranceNotes,
      "Trike insurance can differ from two-wheel policies — get a quote that matches the VIN.",
    ],
    faqs: [
      {
        question: "Do I need a different license for a Tri Glide?",
        answer:
          "License rules depend on your state. Confirm Wisconsin requirements for three-wheel motorcycles before you buy.",
      },
      {
        question: "Tri Glide vs Freewheeler?",
        answer:
          "Tri Glide Ultra is full-dress Touring-oriented; Freewheeler is a more open trike attitude. Compare seating, luggage, and how they fit your garage.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "passenger", "financing", "insurance"],
  }),

  definePack({
    slug: "freewheeler",
    overview: [
      "Freewheeler is a more open Harley trike with a cruiser attitude versus full-dress Tri Glide.",
      "Three-wheel platform with less enclosed Touring dress.",
      "Milwaukee-Eight power on modern years.",
    ],
    engines: [
      "Milwaukee-Eight engines on modern Freewheelers.",
      "Confirm by VIN.",
    ],
    rideCharacteristics: [
      "Trike stability with a more open feel than Tri Glide Ultra.",
      "Different dynamics than two-wheel Softails — get familiarization.",
    ],
    comfort: [
      "Open-air cruising comfort; less weather enclosure than Tri Glide.",
    ],
    passenger: {
      level: "good",
      notes: "Supports passengers when accommodations are equipped; verify seat condition.",
    },
    roadTrip: {
      level: "good",
      notes: "Capable of distance; luggage and weather strategy matter more than on full-dress Tri Glide.",
    },
    beginner: {
      level: "fair",
      notes: "Three wheels help at stops, but size still demands training.",
    },
    maintenance: [
      "Trike rear tire and brake care.",
      "Engine and drivetrain service by year.",
      "Inspect custom accessories.",
    ],
    ownership: [
      "Width and storage planning.",
      "Different insurance and licensing questions than two-wheel bikes.",
    ],
    buyingChecks: [
      "Rear tire wear.",
      "Service history and title.",
      "Crash or scrapes on bodywork.",
      "Reverse if equipped and advertised.",
    ],
    strengths: [
      "Open trike character.",
      "Three-wheel confidence at stops.",
      "Less enclosed than Tri Glide Ultra.",
    ],
    tradeOffs: [
      "Less weather protection than full-dress Tri Glide.",
      "Width and parking constraints.",
      "Learning curve from two-wheel habits.",
    ],
    idealRider: [
      "Trike riders who want a less enclosed look.",
    ],
    accessories: [
      "Windshield options",
      "Luggage",
      "Passenger comfort",
    ],
    upgrades: [
      "Seat",
      "Lighting",
      "Audio where applicable",
    ],
    stage1: [
      "Documented intake/exhaust/tune only",
      "Use shops familiar with trikes",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Freewheeler or Tri Glide?",
        answer:
          "Choose based on how much full-dress luggage and weather protection you want versus a more open trike feel.",
      },
      {
        question: "Can I ride a Freewheeler with a motorcycle endorsement?",
        answer:
          "Check current Wisconsin rules for three-wheel vehicles. Do not assume two-wheel endorsement covers every case.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "insurance"],
  }),

  definePack({
    slug: "pan-america",
    overview: [
      "Pan America is Harley’s adventure-touring motorcycle built around Revolution Max.",
      "Upright adventure ergonomics differ from Softail and classic Touring baggers.",
      "Liquid-cooled modern platform — service differs from air-cooled Harleys.",
    ],
    engines: [
      "Revolution Max adventure calibrations.",
      "Confirm Special vs base and year by VIN.",
    ],
    rideCharacteristics: [
      "Upright adventure posture and longer-travel suspension character.",
      "Capable on pavement with adventure intent — off-pavement skill still required.",
      "Different from cruiser Harley ergonomics.",
    ],
    comfort: [
      "Strong for upright distance riding when seat and wind protection suit the rider.",
      "Adventure luggage systems vary — verify what is on the used unit.",
    ],
    passenger: {
      level: "good",
      notes:
        "Two-up adventure travel is possible with proper seat/pegs; comfort depends on setup.",
    },
    roadTrip: {
      level: "excellent",
      notes:
        "Designed for distance with adventure touring intent. Check tires (street vs dual-sport) for your routes.",
    },
    beginner: {
      level: "poor",
      notes:
        "Tall, powerful adventure bike — poor first motorcycle for most beginners.",
    },
    maintenance: [
      "Revolution Max service requirements.",
      "Suspension and luggage mount inspections.",
      "Tire choice must match how you actually ride.",
    ],
    ownership: [
      "Adventure accessory ecosystem.",
      "Keep dealer software/service history.",
    ],
    buyingChecks: [
      "Crash bars and plastic damage from tip-overs.",
      "Service history for Revolution Max.",
      "Tire type vs intended use.",
      "Unauthorized tunes.",
    ],
    strengths: [
      "Adventure ergonomics with Harley power.",
      "Distance capability.",
      "Modern liquid-cooled platform.",
    ],
    tradeOffs: [
      "Not a classic cruiser Harley experience.",
      "Height and power challenge newer riders.",
      "Different maintenance from Softail/Touring air-cooled lore.",
    ],
    idealRider: [
      "Riders who want Harley power with upright adventure ergonomics.",
    ],
    accessories: [
      "Crash protection",
      "Adventure luggage",
      "Auxiliary lights",
      "Skid plates where applicable",
    ],
    upgrades: [
      "Comfort seat",
      "Windscreen options",
      "Luggage systems",
    ],
    stage1: [
      "Only modify with Revolution Max–appropriate calibration",
      "Prefer documented tuner/dealer work",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Is Pan America a cruiser?",
        answer:
          "No. It is an adventure-touring Harley. Sit on it before assuming Softail ergonomics.",
      },
      {
        question: "Street tires or adventure tires?",
        answer:
          "Match tires to your real routes. Do not buy dual-sport rubber for pure interstate use without considering wear and feel.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "routes", "financing", "engine"],
  }),
];
