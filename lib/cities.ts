export interface CityData {
  slug: string;
  name: string;
  county: string;
  zip: string;
  tagline: string;
  description: string;
  localDetail: string;
  nearbyLandmark: string;
  population: string;
  businessFocus: string;
  metaTitle: string;
  metaDescription: string;
  heroStat: string;
  heroStatLabel: string;
  faqExtra?: { q: string; a: string };
}

export const cities: CityData[] = [
  {
    slug: "anaheim",
    name: "Anaheim",
    county: "Orange County",
    zip: "92801",
    tagline: "E-Waste Recycling & IT Asset Disposal for Anaheim Businesses",
    description:
      "Anaheim is home to major hospitality, entertainment, and manufacturing industries — all generating significant volumes of electronics waste. OC Electronic Recycling provides certified pickup, data destruction, and responsible disposal for businesses and residents throughout Anaheim.",
    localDetail:
      "From the Resort District near Disneyland to the Platinum Triangle office corridor, Anaheim businesses trust us for compliant, confidential electronics recycling.",
    nearbyLandmark: "Disneyland Resort",
    population: "346,000+",
    businessFocus: "hospitality, entertainment, and manufacturing sectors",
    metaTitle: "E-Waste Recycling Anaheim CA | OC Electronic Recycling",
    metaDescription:
      "Certified e-waste recycling and IT asset disposal in Anaheim, CA. Free business pickup, NIST 800-88 data destruction, and responsible electronics disposal. Call (949) 345-0285.",
    heroStat: "346K+",
    heroStatLabel: "Anaheim Residents Served",
    faqExtra: {
      q: "Do you pick up from hotels and convention centers in Anaheim?",
      a: "Yes — we regularly service the hospitality corridor near the Anaheim Convention Center and Resort District. Scheduled pickups available for large-volume properties.",
    },
  },
  {
    slug: "irvine",
    name: "Irvine",
    county: "Orange County",
    zip: "92614",
    tagline: "IT Asset Disposition & E-Waste Recycling for Irvine Tech Companies",
    description:
      "Irvine is Orange County's technology and corporate hub, home to thousands of tech firms, biotech companies, and UCI's innovation ecosystem. OC Electronic Recycling specializes in ITAD and certified data destruction tailored for Irvine's demanding corporate compliance requirements.",
    localDetail:
      "Serving the Irvine Spectrum, Irvine Business Complex, and the UCI Research Park — we understand the data security expectations of Irvine's corporate and biotech community.",
    nearbyLandmark: "Irvine Spectrum Center",
    population: "310,000+",
    businessFocus: "technology, biotech, and corporate enterprises",
    metaTitle: "E-Waste Recycling & ITAD Irvine CA | OC Electronic Recycling",
    metaDescription:
      "Enterprise ITAD and e-waste recycling in Irvine, CA. Certified data destruction, server decommissioning, free business pickup. Serving Irvine Spectrum and IBC. Call (949) 345-0285.",
    heroStat: "5,000+",
    heroStatLabel: "Irvine Businesses Served",
    faqExtra: {
      q: "Can you handle large server decommissions for Irvine tech companies?",
      a: "Absolutely. We specialize in full server room and data center decommissioning with NIST 800-88 certified data destruction and chain-of-custody documentation for compliance.",
    },
  },
  {
    slug: "santa-ana",
    name: "Santa Ana",
    county: "Orange County",
    zip: "92701",
    tagline: "Affordable E-Waste Recycling & Electronics Disposal in Santa Ana",
    description:
      "Santa Ana, the county seat of Orange County, is a vibrant community with a diverse mix of small businesses, government offices, and residents. OC Electronic Recycling offers convenient, affordable e-waste pickup and drop-off solutions for all of Santa Ana.",
    localDetail:
      "From Downtown Santa Ana to the Civic Center area, we make it easy for residents and businesses to dispose of electronics responsibly and in compliance with California law.",
    nearbyLandmark: "Santa Ana Civic Center",
    population: "310,000+",
    businessFocus: "government, retail, and small business sectors",
    metaTitle: "E-Waste Recycling Santa Ana CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and electronics disposal in Santa Ana, CA. Serving businesses and residents. Free pickup for qualifying volumes. California-compliant. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Pickup for Business Quantities",
  },
  {
    slug: "huntington-beach",
    name: "Huntington Beach",
    county: "Orange County",
    zip: "92648",
    tagline: "E-Waste Recycling in Huntington Beach — Protecting Our Coast",
    description:
      "Surf City USA takes its environment seriously. Huntington Beach residents and businesses choose OC Electronic Recycling to keep hazardous electronics out of landfills and away from the coastline that defines this iconic community.",
    localDetail:
      "From the Pacific City corridor to Downtown HB, we make electronics recycling easy for Huntington Beach households and local businesses.",
    nearbyLandmark: "Huntington Beach Pier",
    population: "200,000+",
    businessFocus: "retail, hospitality, and coastal small businesses",
    metaTitle: "E-Waste Recycling Huntington Beach CA | OC Electronic Recycling",
    metaDescription:
      "Eco-friendly e-waste recycling in Huntington Beach, CA. Keep electronics out of landfills and protect our coastline. Free pickup available. Call (949) 345-0285.",
    heroStat: "0",
    heroStatLabel: "Pounds Sent to Landfill",
  },
  {
    slug: "garden-grove",
    name: "Garden Grove",
    county: "Orange County",
    zip: "92840",
    tagline: "E-Waste Pickup & Electronics Recycling in Garden Grove",
    description:
      "Garden Grove's diverse residential neighborhoods and commercial corridors generate a steady stream of outdated electronics. OC Electronic Recycling provides reliable, certified pickup and disposal for computers, TVs, phones, and more throughout Garden Grove.",
    localDetail:
      "Serving the Garden Grove Boulevard corridor and surrounding neighborhoods — we make it simple to dispose of electronics responsibly.",
    nearbyLandmark: "Crystal Cathedral (Christ Cathedral)",
    population: "170,000+",
    businessFocus: "retail, food service, and residential communities",
    metaTitle: "E-Waste Recycling Garden Grove CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and electronics pickup in Garden Grove, CA. Computers, TVs, phones, and more. Residential and business service. Call (949) 345-0285.",
    heroStat: "Same",
    heroStatLabel: "Week Pickup Available",
  },
  {
    slug: "fullerton",
    name: "Fullerton",
    county: "Orange County",
    zip: "92832",
    tagline: "E-Waste Recycling for Fullerton Residents, Businesses & Schools",
    description:
      "Home to Cal State Fullerton and a thriving arts and education community, Fullerton generates significant electronics waste from both the academic and business sectors. OC Electronic Recycling offers student-friendly and business-scale ITAD and recycling solutions.",
    localDetail:
      "We partner with educational institutions, local businesses, and residents throughout Fullerton to ensure safe, compliant electronics disposal.",
    nearbyLandmark: "California State University, Fullerton",
    population: "140,000+",
    businessFocus: "education, healthcare, and local business",
    metaTitle: "E-Waste Recycling Fullerton CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling in Fullerton, CA. Serving CSUF, local businesses, and residents. Computer recycling, TV disposal, data destruction. Call (949) 345-0285.",
    heroStat: "100%",
    heroStatLabel: "California-Compliant Disposal",
  },
  {
    slug: "orange",
    name: "Orange",
    county: "Orange County",
    zip: "92868",
    tagline: "Trusted E-Waste Recycling in the City of Orange",
    description:
      "The City of Orange blends historic charm with modern commerce. OC Electronic Recycling provides the same high standard of certified data destruction and electronics disposal that Orange's businesses and households have come to expect.",
    localDetail:
      "Serving Old Towne Orange, the Chapman University area, and commercial zones throughout the City of Orange.",
    nearbyLandmark: "Chapman University",
    population: "140,000+",
    businessFocus: "healthcare, education, and professional services",
    metaTitle: "E-Waste Recycling Orange CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling and ITAD in Orange, CA. Certified data destruction, free business pickup. Serving all of the City of Orange. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Business Pickup",
  },
  {
    slug: "costa-mesa",
    name: "Costa Mesa",
    county: "Orange County",
    zip: "92626",
    tagline: "E-Waste Recycling & ITAD for Costa Mesa's Creative Economy",
    description:
      "Costa Mesa's design, retail, and creative industries are always upgrading equipment. OC Electronic Recycling makes responsible electronics disposal easy for businesses along the 17th Street corridor and South Coast Plaza area.",
    localDetail:
      "From the Segerstrom Center area to Triangle Square, we serve Costa Mesa's unique mix of creative studios, retail, and professional offices.",
    nearbyLandmark: "South Coast Plaza",
    population: "115,000+",
    businessFocus: "design, retail, and creative industries",
    metaTitle: "E-Waste Recycling Costa Mesa CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and IT asset disposal in Costa Mesa, CA. Serving South Coast Plaza area businesses and residents. Certified data destruction. Call (949) 345-0285.",
    heroStat: "NIST",
    heroStatLabel: "800-88 Data Destruction",
  },
  {
    slug: "newport-beach",
    name: "Newport Beach",
    county: "Orange County",
    zip: "92660",
    tagline: "Premium ITAD & E-Waste Recycling for Newport Beach",
    description:
      "Newport Beach's affluent residential community and concentration of financial, legal, and real estate firms demand the highest standards in data security and electronics disposal. OC Electronic Recycling delivers premium, discreet ITAD and certified data destruction.",
    localDetail:
      "Serving Fashion Island, Newport Center, Balboa Island, and the surrounding Newport Beach peninsula with white-glove, confidential electronics recycling.",
    nearbyLandmark: "Fashion Island",
    population: "87,000+",
    businessFocus: "financial services, legal, and high-net-worth residential",
    metaTitle: "E-Waste Recycling & ITAD Newport Beach CA | OC Electronic Recycling",
    metaDescription:
      "Premium IT asset disposal and e-waste recycling in Newport Beach, CA. Confidential data destruction, certified chain of custody. Call (949) 345-0285.",
    heroStat: "Certified",
    heroStatLabel: "Chain of Custody",
  },
  {
    slug: "mission-viejo",
    name: "Mission Viejo",
    county: "Orange County",
    zip: "92691",
    tagline: "E-Waste Recycling for Mission Viejo Homes & Businesses",
    description:
      "Mission Viejo's family-friendly master-planned community generates significant residential electronics waste. OC Electronic Recycling offers convenient scheduled pickups and drop-off options for Mission Viejo residents and the local business community.",
    localDetail:
      "Serving Kaleidoscope Center, the Shops at Mission Viejo area, and all residential communities throughout Mission Viejo.",
    nearbyLandmark: "Lake Mission Viejo",
    population: "95,000+",
    businessFocus: "residential, retail, and healthcare",
    metaTitle: "E-Waste Recycling Mission Viejo CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and electronics disposal in Mission Viejo, CA. Convenient residential pickup, TV recycling, computer disposal. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Residential Pickup Available",
  },
  {
    slug: "tustin",
    name: "Tustin",
    county: "Orange County",
    zip: "92780",
    tagline: "E-Waste Recycling & IT Disposal in Tustin",
    description:
      "Tustin's growing commercial and residential base, including the Tustin Legacy development, is producing more electronics waste than ever. OC Electronic Recycling is the trusted partner for responsible disposal throughout Tustin.",
    localDetail:
      "From Tustin Legacy to Old Town Tustin, we serve the full range of Tustin's residential and commercial electronics recycling needs.",
    nearbyLandmark: "Tustin Legacy (former MCAS Tustin)",
    population: "80,000+",
    businessFocus: "mixed commercial, residential, and light industrial",
    metaTitle: "E-Waste Recycling Tustin CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling and IT asset disposal in Tustin, CA. Certified data destruction, free business pickup. Serving Tustin Legacy and all of Tustin. Call (949) 345-0285.",
    heroStat: "Same",
    heroStatLabel: "Week Service Available",
  },
  {
    slug: "lake-forest",
    name: "Lake Forest",
    county: "Orange County",
    zip: "92630",
    tagline: "Electronics Recycling & ITAD in Lake Forest",
    description:
      "Lake Forest's blend of business parks and residential communities makes it a key market for both commercial ITAD services and residential e-waste collection. OC Electronic Recycling serves the entire Lake Forest corridor.",
    localDetail:
      "Serving the Bake Parkway business corridor, Portola Hills, and all Lake Forest neighborhoods.",
    nearbyLandmark: "Lake Forest Sports Park",
    population: "84,000+",
    businessFocus: "business parks, healthcare, and residential",
    metaTitle: "E-Waste Recycling Lake Forest CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and ITAD in Lake Forest, CA. Computer recycling, data destruction, server disposal. Free business pickup. Call (949) 345-0285.",
    heroStat: "100%",
    heroStatLabel: "Data Destruction Guaranteed",
  },
  {
    slug: "buena-park",
    name: "Buena Park",
    county: "Orange County",
    zip: "90621",
    tagline: "E-Waste Recycling for Buena Park Homes & Businesses",
    description:
      "Buena Park's entertainment district and diverse residential neighborhoods rely on OC Electronic Recycling for convenient, certified electronics disposal that keeps hazardous materials out of landfills.",
    localDetail:
      "Serving Knott's Berry Farm area businesses, the Beach Boulevard corridor, and all Buena Park residential communities.",
    nearbyLandmark: "Knott's Berry Farm",
    population: "82,000+",
    businessFocus: "entertainment, hospitality, and retail",
    metaTitle: "E-Waste Recycling Buena Park CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling and disposal in Buena Park, CA. TVs, computers, phones and more. Residential and business pickup. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Drop-Off for Residents",
  },
  {
    slug: "westminster",
    name: "Westminster",
    county: "Orange County",
    zip: "92683",
    tagline: "E-Waste Pickup & Electronics Recycling in Westminster",
    description:
      "Westminster, home to the vibrant Little Saigon district, has a strong community of small businesses and households that rely on OC Electronic Recycling for affordable, responsible electronics disposal.",
    localDetail:
      "Serving Little Saigon, Bolsa Avenue businesses, and all Westminster neighborhoods with bilingual-friendly service.",
    nearbyLandmark: "Little Saigon (Bolsa Avenue)",
    population: "91,000+",
    businessFocus: "small business, retail, and diverse residential communities",
    metaTitle: "E-Waste Recycling Westminster CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling in Westminster, CA. Serving Little Saigon and all of Westminster. Computer disposal, TV recycling, data destruction. Call (949) 345-0285.",
    heroStat: "Same",
    heroStatLabel: "Week Pickup Available",
  },
  {
    slug: "yorba-linda",
    name: "Yorba Linda",
    county: "Orange County",
    zip: "92886",
    tagline: "Responsible E-Waste Recycling in Yorba Linda",
    description:
      "Yorba Linda's upscale residential community and growing commercial sector trust OC Electronic Recycling for safe, confidential, and convenient electronics disposal.",
    localDetail:
      "Serving Yorba Linda Town Center, Savi Ranch business park, and all Yorba Linda residential communities.",
    nearbyLandmark: "Nixon Presidential Library",
    population: "68,000+",
    businessFocus: "residential, business parks, and professional services",
    metaTitle: "E-Waste Recycling Yorba Linda CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and data destruction in Yorba Linda, CA. Residential and business service. Free business pickup. Call (949) 345-0285.",
    heroStat: "Certified",
    heroStatLabel: "Data Destruction",
  },
  {
    slug: "placentia",
    name: "Placentia",
    county: "Orange County",
    zip: "92870",
    tagline: "E-Waste Recycling & Electronics Disposal in Placentia",
    description:
      "Placentia's residential neighborhoods and commercial areas choose OC Electronic Recycling for quick, compliant electronics disposal with no hassle.",
    localDetail:
      "Serving all Placentia neighborhoods and the Orangethorpe Avenue commercial corridor.",
    nearbyLandmark: "Placentia Heritage Park",
    population: "52,000+",
    businessFocus: "residential and light commercial",
    metaTitle: "E-Waste Recycling Placentia CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling in Placentia, CA. Computers, TVs, phones, and more. Residential and business pickup. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Business Pickup",
  },
  {
    slug: "la-habra",
    name: "La Habra",
    county: "Orange County",
    zip: "90631",
    tagline: "Electronics Recycling & E-Waste Disposal in La Habra",
    description:
      "La Habra's diverse community of residents and small businesses relies on OC Electronic Recycling for affordable, certified electronics disposal that meets California regulations.",
    localDetail:
      "Serving Imperial Highway businesses and all La Habra residential neighborhoods.",
    nearbyLandmark: "La Habra Children's Museum",
    population: "62,000+",
    businessFocus: "residential, retail, and small business",
    metaTitle: "E-Waste Recycling La Habra CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and electronics disposal in La Habra, CA. Computers, TVs, and more. Residential and business service. Call (949) 345-0285.",
    heroStat: "100%",
    heroStatLabel: "Compliant Disposal",
  },
  {
    slug: "brea",
    name: "Brea",
    county: "Orange County",
    zip: "92821",
    tagline: "E-Waste Recycling & IT Asset Disposal in Brea",
    description:
      "Brea's oil-turned-technology corridor and residential communities generate significant electronics waste. OC Electronic Recycling handles everything from single-device drop-offs to full corporate IT decommissions.",
    localDetail:
      "Serving Brea Mall area businesses, the Carbon Canyon corridor, and all Brea neighborhoods.",
    nearbyLandmark: "Brea Mall",
    population: "45,000+",
    businessFocus: "corporate, retail, and residential",
    metaTitle: "E-Waste Recycling Brea CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling and IT asset disposal in Brea, CA. Certified data destruction, server decommissioning. Call (949) 345-0285.",
    heroStat: "NIST",
    heroStatLabel: "800-88 Data Wipe",
  },
  {
    slug: "aliso-viejo",
    name: "Aliso Viejo",
    county: "Orange County",
    zip: "92656",
    tagline: "Corporate E-Waste Recycling & ITAD in Aliso Viejo",
    description:
      "Aliso Viejo's dense concentration of tech companies and professional offices makes it one of South OC's most active markets for ITAD and certified data destruction. OC Electronic Recycling is the local specialist.",
    localDetail:
      "Serving Pacific Park Drive offices, Aliso Viejo Town Center, and the full Aliso Viejo business community.",
    nearbyLandmark: "Aliso Viejo Town Center",
    population: "53,000+",
    businessFocus: "technology companies and professional services",
    metaTitle: "E-Waste Recycling & ITAD Aliso Viejo CA | OC Electronic Recycling",
    metaDescription:
      "ITAD and e-waste recycling in Aliso Viejo, CA. Certified data destruction for tech companies. Free business pickup. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Corporate Pickup",
  },
  {
    slug: "laguna-niguel",
    name: "Laguna Niguel",
    county: "Orange County",
    zip: "92677",
    tagline: "E-Waste Recycling for Laguna Niguel Homes & Offices",
    description:
      "Laguna Niguel's upscale residential community and growing professional services sector trust OC Electronic Recycling for discreet, certified, and convenient electronics disposal.",
    localDetail:
      "Serving Crown Valley Parkway businesses and all Laguna Niguel residential communities.",
    nearbyLandmark: "Laguna Niguel Regional Park",
    population: "67,000+",
    businessFocus: "residential, financial services, and healthcare",
    metaTitle: "E-Waste Recycling Laguna Niguel CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling and data destruction in Laguna Niguel, CA. Residential and business service. Certified disposal. Call (949) 345-0285.",
    heroStat: "Certified",
    heroStatLabel: "Secure Data Destruction",
  },
  {
    slug: "laguna-hills",
    name: "Laguna Hills",
    county: "Orange County",
    zip: "92653",
    tagline: "E-Waste Recycling & Electronics Disposal in Laguna Hills",
    description:
      "Laguna Hills businesses and residents choose OC Electronic Recycling for fast, reliable, and California-compliant electronics disposal.",
    localDetail:
      "Serving Laguna Hills Mall area, El Toro Road corridor, and all Laguna Hills neighborhoods.",
    nearbyLandmark: "Laguna Hills Mall",
    population: "32,000+",
    businessFocus: "healthcare, retail, and residential",
    metaTitle: "E-Waste Recycling Laguna Hills CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and electronics disposal in Laguna Hills, CA. Computers, TVs, servers. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Business Pickup",
  },
  {
    slug: "laguna-beach",
    name: "Laguna Beach",
    county: "Orange County",
    zip: "92651",
    tagline: "Eco-Conscious E-Waste Recycling in Laguna Beach",
    description:
      "Laguna Beach's commitment to environmental preservation extends to electronics recycling. OC Electronic Recycling helps the Laguna Beach community dispose of electronics responsibly, protecting the coastal environment they love.",
    localDetail:
      "Serving Laguna Beach's arts community, hospitality businesses, and residential neighborhoods with eco-conscious electronics disposal.",
    nearbyLandmark: "Heisler Park",
    population: "23,000+",
    businessFocus: "arts, hospitality, and eco-conscious residential",
    metaTitle: "E-Waste Recycling Laguna Beach CA | OC Electronic Recycling",
    metaDescription:
      "Eco-friendly e-waste recycling in Laguna Beach, CA. Protect the coast — recycle your electronics responsibly. Call (949) 345-0285.",
    heroStat: "0",
    heroStatLabel: "Pounds to Landfill",
  },
  {
    slug: "dana-point",
    name: "Dana Point",
    county: "Orange County",
    zip: "92629",
    tagline: "E-Waste Recycling in Dana Point — Protect the Harbor",
    description:
      "Dana Point's ocean-loving community takes environmental responsibility seriously. OC Electronic Recycling provides convenient, certified electronics disposal that keeps toxins out of the watershed and off the beaches.",
    localDetail:
      "Serving Dana Point Harbor, Lantern District businesses, and all Dana Point residential neighborhoods.",
    nearbyLandmark: "Dana Point Harbor",
    population: "34,000+",
    businessFocus: "marine, hospitality, and coastal residential",
    metaTitle: "E-Waste Recycling Dana Point CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling in Dana Point, CA. Responsible disposal to protect Dana Point Harbor. Residential and business service. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Residential Pickup",
  },
  {
    slug: "san-clemente",
    name: "San Clemente",
    county: "Orange County",
    zip: "92672",
    tagline: "E-Waste Recycling in San Clemente — The Spanish Village by the Sea",
    description:
      "San Clemente's surf culture and environmental ethos make responsible e-waste recycling a natural fit. OC Electronic Recycling serves San Clemente's southernmost OC community with certified, convenient electronics disposal.",
    localDetail:
      "Serving Avenida Del Mar businesses, San Clemente Pier area, and all San Clemente residential neighborhoods.",
    nearbyLandmark: "San Clemente Pier",
    population: "65,000+",
    businessFocus: "retail, hospitality, and residential",
    metaTitle: "E-Waste Recycling San Clemente CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and electronics disposal in San Clemente, CA. Free pickup available. Protecting San Clemente's coast. Call (949) 345-0285.",
    heroStat: "100%",
    heroStatLabel: "Eco-Responsible",
  },
  {
    slug: "san-juan-capistrano",
    name: "San Juan Capistrano",
    county: "Orange County",
    zip: "92675",
    tagline: "Electronics Recycling in San Juan Capistrano",
    description:
      "San Juan Capistrano's historic community and growing residential base rely on OC Electronic Recycling for simple, responsible electronics disposal.",
    localDetail:
      "Serving the Ortega Highway corridor, historic downtown, and all San Juan Capistrano neighborhoods.",
    nearbyLandmark: "Mission San Juan Capistrano",
    population: "36,000+",
    businessFocus: "residential, retail, and historic district businesses",
    metaTitle: "E-Waste Recycling San Juan Capistrano CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling in San Juan Capistrano, CA. Computers, TVs, phones and more. Residential and business pickup. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Business Pickup",
  },
  {
    slug: "rancho-santa-margarita",
    name: "Rancho Santa Margarita",
    county: "Orange County",
    zip: "92688",
    tagline: "E-Waste Recycling for Rancho Santa Margarita Families & Businesses",
    description:
      "RSM's family-centric master-planned community and local business district choose OC Electronic Recycling for safe, convenient electronics disposal that reflects their community values.",
    localDetail:
      "Serving the Rancho Santa Margarita Towne Centre and all RSM residential communities.",
    nearbyLandmark: "Lago Santa Margarita",
    population: "48,000+",
    businessFocus: "residential and local small business",
    metaTitle: "E-Waste Recycling Rancho Santa Margarita CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling in Rancho Santa Margarita, CA. Family-friendly, convenient electronics disposal. Call (949) 345-0285.",
    heroStat: "Same",
    heroStatLabel: "Week Service",
  },
  {
    slug: "coto-de-caza",
    name: "Coto de Caza",
    county: "Orange County",
    zip: "92679",
    tagline: "Premium E-Waste & ITAD Services for Coto de Caza",
    description:
      "Coto de Caza's exclusive gated community and high-net-worth residents trust OC Electronic Recycling for discreet, white-glove electronics disposal and data destruction.",
    localDetail:
      "Providing scheduled in-community pickup for Coto de Caza residents with full data security and certification.",
    nearbyLandmark: "Coto de Caza Golf & Racquet Club",
    population: "15,000+",
    businessFocus: "high-net-worth residential and executive community",
    metaTitle: "E-Waste Recycling Coto de Caza CA | OC Electronic Recycling",
    metaDescription:
      "Discreet e-waste recycling and data destruction in Coto de Caza, CA. White-glove service for Coto residents. Call (949) 345-0285.",
    heroStat: "Discreet",
    heroStatLabel: "White-Glove Service",
  },
  {
    slug: "ladera-ranch",
    name: "Ladera Ranch",
    county: "Orange County",
    zip: "92694",
    tagline: "E-Waste Recycling for Ladera Ranch Families",
    description:
      "Ladera Ranch's award-winning master-planned community chooses OC Electronic Recycling for hassle-free, eco-responsible electronics disposal for families and home offices.",
    localDetail:
      "Serving all Ladera Ranch villages including Covenant Hills, Terramor, and Avendale.",
    nearbyLandmark: "Ladera Ranch Water Tower",
    population: "25,000+",
    businessFocus: "family residential and home office",
    metaTitle: "E-Waste Recycling Ladera Ranch CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling in Ladera Ranch, CA. Easy residential pickup for computers, TVs, and electronics. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Residential Pickup",
  },
  {
    slug: "foothill-ranch",
    name: "Foothill Ranch",
    county: "Orange County",
    zip: "92610",
    tagline: "Electronics Recycling & E-Waste Disposal in Foothill Ranch",
    description:
      "Foothill Ranch's residential neighborhoods and the Foothill Ranch Towne Centre commercial area rely on OC Electronic Recycling for convenient, certified electronics disposal.",
    localDetail:
      "Serving Foothill Ranch Towne Centre and all Foothill Ranch residential communities.",
    nearbyLandmark: "Foothill Ranch Towne Centre",
    population: "14,000+",
    businessFocus: "residential and retail",
    metaTitle: "E-Waste Recycling Foothill Ranch CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling in Foothill Ranch, CA. Computer and TV disposal. Free pickup. Call (949) 345-0285.",
    heroStat: "Same",
    heroStatLabel: "Week Pickup",
  },
  {
    slug: "el-toro",
    name: "El Toro",
    county: "Orange County",
    zip: "92630",
    tagline: "E-Waste Recycling & Electronics Disposal in El Toro",
    description:
      "The El Toro area's residential communities and commercial zones choose OC Electronic Recycling for straightforward, California-compliant electronics disposal.",
    localDetail:
      "Serving the El Toro Road corridor and surrounding Lake Forest/El Toro neighborhoods.",
    nearbyLandmark: "Marine Corps Air Station El Toro (Great Park)",
    population: "Unincorporated area",
    businessFocus: "residential and light commercial",
    metaTitle: "E-Waste Recycling El Toro CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling in El Toro, CA. Computers, TVs, and more. Residential and business service. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Business Pickup",
  },
  {
    slug: "trabuco-canyon",
    name: "Trabuco Canyon",
    county: "Orange County",
    zip: "92679",
    tagline: "E-Waste Recycling in Trabuco Canyon",
    description:
      "Trabuco Canyon's rural and semi-rural communities count on OC Electronic Recycling for scheduled electronics pickup — no need to drive far to dispose of computers, TVs, or appliances responsibly.",
    localDetail:
      "We travel out to Trabuco Canyon — bringing responsible recycling to this beautiful South OC community.",
    nearbyLandmark: "O'Neill Regional Park",
    population: "5,000+",
    businessFocus: "rural residential and equestrian community",
    metaTitle: "E-Waste Recycling Trabuco Canyon CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling pickup in Trabuco Canyon, CA. We come to you — computers, TVs, electronics. Call (949) 345-0285.",
    heroStat: "We",
    heroStatLabel: "Come To You",
  },
  {
    slug: "cypress",
    name: "Cypress",
    county: "Orange County",
    zip: "90630",
    tagline: "E-Waste Recycling & IT Disposal for Cypress Businesses",
    description:
      "Cypress's mix of light industrial, commercial, and residential areas generates a steady stream of electronics waste. OC Electronic Recycling provides reliable, certified disposal solutions for all of Cypress.",
    localDetail:
      "Serving Cypress business parks, Katella Avenue corridor, and all Cypress residential communities.",
    nearbyLandmark: "Los Alamitos Race Course",
    population: "50,000+",
    businessFocus: "light industrial, commercial, and residential",
    metaTitle: "E-Waste Recycling Cypress CA | OC Electronic Recycling",
    metaDescription:
      "Electronics recycling and IT asset disposal in Cypress, CA. Business pickup, data destruction. Call (949) 345-0285.",
    heroStat: "NIST",
    heroStatLabel: "800-88 Compliant",
  },
  {
    slug: "stanton",
    name: "Stanton",
    county: "Orange County",
    zip: "90680",
    tagline: "Affordable E-Waste Recycling in Stanton",
    description:
      "Stanton residents and businesses rely on OC Electronic Recycling for convenient, no-cost electronics disposal that keeps hazardous materials out of local landfills.",
    localDetail:
      "Serving Beach Boulevard businesses and all Stanton residential neighborhoods.",
    nearbyLandmark: "Rodeo 39 Public Market",
    population: "39,000+",
    businessFocus: "residential and small business",
    metaTitle: "E-Waste Recycling Stanton CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling in Stanton, CA. Free electronics disposal for qualifying items. Residential and business. Call (949) 345-0285.",
    heroStat: "Free",
    heroStatLabel: "Electronics Pickup",
  },
  {
    slug: "la-palma",
    name: "La Palma",
    county: "Orange County",
    zip: "90623",
    tagline: "E-Waste Recycling in La Palma",
    description:
      "La Palma's tight-knit residential community and business district trust OC Electronic Recycling for fast, responsible electronics disposal.",
    localDetail:
      "Serving all La Palma neighborhoods and the Walker Street business corridor.",
    nearbyLandmark: "La Palma Park",
    population: "16,000+",
    businessFocus: "residential and light commercial",
    metaTitle: "E-Waste Recycling La Palma CA | OC Electronic Recycling",
    metaDescription:
      "E-waste recycling and electronics disposal in La Palma, CA. Computer recycling, TV disposal. Call (949) 345-0285.",
    heroStat: "Same",
    heroStatLabel: "Week Pickup",
  },
];

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}
