import {
  defineLocationPack,
  financingNotesFor,
  serviceEducationFor,
  tradeInNotesFor,
} from "@/content/location-packs/_shared";

export const southeastWiLocationPacks = [
  defineLocationPack({
    slug: "milwaukee",
    lat: 43.0389,
    lng: -87.9065,
    localContext: [
      "Milwaukee sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Urban lakefront loops, Third Ward stops, and easy access to Lake Michigan day rides.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Milwaukee storefront claims.",
    ],
    travelNotes: [
      "From Milwaukee proper you are already in the core SE WI market — plan parking and timing around weekday traffic on I-94 and the Lake Freeway.",
      "Primary travel corridor context: I-94 and the Lake Freeway.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Urban lakefront loops, Third Ward stops, and easy access to Lake Michigan day rides.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["rally season","dealer open houses","charity rides"],
    eventNotes: [
      "Watch for summer charity rides and lake-adjacent meetups; verify dates on organizer sites — we do not invent calendars.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Compare Touring vs Softail for how you actually commute or weekend-ride in the city.",
      "Take a safety course seriously if you are newer — Milwaukee traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Milwaukee"),
    financingNotes: financingNotesFor("Milwaukee"),
    serviceEducation: serviceEducationFor("Milwaukee"),
    inventoryFraming: [
      "Use live inventory filters for year and family — Milwaukee buyers often start with Touring and Softail, then expand.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Milwaukee.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Milwaukee?",
        answer: "No. City pages help Milwaukee buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Milwaukee?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Milwaukee buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["street-glide","road-glide","iron-883"],
    neighborCitySlugs: ["west-allis","greenfield","oak-creek","waukesha"],
  }),

  defineLocationPack({
    slug: "greenfield",
    lat: 42.9614,
    lng: -88.0126,
    localContext: [
      "Greenfield sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "South-side suburb riding with quick hops to Franklin countryside and Milwaukee lake loops.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Greenfield storefront claims.",
    ],
    travelNotes: [
      "Greenfield sits on the I-894 belt — useful for comparing a bike without committing to a long first ride.",
      "Primary travel corridor context: I-894 / Loomis Road.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "South-side suburb riding with quick hops to Franklin countryside and Milwaukee lake loops.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["weekend group rides","bike nights"],
    eventNotes: [
      "South Milwaukee County bike nights come and go — confirm venue and date before you ride out.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Decide early if you need bags for errands or prefer a lighter Softail or Sportster for neighborhood miles.",
      "Take a safety course seriously if you are newer — Greenfield traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Greenfield"),
    financingNotes: financingNotesFor("Greenfield"),
    serviceEducation: serviceEducationFor("Greenfield"),
    inventoryFraming: [
      "Filter for mileage and tires — short suburban trips can hide hard highway miles on some used units.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Greenfield.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Greenfield?",
        answer: "No. City pages help Greenfield buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Greenfield?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Greenfield buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["fat-boy","street-bob","iron-883"],
    neighborCitySlugs: ["milwaukee","franklin","west-allis","oak-creek"],
  }),

  defineLocationPack({
    slug: "franklin",
    lat: 42.8886,
    lng: -88.0384,
    localContext: [
      "Franklin sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "More room to practice low-speed skills before mixing with denser Milwaukee traffic.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Franklin storefront claims.",
    ],
    travelNotes: [
      "Franklin is a practical staging point south of Milwaukee — less downtown congestion for a first sit-and-compare visit.",
      "Primary travel corridor context: Highway 36 / Rawson Avenue.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "More room to practice low-speed skills before mixing with denser Milwaukee traffic.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["charity rides","club meets"],
    eventNotes: [
      "Local club meets are useful for fit advice; they are not a substitute for a safety course.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If you are newer, talk honestly about weight before falling for a full Touring bagger.",
      "Take a safety course seriously if you are newer — Franklin traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Franklin"),
    financingNotes: financingNotesFor("Franklin"),
    serviceEducation: serviceEducationFor("Franklin"),
    inventoryFraming: [
      "Look past chrome — prioritize tire date codes and brake feel for mixed suburban and rural roads.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Franklin.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Franklin?",
        answer: "No. City pages help Franklin buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Franklin?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Franklin buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["softail-standard","heritage-classic","nightster"],
    neighborCitySlugs: ["oak-creek","muskego","greenfield","milwaukee"],
  }),

  defineLocationPack({
    slug: "oak-creek",
    lat: 42.8858,
    lng: -87.8631,
    localContext: [
      "Oak Creek sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "I-94 corridor riding toward Racine and Kenosha with lake options when weather cooperates.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Oak Creek storefront claims.",
    ],
    travelNotes: [
      "Oak Creek is handy via I-94 — plan fuel and a calm lot for first-time two-up practice if needed.",
      "Primary travel corridor context: I-94 south.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "I-94 corridor riding toward Racine and Kenosha with lake options when weather cooperates.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["lake runs","weekend loops"],
    eventNotes: [
      "Lake Michigan day rides are popular — check wind advisories before committing to a long loop.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Wind off the lake changes comfort — sit on batwing vs sharknose Touring before you decide.",
      "Take a safety course seriously if you are newer — Oak Creek traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Oak Creek"),
    financingNotes: financingNotesFor("Oak Creek"),
    serviceEducation: serviceEducationFor("Oak Creek"),
    inventoryFraming: [
      "Ask about recent tire replacements; lake-adjacent riders often put real highway miles on Touring bikes.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Oak Creek.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Oak Creek?",
        answer: "No. City pages help Oak Creek buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Oak Creek?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Oak Creek buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["street-glide","road-king","electra-glide"],
    neighborCitySlugs: ["milwaukee","franklin","racine","greenfield"],
  }),

  defineLocationPack({
    slug: "west-allis",
    lat: 43.0167,
    lng: -88.007,
    localContext: [
      "West Allis sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Near-west suburb with quick access to State Fair Park area roads and Milwaukee.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake West Allis storefront claims.",
    ],
    travelNotes: [
      "West Allis is a short hop from central Milwaukee — good for multiple short comparison visits.",
      "Primary travel corridor context: I-94 / Highway 100.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Near-west suburb with quick access to State Fair Park area roads and Milwaukee.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["festival-season rides","bike nights"],
    eventNotes: [
      "Event weekends change traffic — schedule walkarounds when lots are quieter.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Focus on parking-lot confidence and passenger needs for summer festival season traffic.",
      "Take a safety course seriously if you are newer — West Allis traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("West Allis"),
    financingNotes: financingNotesFor("West Allis"),
    serviceEducation: serviceEducationFor("West Allis"),
    inventoryFraming: [
      "Check crash bars and lever tips — tip-overs happen in tight city lots.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions West Allis.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in West Allis?",
        answer: "No. City pages help West Allis buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to West Allis?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should West Allis buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["forty-eight","street-bob","low-rider"],
    neighborCitySlugs: ["milwaukee","greenfield","new-berlin","brookfield"],
  }),

  defineLocationPack({
    slug: "brookfield",
    lat: 43.0606,
    lng: -88.1065,
    localContext: [
      "Brookfield sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "West suburb shopping corridors and evening rides toward Waukesha County roads.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Brookfield storefront claims.",
    ],
    travelNotes: [
      "Brookfield via I-94 west is straightforward; avoid peak retail parking crush if you are trailering.",
      "Primary travel corridor context: I-94 west.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "West suburb shopping corridors and evening rides toward Waukesha County roads.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["weekend coffee meets","charity rides"],
    eventNotes: [
      "Suburban coffee meets are casual — still bring a helmet and a plan for daylight.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Many Brookfield buyers weigh Touring comfort against Softail style — sit on both families.",
      "Take a safety course seriously if you are newer — Brookfield traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Brookfield"),
    financingNotes: financingNotesFor("Brookfield"),
    serviceEducation: serviceEducationFor("Brookfield"),
    inventoryFraming: [
      "Compare feature lists carefully on Special and Ultra trims — verify what is actually bolted on.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Brookfield.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Brookfield?",
        answer: "No. City pages help Brookfield buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Brookfield?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Brookfield buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["street-glide-special","road-glide","heritage-classic"],
    neighborCitySlugs: ["waukesha","new-berlin","milwaukee","pewaukee"],
  }),

  defineLocationPack({
    slug: "new-berlin",
    lat: 42.9764,
    lng: -88.1084,
    localContext: [
      "New Berlin sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Suburban connectors with access west toward Waukesha countryside.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake New Berlin storefront claims.",
    ],
    travelNotes: [
      "New Berlin sits between Milwaukee and Waukesha — a useful midpoint without downtown parking stress.",
      "Primary travel corridor context: I-43 / Moorland Road.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Suburban connectors with access west toward Waukesha countryside.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["club rides","season openers"],
    eventNotes: [
      "Spring openers fill fast — use them to learn, not to rush a purchase.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If you ride county roads on weekends, prioritize seat comfort and windshield options.",
      "Take a safety course seriously if you are newer — New Berlin traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("New Berlin"),
    financingNotes: financingNotesFor("New Berlin"),
    serviceEducation: serviceEducationFor("New Berlin"),
    inventoryFraming: [
      "Inspect aftermarket electrical work — personalization is common on Softails here.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions New Berlin.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in New Berlin?",
        answer: "No. City pages help New Berlin buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to New Berlin?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should New Berlin buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["fat-boy","softail-standard","breakout"],
    neighborCitySlugs: ["brookfield","muskego","greenfield","waukesha"],
  }),

  defineLocationPack({
    slug: "muskego",
    lat: 42.9058,
    lng: -88.1387,
    localContext: [
      "Muskego sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Lake-country edges and quieter connectors than I-94 — good for dialing in a new bike.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Muskego storefront claims.",
    ],
    travelNotes: [
      "Muskego is southwest of Milwaukee via Highway 36 corridors — plan a non-rush-hour first visit.",
      "Primary travel corridor context: Highway 36 / Janesville Road.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Lake-country edges and quieter connectors than I-94 — good for dialing in a new bike.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["lake-area meets","charity rides"],
    eventNotes: [
      "Local lake-area meets are informal; verify any posted ride before you depend on it.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Think about garage height and driveway slope before committing to a tall adventure bike or Trike.",
      "Take a safety course seriously if you are newer — Muskego traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Muskego"),
    financingNotes: financingNotesFor("Muskego"),
    serviceEducation: serviceEducationFor("Muskego"),
    inventoryFraming: [
      "Look for tip-over evidence — gravel and boat-trailer traffic are part of lake-country life.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Muskego.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Muskego?",
        answer: "No. City pages help Muskego buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Muskego?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Muskego buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["heritage-classic","tri-glide","pan-america"],
    neighborCitySlugs: ["new-berlin","franklin","mukwonago","waukesha"],
  }),

  defineLocationPack({
    slug: "waukesha",
    lat: 43.0117,
    lng: -88.2315,
    localContext: [
      "Waukesha sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "County-seat energy with access to both suburban connectors and western lake-country loops.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Waukesha storefront claims.",
    ],
    travelNotes: [
      "Waukesha is a natural west-metro hub — I-94 and Highway 18 shape most shopping trips.",
      "Primary travel corridor context: I-94 / Highway 18.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "County-seat energy with access to both suburban connectors and western lake-country loops.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["county rides","charity events"],
    eventNotes: [
      "County charity rides are common in season — confirm registration details with organizers.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Decide whether your miles are interstate, county roads, or both before picking Touring vs Softail.",
      "Take a safety course seriously if you are newer — Waukesha traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Waukesha"),
    financingNotes: financingNotesFor("Waukesha"),
    serviceEducation: serviceEducationFor("Waukesha"),
    inventoryFraming: [
      "Waukesha County buyers should scrutinize service history — mixed road salt and rural gravel take a toll.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Waukesha.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Waukesha?",
        answer: "No. City pages help Waukesha buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Waukesha?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Waukesha buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["road-glide","street-glide","softail-standard"],
    neighborCitySlugs: ["brookfield","pewaukee","delafield","new-berlin"],
  }),

  defineLocationPack({
    slug: "pewaukee",
    lat: 43.0806,
    lng: -88.2615,
    localContext: [
      "Pewaukee sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Lake Pewaukee weekends and evening rides toward lake country.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Pewaukee storefront claims.",
    ],
    travelNotes: [
      "Pewaukee is west on the I-94 / Highway 16 corridor — plan around summer lake traffic.",
      "Primary travel corridor context: I-94 / Highway 16.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Lake Pewaukee weekends and evening rides toward lake country.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["lake weekends","club meets"],
    eventNotes: [
      "Lake weekend meetups vary yearly — treat social posts as tips, not schedules we host.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If two-up lake weekends matter, sit with your passenger before you buy.",
      "Take a safety course seriously if you are newer — Pewaukee traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Pewaukee"),
    financingNotes: financingNotesFor("Pewaukee"),
    serviceEducation: serviceEducationFor("Pewaukee"),
    inventoryFraming: [
      "Check luggage and passenger gear condition — weekend touring use shows up there first.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Pewaukee.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Pewaukee?",
        answer: "No. City pages help Pewaukee buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Pewaukee?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Pewaukee buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["electra-glide","heritage-classic","road-king"],
    neighborCitySlugs: ["waukesha","delafield","brookfield"],
  }),

  defineLocationPack({
    slug: "delafield",
    lat: 43.0608,
    lng: -88.4037,
    localContext: [
      "Delafield sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Lake-country towns, rolling roads, and scenic weekend loops west of Waukesha.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Delafield storefront claims.",
    ],
    travelNotes: [
      "Delafield sits further west on I-94 — build extra time for a relaxed first visit rather than rushing.",
      "Primary travel corridor context: I-94 / Highway 83.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Lake-country towns, rolling roads, and scenic weekend loops west of Waukesha.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["lake-country rides","seasonal meets"],
    eventNotes: [
      "Scenic ride posts are plentiful — verify start points and weather before you go.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Prioritize comfort and wind protection if your miles include open lake-country highways.",
      "Take a safety course seriously if you are newer — Delafield traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Delafield"),
    financingNotes: financingNotesFor("Delafield"),
    serviceEducation: serviceEducationFor("Delafield"),
    inventoryFraming: [
      "Inspect for highway wear: tires, windshields, and bag hardware on Touring examples.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Delafield.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Delafield?",
        answer: "No. City pages help Delafield buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Delafield?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Delafield buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["road-glide","street-glide-special","heritage-classic"],
    neighborCitySlugs: ["oconomowoc","pewaukee","waukesha"],
  }),

  defineLocationPack({
    slug: "oconomowoc",
    lat: 43.1117,
    lng: -88.4993,
    localContext: [
      "Oconomowoc sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Western lake country with longer connectors back toward metro Milwaukee.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Oconomowoc storefront claims.",
    ],
    travelNotes: [
      "Oconomowoc is a longer hop west — consider combining the visit with a planned county-road loop home.",
      "Primary travel corridor context: I-94 west / Highway 16.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Western lake country with longer connectors back toward metro Milwaukee.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["lake festivals","weekend loops"],
    eventNotes: [
      "Festival weekends change traffic; schedule bike appointments around peak crowds.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Think about overnight luggage if you often ride farther west on weekends.",
      "Take a safety course seriously if you are newer — Oconomowoc traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Oconomowoc"),
    financingNotes: financingNotesFor("Oconomowoc"),
    serviceEducation: serviceEducationFor("Oconomowoc"),
    inventoryFraming: [
      "Higher-mile Touring bikes are common in lake country — service records matter.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Oconomowoc.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Oconomowoc?",
        answer: "No. City pages help Oconomowoc buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Oconomowoc?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Oconomowoc buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["electra-glide","road-king","tri-glide"],
    neighborCitySlugs: ["delafield","waukesha"],
  }),

  defineLocationPack({
    slug: "racine",
    lat: 42.7261,
    lng: -87.7829,
    localContext: [
      "Racine sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Lakefront city riding with easy I-94 access north to Milwaukee and south to Kenosha.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Racine storefront claims.",
    ],
    travelNotes: [
      "Racine buyers often use I-94 — watch for construction and lake wind on the last miles.",
      "Primary travel corridor context: I-94 / Highway 32.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Lakefront city riding with easy I-94 access north to Milwaukee and south to Kenosha.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["harbor rides","charity runs"],
    eventNotes: [
      "Harbor-area rides depend on weather; always have a bailout plan.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If you ride the lakefront often, prioritize wind protection and tire condition.",
      "Take a safety course seriously if you are newer — Racine traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Racine"),
    financingNotes: financingNotesFor("Racine"),
    serviceEducation: serviceEducationFor("Racine"),
    inventoryFraming: [
      "Salt and lake weather punish chrome and electrics — inspect carefully.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Racine.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Racine?",
        answer: "No. City pages help Racine buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Racine?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Racine buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["street-glide","road-glide","forty-eight"],
    neighborCitySlugs: ["kenosha","oak-creek","milwaukee","burlington"],
  }),

  defineLocationPack({
    slug: "kenosha",
    lat: 42.5847,
    lng: -87.8212,
    localContext: [
      "Kenosha sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Wisconsin-Illinois border city with lakefront access and interstate commuting patterns.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Kenosha storefront claims.",
    ],
    travelNotes: [
      "Kenosha is on the I-94 spine — convenient from Chicagoland but plan border-traffic timing.",
      "Primary travel corridor context: I-94 / Highway 50.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Wisconsin-Illinois border city with lakefront access and interstate commuting patterns.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["border-area rides","bike nights"],
    eventNotes: [
      "Bike nights on either side of the border change venues — confirm before you ride.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Be honest about whether you need a Wisconsin-focused bike or cross-border commuting capability.",
      "Take a safety course seriously if you are newer — Kenosha traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Kenosha"),
    financingNotes: financingNotesFor("Kenosha"),
    serviceEducation: serviceEducationFor("Kenosha"),
    inventoryFraming: [
      "Cross-border shoppers should confirm title and registration steps early — Joe helps with questions, not invented legal advice.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Kenosha.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Kenosha?",
        answer: "No. City pages help Kenosha buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Kenosha?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Kenosha buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["street-glide","softail-standard","sportster-s"],
    neighborCitySlugs: ["racine","burlington","oak-creek"],
  }),

  defineLocationPack({
    slug: "burlington",
    lat: 42.6781,
    lng: -88.2762,
    localContext: [
      "Burlington sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Smaller-city pace with farm-and-lake connectors across western Racine County.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Burlington storefront claims.",
    ],
    travelNotes: [
      "Burlington is inland from the lake cities — expect a quieter approach than I-94 alone.",
      "Primary travel corridor context: Highway 36 / Highway 83.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Smaller-city pace with farm-and-lake connectors across western Racine County.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["small-town rallies","club rides"],
    eventNotes: [
      "Small-town events are easy to romanticize — still verify dates with organizers.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If most of your miles are two-lanes, Softail comfort may beat full Touring bulk.",
      "Take a safety course seriously if you are newer — Burlington traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Burlington"),
    financingNotes: financingNotesFor("Burlington"),
    serviceEducation: serviceEducationFor("Burlington"),
    inventoryFraming: [
      "Look for gravel rash and undercarriage scrapes from rural roads.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Burlington.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Burlington?",
        answer: "No. City pages help Burlington buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Burlington?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Burlington buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["heritage-classic","fat-boy","iron-883"],
    neighborCitySlugs: ["racine","kenosha","mukwonago","muskego"],
  }),

  defineLocationPack({
    slug: "mukwonago",
    lat: 42.8567,
    lng: -88.3334,
    localContext: [
      "Mukwonago sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Gateway toward Kettle Moraine-style countryside without claiming trail expertise we do not have.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Mukwonago storefront claims.",
    ],
    travelNotes: [
      "Mukwonago sits southwest via I-43 corridors — a sensible meet point for western Waukesha County buyers.",
      "Primary travel corridor context: I-43 / Highway 83.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Gateway toward Kettle Moraine-style countryside without claiming trail expertise we do not have.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["countryside loops","charity rides"],
    eventNotes: [
      "Countryside loop ideas are inspiration only — not turn-by-turn GPS products.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If you want weekend countryside miles, prioritize seat and wind solutions early.",
      "Take a safety course seriously if you are newer — Mukwonago traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Mukwonago"),
    financingNotes: financingNotesFor("Mukwonago"),
    serviceEducation: serviceEducationFor("Mukwonago"),
    inventoryFraming: [
      "Check luggage mounts and windshield hardware on light-touring Softails.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Mukwonago.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Mukwonago?",
        answer: "No. City pages help Mukwonago buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Mukwonago?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Mukwonago buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["heritage-classic","pan-america","low-rider"],
    neighborCitySlugs: ["muskego","burlington","waukesha"],
  }),

  defineLocationPack({
    slug: "west-bend",
    lat: 43.4253,
    lng: -88.1834,
    localContext: [
      "West Bend sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "North of metro Milwaukee with river-town character and access south toward Germantown.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake West Bend storefront claims.",
    ],
    travelNotes: [
      "West Bend is a northern SE WI hop via US 45 — build time for a relaxed first visit.",
      "Primary travel corridor context: US 45 / Highway 33.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "North of metro Milwaukee with river-town character and access south toward Germantown.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["river-town meets","season openers"],
    eventNotes: [
      "Season openers north of Milwaukee vary — confirm with local clubs.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Newer riders often start lighter; Touring weight is a real conversation in parking lots.",
      "Take a safety course seriously if you are newer — West Bend traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("West Bend"),
    financingNotes: financingNotesFor("West Bend"),
    serviceEducation: serviceEducationFor("West Bend"),
    inventoryFraming: [
      "Northern miles mean winter storage stories — ask how the bike was stored.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions West Bend.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in West Bend?",
        answer: "No. City pages help West Bend buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to West Bend?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should West Bend buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["nightster","iron-883","street-bob"],
    neighborCitySlugs: ["germantown","hartford","cedarburg","milwaukee"],
  }),

  defineLocationPack({
    slug: "germantown",
    lat: 43.2286,
    lng: -88.1104,
    localContext: [
      "Germantown sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "North-west suburb with quick access to both metro Milwaukee and West Bend corridors.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Germantown storefront claims.",
    ],
    travelNotes: [
      "Germantown is a practical northern suburb stop — less lakefront congestion than Port Washington runs.",
      "Primary travel corridor context: US 41/45 / Freistadt Road.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "North-west suburb with quick access to both metro Milwaukee and West Bend corridors.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["suburban meets","charity rides"],
    eventNotes: [
      "Suburban charity rides are frequent in season — registration details live with organizers.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Commuter Softails and approachable Sportsters are common starting points — sit before you decide.",
      "Take a safety course seriously if you are newer — Germantown traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Germantown"),
    financingNotes: financingNotesFor("Germantown"),
    serviceEducation: serviceEducationFor("Germantown"),
    inventoryFraming: [
      "Inspect aftermarket lighting and phone mounts common on daily riders.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Germantown.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Germantown?",
        answer: "No. City pages help Germantown buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Germantown?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Germantown buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["street-bob","softail-standard","nightster"],
    neighborCitySlugs: ["menomonee-falls","west-bend","mequon","milwaukee"],
  }),

  defineLocationPack({
    slug: "menomonee-falls",
    lat: 43.1789,
    lng: -88.1173,
    localContext: [
      "Menomonee Falls sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "North-west Falls area with shopping corridors and quick access into Milwaukee.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Menomonee Falls storefront claims.",
    ],
    travelNotes: [
      "Menomonee Falls is reachable via US 41/45 — watch retail traffic near peak hours.",
      "Primary travel corridor context: US 41/45 / Highway 74.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "North-west Falls area with shopping corridors and quick access into Milwaukee.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["weekend rides","bike nights"],
    eventNotes: [
      "Bike nights move — treat flyers as tips to verify.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If you share the bike two-up for errands, verify passenger pegs and seat before purchase.",
      "Take a safety course seriously if you are newer — Menomonee Falls traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Menomonee Falls"),
    financingNotes: financingNotesFor("Menomonee Falls"),
    serviceEducation: serviceEducationFor("Menomonee Falls"),
    inventoryFraming: [
      "Daily-driven Softails may show cable and lever wear — check controls carefully.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Menomonee Falls.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Menomonee Falls?",
        answer: "No. City pages help Menomonee Falls buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Menomonee Falls?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Menomonee Falls buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["fat-boy","low-rider","forty-eight"],
    neighborCitySlugs: ["germantown","brookfield","milwaukee","pewaukee"],
  }),

  defineLocationPack({
    slug: "hartford",
    lat: 43.3178,
    lng: -88.379,
    localContext: [
      "Hartford sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Further northwest SE WI with agricultural connectors and quieter practice roads.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Hartford storefront claims.",
    ],
    travelNotes: [
      "Hartford is a longer northern hop — combine the trip with clear questions so one visit counts.",
      "Primary travel corridor context: Highway 60 / Highway 83.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Further northwest SE WI with agricultural connectors and quieter practice roads.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["small-town rides","club meets"],
    eventNotes: [
      "Small-town ride calendars are unofficial — always confirm.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Be realistic about first-bike weight if most of your practice will be rural two-lanes.",
      "Take a safety course seriously if you are newer — Hartford traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Hartford"),
    financingNotes: financingNotesFor("Hartford"),
    serviceEducation: serviceEducationFor("Hartford"),
    inventoryFraming: [
      "Rural storage and barn finds need extra scrutiny — paperwork and compression stories matter.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Hartford.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Hartford?",
        answer: "No. City pages help Hartford buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Hartford?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Hartford buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["iron-883","softail-standard","heritage-classic"],
    neighborCitySlugs: ["west-bend","germantown","oconomowoc","waukesha"],
  }),

  defineLocationPack({
    slug: "port-washington",
    lat: 43.3872,
    lng: -87.8756,
    localContext: [
      "Port Washington sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Harbor town riding with Lake Michigan wind and scenic north-shore day loops.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Port Washington storefront claims.",
    ],
    travelNotes: [
      "Port Washington via I-43 north — lake wind can surprise; dress and time your return.",
      "Primary travel corridor context: I-43 north / Highway 32.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Harbor town riding with Lake Michigan wind and scenic north-shore day loops.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["harbor events","lake loops"],
    eventNotes: [
      "Harbor events are seasonal; check city and organizer listings.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Wind protection matters more on the north shore than in sheltered suburbs.",
      "Take a safety course seriously if you are newer — Port Washington traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Port Washington"),
    financingNotes: financingNotesFor("Port Washington"),
    serviceEducation: serviceEducationFor("Port Washington"),
    inventoryFraming: [
      "Corrosion and electrical gremlins show up near the lake — inspect carefully.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Port Washington.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Port Washington?",
        answer: "No. City pages help Port Washington buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Port Washington?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Port Washington buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["road-glide","street-glide","road-king"],
    neighborCitySlugs: ["cedarburg","grafton","milwaukee","sheboygan"],
  }),

  defineLocationPack({
    slug: "cedarburg",
    lat: 43.2967,
    lng: -87.9876,
    localContext: [
      "Cedarburg sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Historic downtown stops and north-shore connectors without inventing tourist cliches.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Cedarburg storefront claims.",
    ],
    travelNotes: [
      "Cedarburg is north via I-43 — weekend downtown parking fills; plan sit time accordingly.",
      "Primary travel corridor context: I-43 / Highway 57.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Historic downtown stops and north-shore connectors without inventing tourist cliches.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["downtown weekends","charity rides"],
    eventNotes: [
      "Downtown weekends are busy — schedule quiet walkarounds when possible.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Style-forward Softails are popular — still buy the mechanical story first.",
      "Take a safety course seriously if you are newer — Cedarburg traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Cedarburg"),
    financingNotes: financingNotesFor("Cedarburg"),
    serviceEducation: serviceEducationFor("Cedarburg"),
    inventoryFraming: [
      "Check customization quality; pretty bikes can hide rushed wiring.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Cedarburg.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Cedarburg?",
        answer: "No. City pages help Cedarburg buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Cedarburg?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Cedarburg buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["breakout","fat-boy","forty-eight"],
    neighborCitySlugs: ["grafton","port-washington","mequon","milwaukee"],
  }),

  defineLocationPack({
    slug: "grafton",
    lat: 43.3197,
    lng: -87.9512,
    localContext: [
      "Grafton sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "North-shore suburb between Cedarburg charm and Port Washington lake wind.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Grafton storefront claims.",
    ],
    travelNotes: [
      "Grafton is a convenient I-43 stop for north-shore buyers comparing multiple units in one trip.",
      "Primary travel corridor context: I-43 / Highway 60.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "North-shore suburb between Cedarburg charm and Port Washington lake wind.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["north-shore loops","club rides"],
    eventNotes: [
      "North-shore loop ideas are planning notes, not GPS files.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If you split time between highway and town riding, sit on both Touring and Softail.",
      "Take a safety course seriously if you are newer — Grafton traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Grafton"),
    financingNotes: financingNotesFor("Grafton"),
    serviceEducation: serviceEducationFor("Grafton"),
    inventoryFraming: [
      "Look for highway miles disguised as garage queens — tire date codes tell the truth.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Grafton.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Grafton?",
        answer: "No. City pages help Grafton buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Grafton?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Grafton buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["street-glide","heritage-classic","low-rider"],
    neighborCitySlugs: ["cedarburg","port-washington","mequon","milwaukee"],
  }),

  defineLocationPack({
    slug: "mequon",
    lat: 43.2367,
    lng: -87.984,
    localContext: [
      "Mequon sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "North-shore suburb with polished corridors and access to both lake and inland routes.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Mequon storefront claims.",
    ],
    travelNotes: [
      "Mequon via I-43 is straightforward — watch for speed transitions near retail stretches.",
      "Primary travel corridor context: I-43 / Interstate 43 frontage.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "North-shore suburb with polished corridors and access to both lake and inland routes.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["charity rides","weekend meets"],
    eventNotes: [
      "Charity rides need official registration — we do not invent entry lists.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "Two-up comfort and storage often matter for Mequon weekend plans — verify passenger setup.",
      "Take a safety course seriously if you are newer — Mequon traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Mequon"),
    financingNotes: financingNotesFor("Mequon"),
    serviceEducation: serviceEducationFor("Mequon"),
    inventoryFraming: [
      "Premium cosmetics should not distract from service records and tire age.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Mequon.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Mequon?",
        answer: "No. City pages help Mequon buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Mequon?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Mequon buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["electra-glide","road-glide","softail-standard"],
    neighborCitySlugs: ["grafton","cedarburg","milwaukee","germantown"],
  }),

  defineLocationPack({
    slug: "sheboygan",
    lat: 43.7508,
    lng: -87.7145,
    localContext: [
      "Sheboygan sits in Southeast Wisconsin's Harley buying orbit — riders here compare live units with Joe instead of trusting invented near-you stock counts.",
      "Farther north lakefront city — longer day trips from metro Milwaukee for serious shoppers.",
      "Joe's guidance is education-first: mirrored dealership inventory, honest next steps, and no fake Sheboygan storefront claims.",
    ],
    travelNotes: [
      "Sheboygan is a longer I-43 commitment — come with a shortlist so the visit earns the miles.",
      "Primary travel corridor context: I-43 north.",
      "Confirm the single published business address before you navigate — city pages are service-area guides, not branch locations.",
    ],
    ridingCulture: [
      "Farther north lakefront city — longer day trips from metro Milwaukee for serious shoppers.",
      "Build day rides that match your experience; Wisconsin weather swings hard in shoulder seasons.",
    ],
    nearbyRouteSlugs: ["lake-michigan-day-loop"],
    nearbyEventThemes: ["lakefront events","club rides"],
    eventNotes: [
      "Lakefront events depend on weather and city calendars — verify locally.",
      "Use /events guides for how to evaluate motorcycle events — we do not publish fake calendars.",
    ],
    buyingAngles: [
      "If most of your riding stays local to Sheboygan, talk about which platform fits your roads — not Milwaukee assumptions.",
      "Take a safety course seriously if you are newer — Sheboygan traffic and road patterns still demand skills.",
      "Ask for service records, title status, and a calm walkaround before you fall in love with chrome.",
      "Compare at least two families (Touring, Softail, Sportster, or Trike) before you lock a direction.",
    ],
    tradeInNotes: tradeInNotesFor("Sheboygan"),
    financingNotes: financingNotesFor("Sheboygan"),
    serviceEducation: serviceEducationFor("Sheboygan"),
    inventoryFraming: [
      "Longer travel to see a bike means remote walkaround videos matter — ask Joe what is actually available.",
      "Empty related inventory means the feed has nothing matching right now — ask Joe what is coming; do not invent bikes.",
      "Price history and condition matter more than whether the listing mentions Sheboygan.",
    ],
    faqs: [
      {
        question: "Do you have a dealership in Sheboygan?",
        answer: "No. City pages help Sheboygan buyers work with Joe across Southeast Wisconsin. We publish one real business address when configured — never fake branches.",
      },
      {
        question: "Can I see live inventory relevant to Sheboygan?",
        answer: "Yes — related inventory is mirrored from the live dealership feed when connected. If the list is empty, nothing matching is available right now.",
      },
      {
        question: "How should Sheboygan buyers think about a first visit?",
        answer: "Know your budget comfort zone, bring questions, and sit on multiple bikes. Joe slows the process down on purpose.",
      },
    ],
    relatedGuideTopics: ["buying", "financing", "trade-in", "maintenance", "routes"],
    relatedModelSlugs: ["street-glide","road-king","iron-883"],
    neighborCitySlugs: ["port-washington","milwaukee","cedarburg","grafton"],
  }),
];
