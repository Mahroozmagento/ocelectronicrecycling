// lib/cities.ts
// ─────────────────────────────────────────────────────────────────────────────
// Service-area data for /e-waste-recycling/{city}.
//
// Rules for this file (enforced by scripts/seo-check.mjs):
//   • These are SERVICE AREAS, not branch locations — no addresses or ZIP codes.
//   • No statistics, customer counts, or statements that local businesses "trust",
//     "choose" or "rely on" us. Describe the place, not our track record there.
//   • Only verifiable local geography and business character.
//   • Pricing / pickup policy comes from lib/site.ts — never restate it here.
// ─────────────────────────────────────────────────────────────────────────────

export type Region = 'North County' | 'Central County' | 'South County' | 'Coast'

export interface CityData {
  slug: string
  name: string
  region: Region
  /** Unincorporated communities and named communities inside another city. */
  kind?: 'community'
  metaTitle: string
  metaDescription: string
  /** One or two sentences on the area's business character and geography. */
  intro: string
  /** Practical note about the kind of pickups that are typical for the area. */
  context: string
  /** Common commercial equipment scenarios for this area (not past projects). */
  scenarios: string[]
  /** Slugs of genuinely adjacent service areas. */
  nearby: string[]
  faq?: { q: string; a: string }
}

const PHONE = '(949) 287-3056'

