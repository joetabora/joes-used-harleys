import {
  definePack,
  sharedFinancingNotes,
  sharedInsuranceNotes,
} from "@/content/knowledge-packs/_shared";

export const touringPacks = [
  definePack({
    slug: "street-glide",
    overview: [
      "The Street Glide is Harley’s classic fork-mounted batwing Touring bagger.",
      "It pairs highway-oriented ergonomics with saddlebags and a traditional bagger silhouette.",
      "Used examples span Twin Cam and Milwaukee-Eight generations — confirm engine and options by year and VIN.",
    ],
    engines: [
      "Twin Cam Touring platforms on earlier used units.",
      "Milwaukee-Eight Touring engines on later generations.",
      "Exact displacement and calibration vary by year — verify on the VIN sticker and service records.",
    ],
    rideCharacteristics: [
      "Batwing fairing moves with the forks, giving a traditional, connected front-end feel.",
      "Stable at highway speed with Touring geometry and luggage aboard.",
      "Heavier than Softails or Sportsters; low-speed U-turns need practice.",
    ],
    comfort: [
      "Upright Touring posture suited to longer miles.",
      "Wind protection from the batwing helps on Wisconsin interstates.",
      "Seat and floorboard setups vary by year and aftermarket — sit before you buy.",
    ],
    passenger: {
      level: "excellent",
      notes:
        "Touring passenger accommodations and luggage make two-up riding a primary use case when the rear seat and pegs are present and in good condition.",
    },
    roadTrip: {
      level: "excellent",
      notes:
        "Built for distance: fairing, bags, and Touring range. Check tires, brakes, and recent service before a long Southeast Wisconsin or out-of-state trip.",
    },
    beginner: {
      level: "poor",
      notes:
        "Weight, size, and Touring mass make this a poor first bike for most new riders. Consider Sportster or lighter Softails first.",
    },
    maintenance: [
      "Follow big-twin service intervals for oil, filter, and primary/transmission fluids as applicable by year.",
      "Inspect tires and brake pads carefully — Touring miles add up fast on used examples.",
      "Listen for abnormal drivetrain noise and review cam-related history on higher-mile Twin Cam bikes.",
      "Verify fairing mounts, bag latches, and electrical accessories after prior owners’ upgrades.",
    ],
    ownership: [
      "Expect fuel and tire costs typical of heavy Touring bikes.",
      "Storage for winter in Wisconsin matters — moisture and battery care count.",
      "Aftermarket stereo, bags, and exhaust are common; document what stays with the sale.",
    ],
    buyingChecks: [
      "Service records and title status.",
      "Tire age and remaining tread — highway bikes often need rubber sooner than mileage alone suggests.",
      "Brake feel, ABS warning lights if equipped, and fork seal leaks.",
      "Bag latch security and water intrusion signs.",
      "Evidence of crash damage on fairing, bags, and crash bars.",
      "Confirm options (stereo, security, stage kits) match the asking story.",
    ],
    strengths: [
      "Classic batwing bagger look buyers recognize immediately.",
      "Strong highway manners with real luggage capacity.",
      "Deep used market with many years and trims to compare.",
      "Two-up comfort when passenger gear is intact.",
    ],
    tradeOffs: [
      "Heavy and wide for tight urban parking.",
      "Not ideal for brand-new riders.",
      "Crosswind feel differs from frame-mounted Road Glide fairings — preference is personal.",
      "Older high-mile examples can hide deferred maintenance.",
    ],
    idealRider: [
      "Riders who want a traditional bagger for highway miles and occasional two-up trips.",
      "Buyers who prefer the batwing look over sharknose Road Glide styling.",
    ],
    accessories: [
      "Highway pegs and backrests",
      "Crash bars / engine guards",
      "Tour-pak or top luggage when not factory equipped",
      "Heated gear plugs and phone mounts",
      "Windshield height options for the batwing",
    ],
    upgrades: [
      "Comfort seat for long days",
      "Improved exhaust note (legal / neighbor-aware)",
      "Audio upgrades common on later Touring bikes",
      "LED lighting and auxiliary lamps for dusk rides",
    ],
    stage1: [
      "Intake and exhaust refresh commonly discussed as a Stage 1-style package",
      "Tuner / calibration when intake and exhaust change — do not guess maps",
      "Confirm prior Stage work with paperwork; unverified tunes are a buying risk",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Street Glide or Road Glide?",
        answer:
          "Both are Touring baggers. Street Glide uses a fork-mounted batwing; Road Glide uses a frame-mounted sharknose. Sit on both if you can — Joe can help you compare real units on the floor.",
      },
      {
        question: "Is a used Street Glide good for Wisconsin highways?",
        answer:
          "Yes for experienced riders who want wind protection and bags. Verify tires, brakes, and service history before long interstate miles.",
      },
      {
        question: "What should I inspect first on a used example?",
        answer:
          "Tires, brakes, fluids, bag hardware, fairing fitment, and service records. Ask why it is for sale and confirm title status.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "insurance", "passenger", "routes"],
  }),

  definePack({
    slug: "road-glide",
    overview: [
      "The Road Glide is Harley’s frame-mounted sharknose Touring bagger.",
      "Riders often describe calmer crosswind manners because fairing mass stays off the forks.",
      "Used inventory spans Twin Cam and Milwaukee-Eight years — verify generation on the VIN.",
    ],
    engines: [
      "Twin Cam on earlier Touring Road Glides.",
      "Milwaukee-Eight on later platforms.",
      "Confirm exact engine and calibration by year — do not assume one map or displacement.",
    ],
    rideCharacteristics: [
      "Frame-mounted fairing keeps front-end feel distinct from Street Glide.",
      "Planted highway demeanor favored by many long-distance riders.",
      "Still a heavy Touring bike at parking-lot speeds.",
    ],
    comfort: [
      "Strong wind management for open Midwestern roads.",
      "Touring ergonomics for long days in the saddle.",
      "Seat and bar setups vary — sit and compare to Street Glide.",
    ],
    passenger: {
      level: "excellent",
      notes:
        "Touring passenger space and luggage support two-up travel when rear accommodations are stock or quality aftermarket.",
    },
    roadTrip: {
      level: "excellent",
      notes:
        "Purpose-built for distance riding with sharknose protection and bags. Pre-trip inspection of rubber and brakes is non-negotiable.",
    },
    beginner: {
      level: "poor",
      notes:
        "Size and weight make Road Glide a poor first Harley for most beginners.",
    },
    maintenance: [
      "Big-twin fluid services on schedule for the year/engine family.",
      "Inspect fairing mounts and windshield hardware unique to the sharknose.",
      "Check tires, brakes, and final drive condition after highway use.",
      "Review electrical accessory installs carefully.",
    ],
    ownership: [
      "Touring operating costs — fuel, tires, and storage — apply.",
      "Wisconsin winters call for battery tenders and dry storage.",
      "Document stereo and luggage mods that convey with the bike.",
    ],
    buyingChecks: [
      "Service history and title clarity.",
      "Tire date codes and brake pad thickness.",
      "Sharknose fairing cracks, mounts, and windshield fit.",
      "Bag seals and latch operation.",
      "ABS / warning lights if equipped.",
      "Prior stage or tuner work with paperwork.",
    ],
    strengths: [
      "Frame-mounted fairing manners many riders prefer in wind.",
      "Distinctive sharknose presence.",
      "Full Touring luggage and two-up capability.",
      "Deep used selection across years.",
    ],
    tradeOffs: [
      "Heavy for tight spaces.",
      "Not beginner-friendly.",
      "Batwing fans may still prefer Street Glide styling.",
      "Neglected high-mile examples can be expensive to catch up.",
    ],
    idealRider: [
      "Long-distance riders who want planted highway manners.",
      "Buyers who prefer sharknose styling over batwing.",
    ],
    accessories: [
      "Highway pegs and passenger backrests",
      "Crash protection",
      "Tour-pak options",
      "Auxiliary lighting",
      "Phone/GPS mounts compatible with the sharknose",
    ],
    upgrades: [
      "Long-haul comfort seat",
      "Audio upgrades",
      "Legal exhaust refresh",
      "Improved grips and controls for all-day rides",
    ],
    stage1: [
      "Intake and exhaust packages commonly marketed as Stage 1-style",
      "Proper calibration when airflow changes",
      "Verify prior tune history before purchase",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Why do riders pick Road Glide over Street Glide?",
        answer:
          "Many cite calmer feel in crosswinds from the frame-mounted fairing. Preference is personal — sit on both and ride if you can.",
      },
      {
        question: "Are used Road Glides good for Wisconsin wind?",
        answer:
          "Many experienced Touring riders like them for open interstate stretches. Still inspect tires, brakes, and service history before a long trip.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "insurance", "passenger", "routes"],
  }),

  definePack({
    slug: "street-glide-special",
    overview: [
      "Street Glide Special trims typically add touring features buyers look for on used batwing baggers.",
      "It remains a fork-mounted fairing Touring bike — related to Street Glide, not a different platform family.",
      "Feature content varies by year; read the window sticker story against the actual unit.",
    ],
    engines: [
      "Primarily Milwaukee-Eight Touring engines on Special years in this taxonomy.",
      "Confirm displacement and options by VIN.",
    ],
    rideCharacteristics: [
      "Batwing Touring manners similar to Street Glide.",
      "Often better equipped from the factory than base trims of the same era.",
      "Still heavy Touring mass at low speed.",
    ],
    comfort: [
      "Touring wind protection and upright posture.",
      "Feature content (audio, security, comfort pieces) can improve daily usability — verify what is actually on the bike.",
    ],
    passenger: {
      level: "excellent",
      notes: "Touring two-up capability when passenger seat and pegs are present and sound.",
    },
    roadTrip: {
      level: "excellent",
      notes: "Bags, fairing, and Touring range support long rides when maintenance is current.",
    },
    beginner: {
      level: "poor",
      notes: "Same weight and size concerns as other Touring baggers for new riders.",
    },
    maintenance: [
      "Follow Milwaukee-Eight Touring service guidance for the year.",
      "Inspect tires, brakes, bags, and fairing hardware.",
      "Check electronic features and accessory power draws.",
    ],
    ownership: [
      "Touring ownership costs apply.",
      "Document which Special features and add-ons convey at sale.",
    ],
    buyingChecks: [
      "Compare advertised Special features to what is bolted on.",
      "Service records, tires, brakes, title.",
      "Bag and fairing condition.",
      "Electrical gremlins from prior accessory installs.",
    ],
    strengths: [
      "Batwing Touring with a fuller common feature set.",
      "Strong highway and luggage story.",
      "Easy to compare against Street Glide and Road Glide siblings.",
    ],
    tradeOffs: [
      "Heavier platform, not beginner-first.",
      "Feature list can be used as marketing fluff — verify on the bike.",
      "Price should reflect condition and miles, not the badge alone.",
    ],
    idealRider: [
      "Buyers who want batwing Touring with a richer typical equipment list.",
    ],
    accessories: [
      "Crash bars",
      "Highway pegs",
      "Tour-pak",
      "Heated gear connectivity",
    ],
    upgrades: [
      "Comfort seat",
      "Audio refresh",
      "Lighting upgrades",
    ],
    stage1: [
      "Intake/exhaust Stage 1-style packages with proper tuning",
      "Confirm prior calibration paperwork",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "How is Special different from Street Glide?",
        answer:
          "Special trims usually package more touring features for that model year. Always verify the actual equipment on the used unit rather than trusting the nameplate alone.",
      },
      {
        question: "Should I pay more just for the Special badge?",
        answer:
          "Pay for condition, miles, service history, and features you will use — not the badge by itself. Joe can help you compare live units side by side.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "insurance", "passenger"],
  }),

  definePack({
    slug: "road-king",
    overview: [
      "The Road King is a chrome-forward Touring cruiser that typically uses a windshield instead of a full batwing or sharknose fairing.",
      "It keeps Touring range and luggage while feeling more open than fairing baggers.",
      "Used Twin Cam and Milwaukee-Eight examples exist — confirm generation carefully.",
    ],
    engines: [
      "Twin Cam Touring engines on many used Road Kings.",
      "Milwaukee-Eight on later years where applicable.",
      "Verify by VIN; do not assume displacement from photos alone.",
    ],
    rideCharacteristics: [
      "More open front end than full-fairing Touring siblings.",
      "Touring chassis stability with classic cruiser presentation.",
      "Wind management depends heavily on windshield height and aftermarket screens.",
    ],
    comfort: [
      "Upright Touring posture with a classic look.",
      "Less enclosed wind protection than Street/Road Glide — plan gear accordingly for Wisconsin highways.",
    ],
    passenger: {
      level: "good",
      notes:
        "Touring passenger capacity is usually solid, though comfort depends on seat and windshield setup more than on full-dress Ultras.",
    },
    roadTrip: {
      level: "good",
      notes:
        "Capable of distance with bags and Touring range; riders who want maximum wind protection may prefer a full fairing.",
    },
    beginner: {
      level: "poor",
      notes: "Still a heavy Touring bike — generally not a first Harley.",
    },
    maintenance: [
      "Big-twin service intervals by year/engine.",
      "Inspect windshield mounts and chrome for corrosion (Wisconsin road salt).",
      "Tires, brakes, and bag hardware.",
    ],
    ownership: [
      "Chrome and brightwork care matter for appearance.",
      "Winter storage and battery maintenance in SE Wisconsin.",
    ],
    buyingChecks: [
      "Title and service history.",
      "Windshield cracks and mount play.",
      "Chrome pitting and frame corrosion signs.",
      "Tires, brakes, bags.",
      "Prior crash evidence on crash bars and highway pegs.",
    ],
    strengths: [
      "Open, classic Touring look.",
      "Luggage and range without a full fairing.",
      "Strong visual chrome presence.",
    ],
    tradeOffs: [
      "Less wind protection than fairing baggers.",
      "Heavy for new riders.",
      "Chrome maintenance in salted Midwest winters.",
    ],
    idealRider: [
      "Riders who want Touring capability with a more open, classic silhouette.",
    ],
    accessories: [
      "Windshield height options",
      "Crash bars",
      "Highway pegs",
      "Passenger backrest",
    ],
    upgrades: [
      "Comfort seat",
      "Better windshield for highway miles",
      "Lighting upgrades",
    ],
    stage1: [
      "Intake and exhaust Stage 1-style upgrades with calibration",
      "Verify prior tune documentation",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Road King vs Street Glide?",
        answer:
          "Road King usually emphasizes a windshield and open look; Street Glide adds a batwing fairing. Choose based on wind protection preference and style.",
      },
      {
        question: "Is Road King good for two-up trips?",
        answer:
          "Often yes when passenger accommodations are intact. Sit with your passenger before you buy if two-up riding matters.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "passenger", "routes"],
  }),

  definePack({
    slug: "electra-glide",
    overview: [
      "Electra Glide / Ultra-family Touring bikes emphasize full-dress comfort and passenger amenities.",
      "Expect maximum luggage and weather protection relative to lighter baggers.",
      "Used market includes multiple Ultra naming generations — match the VIN to the story.",
    ],
    engines: [
      "Twin Cam on older full-dress Touring platforms.",
      "Milwaukee-Eight on later Ultras.",
      "Confirm by year and VIN.",
    ],
    rideCharacteristics: [
      "Heaviest, most equipped Touring manners in typical Harley lineups.",
      "Stable highway bike with lots of mass.",
      "Low-speed maneuvering demands respect.",
    ],
    comfort: [
      "Among the strongest factory two-up comfort stories in Harley Touring.",
      "Full fairing and luggage for long days.",
    ],
    passenger: {
      level: "excellent",
      notes:
        "Full-dress Touring is built around passenger comfort and luggage when equipment is complete and undamaged.",
    },
    roadTrip: {
      level: "excellent",
      notes:
        "Top-tier distance tool when tires, brakes, and fluids are sorted. Weight is the trade-off.",
    },
    beginner: {
      level: "poor",
      notes: "Poor beginner choice due to weight and complexity.",
    },
    maintenance: [
      "Touring fluid and inspection schedules.",
      "Tour-pak and fairing hardware checks.",
      "Electrical accessory load from stereo and heated gear circuits.",
    ],
    ownership: [
      "Higher complexity and more parts to keep sorted.",
      "Storage space needed for a full-dress Touring bike.",
    ],
    buyingChecks: [
      "Complete luggage and passenger gear present as advertised.",
      "Service records, tires, brakes.",
      "Water leaks in tour-pak and bags.",
      "Electrical issues from aging accessories.",
    ],
    strengths: [
      "Maximum Touring comfort and luggage.",
      "Excellent two-up story.",
      "Weather protection for long rides.",
    ],
    tradeOffs: [
      "Heaviest class — hard to manage for newer riders.",
      "More systems to maintain.",
      "Bulk in parking and garages.",
    ],
    idealRider: [
      "Two-up travelers who prioritize comfort and luggage over a lighter bagger.",
    ],
    accessories: [
      "Passenger comfort upgrades",
      "Crash protection",
      "Auxiliary lights",
      "Heated gear connectivity",
    ],
    upgrades: [
      "Seat comfort packages",
      "Audio systems",
      "Lighting",
    ],
    stage1: [
      "Stage 1-style intake/exhaust with proper tuning",
      "Paper trail for prior performance work",
    ],
    financingNotes: sharedFinancingNotes,
    insuranceNotes: sharedInsuranceNotes,
    faqs: [
      {
        question: "Electra Glide vs Street Glide?",
        answer:
          "Electra Glide / Ultra-family bikes usually emphasize fuller dress and passenger amenities. Street Glide is often a sleeker batwing bagger. Compare live units for the features you need.",
      },
      {
        question: "Are Ultras too heavy?",
        answer:
          "They are among the heaviest Harleys. Experienced Touring riders manage them; beginners should look elsewhere first.",
      },
    ],
    relatedGuideTopics: ["buying", "maintenance", "financing", "passenger", "insurance"],
  }),
];