export const cities: CityData[] = [
  {
    slug: 'anaheim',
    name: 'Anaheim',
    region: 'North County',
    metaTitle: 'E-Waste Recycling Anaheim CA',
    metaDescription: `Business electronics pickup and e-waste recycling for Anaheim hotels, venues, offices and industrial sites. 5-item pickup minimum, $39 per TV.`,
    intro: 'Anaheim is Orange County’s most populous city, with a hospitality economy centered on the Anaheim Resort and Convention Center, office and mixed-use growth in the Platinum Triangle, and a large industrial base in Anaheim Canyon.',
    context: 'Requests here often involve volume: guest-room televisions, point-of-sale hardware and back-office computers from hospitality properties, or production and warehouse equipment from industrial tenants.',
    scenarios: [
      'Hotel and venue technology refreshes, including televisions and point-of-sale terminals',
      'Warehouse and manufacturing office equipment from the Anaheim Canyon area',
      'Office relocations and build-outs around the Platinum Triangle',
    ],
    nearby: ['fullerton', 'orange', 'garden-grove', 'buena-park', 'placentia'],
    faq: {
      q: 'Is there a fee to recycle hotel or venue televisions in Anaheim?',
      a: 'Yes. Televisions carry a $39 recycling fee per unit, including bulk guest-room replacements. Tell us the approximate count and screen sizes and we will confirm the total and pickup logistics before anything is scheduled.',
    },
  },
  {
    slug: 'irvine',
    name: 'Irvine',
    region: 'Central County',
    metaTitle: 'E-Waste Recycling & ITAD Irvine CA',
    metaDescription: `IT asset disposition, data destruction and e-waste pickup for Irvine offices, labs and campuses. 5-item minimum; scope confirmed before scheduling.`,
    intro: 'Irvine is a master-planned city with major office concentrations at the Irvine Spectrum and the Irvine Business Complex near John Wayne Airport, alongside UC Irvine and the adjacent research park.',
    context: 'Technology, medical-device and life-science employers make data-bearing equipment a common part of requests from this area, so it helps to decide early whether you need sanitization, physical destruction or serialized reporting.',
    scenarios: [
      'Laptop and workstation refreshes for office and engineering teams',
      'Server-room and network-closet decommissions in multi-tenant office buildings',
      'Lab and R&D computers — instruments and specialized equipment are confirmed individually',
    ],
    nearby: ['tustin', 'costa-mesa', 'newport-beach', 'lake-forest'],
    faq: {
      q: 'Can you handle a server-room decommission for an Irvine office?',
      a: 'Server and network equipment can be included in a pickup request. Tell us what is in the racks, whether drives need sanitization or physical destruction, and any building access rules. We confirm scope, documentation and timing before scheduling.',
    },
  },
  {
    slug: 'santa-ana',
    name: 'Santa Ana',
    region: 'Central County',
    metaTitle: 'E-Waste Recycling Santa Ana CA',
    metaDescription: `E-waste recycling and business electronics pickup for Santa Ana offices, agencies and shops. 5-item pickup minimum; $39 per TV; fees confirmed first.`,
    intro: 'Santa Ana is the county seat, home to the Civic Center’s county and court offices, a dense downtown, and the South Coast Metro office district it shares with Costa Mesa.',
    context: 'Public agencies, law offices and professional firms here frequently need a record of what left the building, so documentation requirements are worth raising in the first conversation.',
    scenarios: [
      'Office computer and monitor replacements for professional and legal practices',
      'Equipment clear-outs ahead of a lease end or tenant improvement',
      'Retired desktops and printers from small businesses downtown and along Main Street',
    ],
    nearby: ['tustin', 'orange', 'garden-grove', 'costa-mesa', 'irvine'],
    faq: {
      q: 'Can documentation be provided for a Santa Ana law office or public agency?',
      a: 'Documentation depends on the service you select and the equipment processed. Options can include a pickup manifest, a serialized asset inventory, a Certificate of Recycling and a Certificate of Data Destruction. Tell us what your records policy requires and we will confirm what applies before pickup.',
    },
  },
  {
    slug: 'huntington-beach',
    name: 'Huntington Beach',
    region: 'Coast',
    metaTitle: 'E-Waste Recycling Huntington Beach',
    metaDescription: `Electronics recycling and business pickup for Huntington Beach offices, retailers and industrial tenants. 5-item minimum; $39 per TV. Call ${PHONE}.`,
    intro: 'Huntington Beach pairs a coastal visitor economy with the Beach Boulevard commercial corridor and an industrial and aerospace employment area in the north of the city.',
    context: 'Equipment here ranges from retail and hospitality hardware near the coast to engineering workstations and shop-floor computers from industrial tenants inland.',
    scenarios: [
      'Retail and restaurant point-of-sale systems and back-office PCs',
      'Engineering and manufacturing office equipment from the northern industrial area',
      'Monitors, desktops and printers from offices along Beach Boulevard',
    ],
    nearby: ['westminster', 'costa-mesa', 'newport-beach', 'garden-grove'],
  },
  {
    slug: 'garden-grove',
    name: 'Garden Grove',
    region: 'Central County',
    metaTitle: 'E-Waste Recycling Garden Grove CA',
    metaDescription: `Business e-waste pickup and electronics recycling in Garden Grove — offices, hotels and shops. 5-item pickup minimum; televisions $39 each. Call ${PHONE}.`,
    intro: 'Garden Grove sits in central Orange County, with a hotel district along Harbor Boulevard just south of the Anaheim Resort and long commercial corridors on Garden Grove Boulevard and Brookhurst Street.',
    context: 'Requests from this area tend to be mixed loads from small and mid-sized businesses, plus hospitality equipment from the Harbor Boulevard hotels.',
    scenarios: [
      'Hotel televisions and front-desk systems along Harbor Boulevard',
      'Computers and printers from medical, dental and professional offices',
      'Retail and restaurant equipment from corridor shopping centers',
    ],
    nearby: ['anaheim', 'westminster', 'santa-ana', 'stanton', 'orange'],
  },
  {
    slug: 'fullerton',
    name: 'Fullerton',
    region: 'North County',
    metaTitle: 'E-Waste Recycling Fullerton CA',
    metaDescription: `E-waste recycling and equipment pickup for Fullerton businesses, schools and manufacturers. 5 qualifying items minimum; $39 per TV; confirmed first.`,
    intro: 'Fullerton is a north Orange County education and employment center — home to Cal State Fullerton and Fullerton College, a walkable downtown, and manufacturing and distribution sites in the south and east of the city.',
    context: 'Education and manufacturing both generate large, uniform batches of equipment, which makes approximate counts by device type especially useful for planning a pickup.',
    scenarios: [
      'Classroom and department computer replacements at the end of a term',
      'Manufacturing and distribution office equipment, including label printers and terminals',
      'Downtown office and medical practice refreshes',
    ],
    nearby: ['anaheim', 'brea', 'placentia', 'buena-park', 'la-habra'],
    faq: {
      q: 'Can a school or college department in Fullerton request a pickup?',
      a: 'Yes. Schools and other organizations can request a pickup the same way as a business. The five-item minimum for qualifying major equipment applies, and we confirm acceptance, any fees and timing before scheduling.',
    },
  },
  {
    slug: 'orange',
    name: 'Orange',
    region: 'Central County',
    metaTitle: 'E-Waste Recycling Orange CA',
    metaDescription: `Electronics recycling, data destruction and business pickup in the City of Orange, from Old Towne to the medical district. 5-item minimum. Call ${PHONE}.`,
    intro: 'The City of Orange combines the historic Old Towne district and Chapman University with a major concentration of hospitals and medical offices in the south of the city.',
    context: 'Healthcare-related offices are common here, so requests often include data-bearing computers where a selected data destruction service and matching documentation matter.',
    scenarios: [
      'Medical and dental office computers — clinical devices are confirmed individually',
      'University department and administrative equipment',
      'Small-office and retail equipment around Old Towne and Tustin Street',
    ],
    nearby: ['anaheim', 'santa-ana', 'tustin', 'garden-grove'],
  },
  {
    slug: 'costa-mesa',
    name: 'Costa Mesa',
    region: 'Central County',
    metaTitle: 'E-Waste Recycling Costa Mesa CA',
    metaDescription: `E-waste recycling and IT equipment pickup for Costa Mesa offices, studios and retailers near South Coast Metro. 5-item minimum; $39 per TV. Call ${PHONE}.`,
    intro: 'Costa Mesa is anchored by South Coast Plaza, the Segerstrom Center for the Arts and the South Coast Metro office towers, with design studios and apparel companies spread across the city’s Westside.',
    context: 'Creative and retail businesses refresh displays and workstations often, so monitors and desktop computers make up a large share of typical loads.',
    scenarios: [
      'Design-studio workstations and large-format displays',
      'Retail point-of-sale and stockroom equipment',
      'Office tower tenant move-outs in South Coast Metro',
    ],
    nearby: ['newport-beach', 'santa-ana', 'irvine', 'huntington-beach'],
  },
  {
    slug: 'newport-beach',
    name: 'Newport Beach',
    region: 'Coast',
    metaTitle: 'E-Waste Recycling Newport Beach CA',
    metaDescription: `IT asset disposition, data destruction and electronics pickup for Newport Beach offices. Documentation by project scope; 5-item minimum. Call ${PHONE}.`,
    intro: 'Newport Beach’s office market is concentrated in Newport Center around Fashion Island and in the airport area, with a strong presence of financial, real-estate and legal firms.',
    context: 'Professional-services firms typically hold client records on every laptop and server, so data handling is usually the first decision — not an afterthought to recycling.',
    scenarios: [
      'Laptop and desktop refreshes for financial, legal and real-estate offices',
      'Small server and network closet retirements',
      'Conference-room displays and audio-visual equipment',
    ],
    nearby: ['costa-mesa', 'irvine', 'huntington-beach', 'laguna-beach'],
    faq: {
      q: 'Is data destruction included when a Newport Beach office recycles computers?',
      a: 'No. Data destruction is a selected service and is not automatically included with recycling. If your equipment held client or employee data, choose sanitization or physical destruction when you request pickup, and a Certificate of Data Destruction can be issued for the media processed.',
    },
  },
  {
    slug: 'mission-viejo',
    name: 'Mission Viejo',
    region: 'South County',
    metaTitle: 'E-Waste Recycling Mission Viejo CA',
    metaDescription: `Electronics recycling and business pickup for Mission Viejo offices, medical practices and schools. 5-item minimum; $39 per TV; confirmed first.`,
    intro: 'Mission Viejo is a master-planned south Orange County city whose employment centers include Saddleback College, a regional hospital campus and the retail and office areas around Crown Valley Parkway and Marguerite Parkway.',
    context: 'Most requests come from professional and medical offices with moderate quantities, where grouping equipment from several suites can make reaching the pickup minimum easier.',
    scenarios: [
      'Medical and professional office computer replacements',
      'College and school department equipment',
      'Retail and back-office hardware from shopping-center tenants',
    ],
    nearby: ['lake-forest', 'laguna-hills', 'laguna-niguel', 'rancho-santa-margarita'],
  },
  {
    slug: 'tustin',
    name: 'Tustin',
    region: 'Central County',
    metaTitle: 'E-Waste Recycling Tustin CA',
    metaDescription: `Business e-waste pickup and IT equipment recycling in Tustin, from Old Town to Tustin Legacy. 5-item minimum; fees and timing confirmed first.`,
    intro: 'Tustin stretches from historic Old Town to Tustin Legacy, the redevelopment of the former Marine Corps air station, with business parks along Red Hill Avenue bordering Irvine and Santa Ana.',
    context: 'Flex-space and business-park tenants here often combine office equipment with light-industrial hardware, so a short item list helps us confirm what qualifies.',
    scenarios: [
      'Business-park office and warehouse computer refreshes',
      'New-office build-outs and consolidations in Tustin Legacy',
      'Small-business equipment from Old Town and the retail centers',
    ],
    nearby: ['irvine', 'santa-ana', 'orange'],
  },
  {
    slug: 'lake-forest',
    name: 'Lake Forest',
    region: 'South County',
    metaTitle: 'E-Waste Recycling Lake Forest CA',
    metaDescription: `E-waste recycling, ITAD and equipment pickup for Lake Forest business parks and offices. 5 qualifying items minimum; $39 per TV. Call ${PHONE}.`,
    intro: 'Lake Forest is a south Orange County city known for its business parks along Bake Parkway and Lake Forest Drive, and it includes the Foothill Ranch and Portola Hills communities.',
    context: 'Corporate and light-manufacturing tenants mean requests frequently include servers and networking gear alongside ordinary office equipment.',
    scenarios: [
      'Corporate office laptop, desktop and monitor refreshes',
      'Engineering and light-manufacturing workstation retirements',
      'Network and server equipment from on-site IT rooms',
    ],
    nearby: ['irvine', 'mission-viejo', 'laguna-hills', 'foothill-ranch', 'el-toro'],
  },
  {
    slug: 'buena-park',
    name: 'Buena Park',
    region: 'North County',
    metaTitle: 'E-Waste Recycling Buena Park CA',
    metaDescription: `Electronics recycling and business pickup in Buena Park for entertainment, retail and distribution sites. 5-item minimum; $39 per TV. Call ${PHONE}.`,
    intro: 'Buena Park sits at the junction of Interstate 5 and State Route 91, with the Beach Boulevard entertainment corridor on one side and distribution and industrial properties on the other.',
    context: 'Distribution and logistics sites tend to retire rugged terminals, label printers and warehouse-office PCs in batches, alongside display equipment from entertainment venues.',
    scenarios: [
      'Warehouse and distribution office terminals and printers',
      'Entertainment and hospitality displays, including televisions',
      'Auto-center and retail back-office equipment',
    ],
    nearby: ['anaheim', 'fullerton', 'la-palma', 'cypress', 'la-habra'],
  },
  {
    slug: 'westminster',
    name: 'Westminster',
    region: 'Central County',
    metaTitle: 'E-Waste Recycling Westminster CA',
    metaDescription: `E-waste recycling and business electronics pickup in Westminster, including Little Saigon. 5-item pickup minimum; $39 per television. Call ${PHONE}.`,
    intro: 'Westminster is a central Orange County city best known for Little Saigon along Bolsa Avenue, with a dense mix of independent retailers, restaurants, medical offices and professional services.',
    context: 'Small businesses dominate here, and neighboring suites sometimes coordinate a single request so that together they meet the pickup minimum.',
    scenarios: [
      'Medical, dental and pharmacy office computers and printers',
      'Retail and restaurant point-of-sale systems',
      'Office equipment from professional services along Bolsa Avenue and Beach Boulevard',
    ],
    nearby: ['garden-grove', 'huntington-beach', 'stanton'],
  },
  {
    slug: 'yorba-linda',
    name: 'Yorba Linda',
    region: 'North County',
    metaTitle: 'E-Waste Recycling Yorba Linda CA',
    metaDescription: `Electronics recycling and equipment pickup for Yorba Linda offices and home-based businesses. 5-item minimum; eligibility confirmed first. Call ${PHONE}.`,
    intro: 'Yorba Linda is a largely residential city in northeast Orange County, with most commercial activity in the Savi Ranch center near State Route 91 and around the town center on Yorba Linda Boulevard.',
    context: 'Requests are usually smaller office loads, so it is worth checking the five-item minimum for qualifying major equipment before planning a pickup.',
    scenarios: [
      'Professional and medical office equipment',
      'Home-office and small-business computer replacements',
      'Retail back-office hardware from Savi Ranch tenants',
    ],
    nearby: ['placentia', 'anaheim', 'brea'],
  },
  {
    slug: 'placentia',
    name: 'Placentia',
    region: 'North County',
    metaTitle: 'E-Waste Recycling Placentia CA',
    metaDescription: `Business e-waste pickup and electronics recycling in Placentia for offices and light-industrial sites. 5-item minimum; $39 per TV. Call ${PHONE}.`,
    intro: 'Placentia lies between Fullerton and Yorba Linda in north Orange County, with light-industrial properties along Orangethorpe Avenue and a small historic core in Old Town Placentia.',
    context: 'Light-industrial tenants typically mix office computers with shop-floor terminals; unusual or specialized equipment is confirmed individually.',
    scenarios: [
      'Light-industrial office and shop-floor computers',
      'School and administrative office equipment',
      'Small-business desktops, monitors and printers',
    ],
    nearby: ['fullerton', 'yorba-linda', 'anaheim', 'brea'],
  },
  {
    slug: 'la-habra',
    name: 'La Habra',
    region: 'North County',
    metaTitle: 'E-Waste Recycling La Habra CA',
    metaDescription: `E-waste recycling and business pickup in La Habra, at the Orange County–Los Angeles County line. 5-item minimum; fees confirmed first. Call ${PHONE}.`,
    intro: 'La Habra occupies the northwest corner of Orange County on the Los Angeles County line, with commercial activity along Imperial Highway, Beach Boulevard and Whittier Boulevard.',
    context: 'Because the city borders Los Angeles County, businesses with a second site across the county line can ask about combining locations in one request.',
    scenarios: [
      'Retail and restaurant equipment from corridor shopping centers',
      'Medical and professional office computers',
      'Small manufacturing and service-business office hardware',
    ],
    nearby: ['brea', 'fullerton', 'buena-park'],
  },
  {
    slug: 'brea',
    name: 'Brea',
    region: 'North County',
    metaTitle: 'E-Waste Recycling Brea CA',
    metaDescription: `IT equipment pickup, data destruction and e-waste recycling for Brea corporate offices and retailers. 5-item minimum; scope confirmed first.`,
    intro: 'Brea is a north Orange County employment center with corporate offices along Imperial Highway and State Route 57, a regional mall and a redeveloped downtown.',
    context: 'Corporate tenants here commonly retire equipment on a refresh cycle, which suits a planned pickup with documentation agreed in advance.',
    scenarios: [
      'Corporate laptop and desktop refresh cycles',
      'Server and network equipment from office IT rooms',
      'Retail and back-office hardware from mall and downtown tenants',
    ],
    nearby: ['fullerton', 'la-habra', 'placentia', 'yorba-linda'],
  },
  {
    slug: 'aliso-viejo',
    name: 'Aliso Viejo',
    region: 'South County',
    metaTitle: 'E-Waste Recycling Aliso Viejo CA',
    metaDescription: `ITAD, data destruction and e-waste pickup for Aliso Viejo office campuses. 5-item pickup minimum; documentation by project scope. Call ${PHONE}.`,
    intro: 'Aliso Viejo is a master-planned south Orange County city with office campuses near State Route 73 that house technology, software and medical-device companies.',
    context: 'Campus tenants usually manage assets by serial number, so say so in your request if you need a serialized asset inventory as part of the project scope.',
    scenarios: [
      'Engineering laptops and workstations at the end of a lease or refresh cycle',
      'Network closets and small server rooms in office campuses',
      'Monitors and docking equipment from hybrid-office consolidations',
    ],
    nearby: ['laguna-hills', 'laguna-niguel', 'laguna-beach', 'mission-viejo'],
  },
  {
    slug: 'laguna-niguel',
    name: 'Laguna Niguel',
    region: 'South County',
    metaTitle: 'E-Waste Recycling Laguna Niguel CA',
    metaDescription: `Electronics recycling and business pickup for Laguna Niguel offices and practices along Crown Valley Parkway. 5-item minimum; $39 per TV. Call ${PHONE}.`,
    intro: 'Laguna Niguel is a south Orange County city whose offices, medical practices and retail centers are concentrated along Crown Valley Parkway.',
    context: 'Professional, financial and medical practices make up most of the business community, typically with modest equipment counts per office.',
    scenarios: [
      'Financial and professional office computers',
      'Medical and dental practice equipment — clinical devices are confirmed individually',
      'Retail and service-business back-office hardware',
    ],
    nearby: ['aliso-viejo', 'dana-point', 'mission-viejo', 'san-juan-capistrano'],
  },
  {
    slug: 'laguna-hills',
    name: 'Laguna Hills',
    region: 'South County',
    metaTitle: 'E-Waste Recycling Laguna Hills CA',
    metaDescription: `E-waste recycling and equipment pickup for Laguna Hills medical and professional offices near Interstate 5. 5-item minimum; confirmed first.`,
    intro: 'Laguna Hills sits along Interstate 5 in south Orange County, with a cluster of medical offices around its hospital campus and commercial properties along El Toro Road.',
    context: 'Medical office buildings often have shared loading areas and set delivery hours, so access details are useful when you request pickup.',
    scenarios: [
      'Medical-office computers, monitors and printers',
      'Professional-suite equipment during a lease change',
      'Retail back-office hardware along El Toro Road',
    ],
    nearby: ['lake-forest', 'mission-viejo', 'aliso-viejo', 'el-toro'],
  },
  {
    slug: 'laguna-beach',
    name: 'Laguna Beach',
    region: 'Coast',
    metaTitle: 'E-Waste Recycling Laguna Beach CA',
    metaDescription: `Electronics recycling and business pickup for Laguna Beach hotels, galleries and offices. 5-item minimum; access and fees confirmed first. Call ${PHONE}.`,
    intro: 'Laguna Beach is a coastal arts community where hotels, galleries, restaurants and small offices line Coast Highway and Laguna Canyon Road.',
    context: 'Streets are narrow and parking is limited in much of the city, so loading access and stairs are worth describing when you send a request.',
    scenarios: [
      'Hotel and resort televisions and front-desk systems',
      'Gallery, studio and small-office computers and displays',
      'Restaurant and retail point-of-sale equipment',
    ],
    nearby: ['newport-beach', 'aliso-viejo', 'dana-point', 'laguna-niguel'],
    faq: {
      q: 'What should we tell you about access for a Laguna Beach pickup?',
      a: 'Let us know about parking, stairs, elevators and any delivery-hour limits at your building. Many Laguna Beach properties have tight loading access, and knowing this in advance helps us confirm whether and when a pickup is possible.',
    },
  },
  {
    slug: 'dana-point',
    name: 'Dana Point',
    region: 'Coast',
    metaTitle: 'E-Waste Recycling Dana Point CA',
    metaDescription: `E-waste recycling and business electronics pickup for Dana Point resorts, harbor businesses and offices. 5-item minimum; $39 per TV. Call ${PHONE}.`,
    intro: 'Dana Point is a south Orange County harbor city with resort hotels, marine businesses around the harbor and a growing downtown in the Lantern District.',
    context: 'Hospitality properties here can generate large television and guest-technology replacements, while most other businesses have small office loads.',
    scenarios: [
      'Resort and hotel guest-room televisions and property systems',
      'Marine and harbor business office equipment',
      'Small-office and retail hardware in the Lantern District',
    ],
    nearby: ['san-juan-capistrano', 'san-clemente', 'laguna-niguel', 'laguna-beach'],
  },
  {
    slug: 'san-clemente',
    name: 'San Clemente',
    region: 'Coast',
    metaTitle: 'E-Waste Recycling San Clemente CA',
    metaDescription: `Electronics recycling and equipment pickup for San Clemente businesses, from Avenida Del Mar to the business parks. 5-item minimum. Call ${PHONE}.`,
    intro: 'San Clemente is Orange County’s southernmost city, with a downtown along Avenida Del Mar and business parks inland that house manufacturers, medical-device firms and action-sports companies.',
    context: 'As the far end of the county, pickup timing here depends on routing, which is one reason availability is always confirmed before scheduling.',
    scenarios: [
      'Business-park office and light-manufacturing computers',
      'Medical and professional office equipment',
      'Retail and hospitality hardware downtown',
    ],
    nearby: ['dana-point', 'san-juan-capistrano'],
  },
  {
    slug: 'san-juan-capistrano',
    name: 'San Juan Capistrano',
    region: 'South County',
    metaTitle: 'E-Waste Recycling San Juan Capistrano',
    metaDescription: `Business e-waste pickup and electronics recycling in San Juan Capistrano. 5 qualifying items minimum; $39 per TV; confirmed before scheduling.`,
    intro: 'San Juan Capistrano centers on its historic mission and downtown, with offices, auto dealerships and service businesses along the Interstate 5 corridor.',
    context: 'Businesses here are mostly small and mid-sized, so mixed loads of computers, monitors and printers are typical.',
    scenarios: [
      'Dealership and service-center office equipment',
      'Professional and medical office computers',
      'School and nonprofit administrative equipment',
    ],
    nearby: ['dana-point', 'san-clemente', 'laguna-niguel', 'mission-viejo', 'ladera-ranch'],
  },
  {
    slug: 'rancho-santa-margarita',
    name: 'Rancho Santa Margarita',
    region: 'South County',
    metaTitle: 'E-Waste Recycling Rancho Santa Margarita',
    metaDescription: `Electronics recycling and business pickup for Rancho Santa Margarita offices and business-park tenants. 5-item minimum; confirmed first. Call ${PHONE}.`,
    intro: 'Rancho Santa Margarita is a master-planned city in the foothills of south Orange County, with a business park and town-center retail serving the surrounding communities.',
    context: 'Light-manufacturing and office tenants in the business park account for most equipment, usually in planned refresh batches.',
    scenarios: [
      'Business-park office and light-manufacturing computers',
      'Professional and medical office refreshes',
      'Retail back-office equipment near the town center',
    ],
    nearby: ['mission-viejo', 'coto-de-caza', 'trabuco-canyon', 'lake-forest'],
  },
  {
    slug: 'coto-de-caza',
    name: 'Coto de Caza',
    region: 'South County',
    kind: 'community',
    metaTitle: 'E-Waste Recycling Coto de Caza CA',
    metaDescription: `Electronics recycling and pickup requests for Coto de Caza home offices and businesses. 5-item minimum; gate access and fees confirmed first.`,
    intro: 'Coto de Caza is a gated, unincorporated residential community in the foothills of south Orange County, where most business activity is home-office based.',
    context: 'Because the community is gated, pickup requests need gate-access arrangements in addition to the usual eligibility confirmation.',
    scenarios: [
      'Home-office computers, monitors and printers',
      'Equipment from a business being wound down or relocated',
      'Estate and household clear-outs with several qualifying items',
    ],
    nearby: ['rancho-santa-margarita', 'ladera-ranch', 'trabuco-canyon'],
    faq: {
      q: 'Coto de Caza is gated — how does pickup access work?',
      a: 'If your request is confirmed, you arrange guest access with the gate for the agreed pickup window. Mention the gate you use and any community delivery rules when you send the request so we can confirm timing.',
    },
  },
  {
    slug: 'ladera-ranch',
    name: 'Ladera Ranch',
    region: 'South County',
    kind: 'community',
    metaTitle: 'E-Waste Recycling Ladera Ranch CA',
    metaDescription: `Electronics recycling and pickup requests for Ladera Ranch home offices and village-center businesses. 5-item minimum; confirmed first. Call ${PHONE}.`,
    intro: 'Ladera Ranch is an unincorporated master-planned community in south Orange County, with village retail centers and a large share of home-based businesses.',
    context: 'Home offices rarely have many major items at once, so it helps to count qualifying equipment against the five-item minimum before requesting pickup.',
    scenarios: [
      'Home-office laptops, desktops and monitors',
      'Small-business equipment from village-center tenants',
      'School and community-organization computers',
    ],
    nearby: ['mission-viejo', 'san-juan-capistrano', 'rancho-santa-margarita', 'coto-de-caza'],
  },
  {
    slug: 'foothill-ranch',
    name: 'Foothill Ranch',
    region: 'South County',
    kind: 'community',
    metaTitle: 'E-Waste Recycling Foothill Ranch',
    metaDescription: `IT equipment pickup and e-waste recycling for Foothill Ranch corporate and industrial tenants. 5-item minimum; scope confirmed first. Call ${PHONE}.`,
    intro: 'Foothill Ranch is a master-planned community within the City of Lake Forest, combining corporate campuses and industrial buildings with the Foothill Ranch Towne Centre.',
    context: 'Corporate and industrial tenants make this one of the more equipment-heavy parts of south county, often with servers and networking gear in the mix.',
    scenarios: [
      'Corporate headquarters laptop and workstation refreshes',
      'Industrial and distribution office terminals',
      'Server and network equipment from on-site IT rooms',
    ],
    nearby: ['lake-forest', 'rancho-santa-margarita', 'irvine', 'el-toro'],
    faq: {
      q: 'Is Foothill Ranch covered separately from Lake Forest?',
      a: 'Foothill Ranch is part of the City of Lake Forest, and both are in the same Orange County service area. Requests are handled the same way: tell us what you have and where, and we confirm eligibility and timing.',
    },
  },
  {
    slug: 'el-toro',
    name: 'El Toro',
    region: 'South County',
    kind: 'community',
    metaTitle: 'E-Waste Recycling El Toro CA',
    metaDescription: `Electronics recycling and business pickup for the El Toro area of Lake Forest, along El Toro Road. 5-item minimum; $39 per TV. Call ${PHONE}.`,
    intro: 'El Toro is the historic name of the community that incorporated as the City of Lake Forest in 1991; the name lives on along El Toro Road and in the surrounding neighborhoods.',
    context: 'Businesses along El Toro Road are mostly retail, medical and professional offices with small to mid-sized equipment loads.',
    scenarios: [
      'Medical and professional office computers',
      'Retail and restaurant point-of-sale equipment',
      'Small-business desktops, monitors and printers',
    ],
    nearby: ['lake-forest', 'laguna-hills', 'mission-viejo', 'foothill-ranch'],
    faq: {
      q: 'Is El Toro the same service area as Lake Forest?',
      a: 'Yes. El Toro is the former name of the community that became the City of Lake Forest, so addresses in the El Toro area are served the same way as the rest of Lake Forest.',
    },
  },
  {
    slug: 'trabuco-canyon',
    name: 'Trabuco Canyon',
    region: 'South County',
    kind: 'community',
    metaTitle: 'E-Waste Recycling Trabuco Canyon',
    metaDescription: `Electronics recycling and pickup requests for Trabuco Canyon home offices and businesses. 5-item minimum; access and timing confirmed first.`,
    intro: 'Trabuco Canyon is an unincorporated community in the Santa Ana Mountains foothills of south Orange County, with rural roads and a small number of home-based and local businesses.',
    context: 'Canyon roads and driveways can limit vehicle access, so describing the route and parking at your property helps us confirm whether a pickup is practical.',
    scenarios: [
      'Home-office computers and monitors',
      'Small-business and ranch office equipment',
      'Household clear-outs with several qualifying items',
    ],
    nearby: ['rancho-santa-margarita', 'coto-de-caza', 'foothill-ranch'],
  },
  {
    slug: 'cypress',
    name: 'Cypress',
    region: 'North County',
    metaTitle: 'E-Waste Recycling Cypress CA',
    metaDescription: `IT equipment pickup and e-waste recycling for Cypress business parks, offices and schools. 5-item minimum; fees confirmed before scheduling.`,
    intro: 'Cypress is a northwest Orange County city with a large business-park district along Katella Avenue that houses corporate offices, and it is home to Cypress College.',
    context: 'Corporate tenants in the business parks typically retire equipment in planned batches, which fits well with a scheduled pickup and agreed documentation.',
    scenarios: [
      'Corporate office laptop, desktop and monitor refreshes',
      'College and school department equipment',
      'Server and networking gear from office IT rooms',
    ],
    nearby: ['la-palma', 'buena-park', 'stanton', 'garden-grove'],
  },
  {
    slug: 'stanton',
    name: 'Stanton',
    region: 'North County',
    metaTitle: 'E-Waste Recycling Stanton CA',
    metaDescription: `Business e-waste pickup and electronics recycling in Stanton along Beach Boulevard. 5 qualifying items minimum; $39 per television. Call ${PHONE}.`,
    intro: 'Stanton is a small city along Beach Boulevard between Anaheim and Garden Grove, with retail centers on the boulevard and pockets of light-industrial property.',
    context: 'Most businesses are small, so requests are usually mixed loads of office computers, printers and point-of-sale hardware.',
    scenarios: [
      'Retail and restaurant point-of-sale equipment',
      'Light-industrial office computers and printers',
      'Small professional-office refreshes',
    ],
    nearby: ['garden-grove', 'anaheim', 'westminster', 'cypress', 'buena-park'],
  },
  {
    slug: 'la-palma',
    name: 'La Palma',
    region: 'North County',
    metaTitle: 'E-Waste Recycling La Palma CA',
    metaDescription: `Electronics recycling and business pickup in La Palma, near State Route 91 and the Los Angeles County line. 5-item minimum. Call ${PHONE}.`,
    intro: 'La Palma is one of Orange County’s smallest cities, in the northwest corner beside the Los Angeles County line, with a business district near State Route 91.',
    context: 'Its position on the county line makes it a convenient reference point for businesses that also operate in neighboring Los Angeles County communities.',
    scenarios: [
      'Corporate and medical office computers',
      'Light-industrial and distribution office equipment',
      'Small-business desktops, monitors and printers',
    ],
    nearby: ['cypress', 'buena-park'],
  },
]

export const REGIONS: Region[] = ['North County', 'Central County', 'South County', 'Coast']

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug)
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug)
}

export function citiesByRegion(region: Region): CityData[] {
  return cities.filter((c) => c.region === region).sort((a, b) => a.name.localeCompare(b.name))
}
