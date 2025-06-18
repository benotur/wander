// --- Firebase Config ---
const firebaseConfig = {
  apiKey: "AIzaSyAkXUjBLxXjxJsD5CMskdnw7IRP7dt2Fwo",
  authDomain: "wander-33d77.firebaseapp.com",
  databaseURL: "https://wander-33d77-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wander-33d77",
  storageBucket: "wander-33d77.appspot.com",
  messagingSenderId: "675999665700",
  appId: "1:675999665700:web:c5235fac3fcc47097d12b1",
  measurementId: "G-0L1CWL46KQ",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let visitedA3Codes = [];
let wishA3Codes = [];
let livedA3Codes = [];
let lookupMap = {};
let currentUser = null;
let mapLoaded = false;
let expandedContinentIndex = 0;
let currentCategory = "visited"; // Default tab

let activeFilters = {
  visited: true,
  wish: true,
  lived: true
};

// --- ISO A2 to A3 mapping for official countries ---
const isoA2toA3 = {
  AF: "AFG", AL: "ALB", DZ: "DZA", AD: "AND", AO: "AGO", AG: "ATG", AR: "ARG", AM: "ARM", AU: "AUS", AT: "AUT",
  AZ: "AZE", BS: "BHS", BH: "BHR", BD: "BGD", BB: "BRB", BY: "BLR", BE: "BEL", BZ: "BLZ", BJ: "BEN", BT: "BTN",
  BO: "BOL", BA: "BIH", BW: "BWA", BR: "BRA", BN: "BRN", BG: "BGR", BF: "BFA", BI: "BDI", KH: "KHM", CM: "CMR",
  CA: "CAN", CV: "CPV", CF: "CAF", TD: "TCD", CL: "CHL", CN: "CHN", CO: "COL", KM: "COM", CG: "COG", CD: "COD",
  CR: "CRI", CI: "CIV", HR: "HRV", CU: "CUB", CY: "CYP", CZ: "CZE", DK: "DNK", DJ: "DJI", DM: "DMA", DO: "DOM",
  EC: "ECU", EG: "EGY", SV: "SLV", GQ: "GNQ", ER: "ERI", EE: "EST", SZ: "SWZ", ET: "ETH", FJ: "FJI", FI: "FIN",
  FR: "FRA", GA: "GAB", GM: "GMB", GE: "GEO", DE: "DEU", GH: "GHA", GR: "GRC", GD: "GRD", GT: "GTM", GN: "GIN",
  GW: "GNB", GY: "GUY", HT: "HTI", HN: "HND", HU: "HUN", IS: "ISL", IN: "IND", ID: "IDN", IR: "IRN", IQ: "IRQ",
  IE: "IRL", IL: "ISR", IT: "ITA", JM: "JAM", JP: "JPN", JO: "JOR", KZ: "KAZ", KE: "KEN", KI: "KIR", KP: "PRK",
  KR: "KOR", KW: "KWT", KG: "KGZ", LA: "LAO", LV: "LVA", LB: "LBN", LS: "LSO", LR: "LBR", LY: "LBY", LI: "LIE",
  LT: "LTU", LU: "LUX", MG: "MDG", MW: "MWI", MY: "MYS", MV: "MDV", ML: "MLI", MT: "MLT", MH: "MHL", MR: "MRT",
  MU: "MUS", MX: "MEX", FM: "FSM", MD: "MDA", MC: "MCO", MN: "MNG", ME: "MNE", MA: "MAR", MZ: "MOZ", MM: "MMR",
  NA: "NAM", NR: "NRU", NP: "NPL", NL: "NLD", NZ: "NZL", NI: "NIC", NE: "NER", NG: "NGA", MK: "MKD", NO: "NOR",
  OM: "OMN", PK: "PAK", PW: "PLW", PS: "PSE", PA: "PAN", PG: "PNG", PY: "PRY", PE: "PER", PH: "PHL", PL: "POL",
  PT: "PRT", QA: "QAT", RO: "ROU", RU: "RUS", RW: "RWA", KN: "KNA", LC: "LCA", VC: "VCT", WS: "WSM", SM: "SMR",
  ST: "STP", SA: "SAU", SN: "SEN", RS: "SRB", SC: "SYC", SL: "SLE", SG: "SGP", SK: "SVK", SI: "SVN", SB: "SLB",
  SO: "SOM", ZA: "ZAF", ES: "ESP", LK: "LKA", SD: "SDN", SR: "SUR", SE: "SWE", CH: "CHE", SY: "SYR", TW: "TWN",
  TJ: "TJK", TZ: "TZA", TH: "THA", TL: "TLS", TG: "TGO", TO: "TON", TT: "TTO", TN: "TUN", TR: "TUR", TM: "TKM",
  TV: "TUV", UG: "UGA", UA: "UKR", AE: "ARE", GB: "GBR", US: "USA", UY: "URY", UZ: "UZB", VU: "VUT", VA: "VAT",
  VE: "VEN", VN: "VNM", YE: "YEM", ZM: "ZMB", ZW: "ZWE", PR: "PRI", XK: "XKX", GL: "GRL", EH: "ESH", SS: "SSD",
  FK: "FLK", NC: "NCL", TF: "ATF"
};

const countryCapitals = {
  DZ: [3.0588, 36.7538], // Algiers
  AO: [13.2344, -8.8383], // Luanda
  BJ: [2.6326, 6.3703], // Porto-Novo
  BW: [25.9201, -24.6545], // Gaborone
  BF: [-1.5197, 12.3714], // Ouagadougou
  BI: [29.9189, -3.3822], // Gitega
  CM: [11.5183, 3.848], // Yaoundé
  CV: [-23.5087, 14.9331], // Praia
  CF: [18.5821, 4.3947], // Bangui
  TD: [15.0444, 12.1131], // N'Djamena
  KM: [43.2567, -11.6986], // Moroni
  CD: [15.2663, -4.4419], // Kinshasa
  CG: [15.2667, -4.2634], // Brazzaville
  CI: [-4.0127, 5.3599], // Yamoussoukro
  DJ: [43.1456, 11.589], // Djibouti
  EG: [31.2357, 30.0444], // Cairo
  GQ: [8.7832, 3.7521], // Malabo
  ER: [38.9318, 15.3229], // Asmara
  SZ: [31.1333, -26.3054], // Mbabane
  ET: [38.7469, 9.03], // Addis Ababa
  GA: [9.4544, 0.3901], // Libreville
  GM: [-16.5917, 13.4549], // Banjul
  GH: [-0.186964, 5.6037], // Accra
  GN: [-13.682, 9.6412], // Conakry
  GW: [-15.5989, 11.8817], // Bissau
  KE: [36.8219, -1.2921], // Nairobi
  LS: [27.4833, -29.3167], // Maseru
  LR: [-10.7969, 6.3005], // Monrovia
  LY: [13.1913, 32.8872], // Tripoli
  MG: [47.5079, -18.8792], // Antananarivo
  MW: [33.7741, -13.9626], // Lilongwe
  ML: [-8.0029, 12.6392], // Bamako
  MR: [-15.9806, 18.0735], // Nouakchott
  MU: [57.4989, -20.1609], // Port Louis
  MA: [-6.8498, 33.9716], // Rabat
  MZ: [32.5732, -25.9692], // Maputo
  NA: [17.0832, -22.5597], // Windhoek
  NE: [2.1157, 13.5128], // Niamey
  NG: [7.4951, 9.0579], // Abuja
  RW: [30.0619, -1.9441], // Kigali
  ST: [6.7281, 0.3365], // São Tomé
  SN: [-17.4677, 14.6928], // Dakar
  SC: [55.4507, -4.6191], // Victoria
  SL: [-13.2317, 8.4657], // Freetown
  SO: [45.3182, 2.0469], // Mogadishu
  ZA: [28.2184, -25.7461], // Pretoria (executive)
  SS: [31.582, 4.8594], // Juba
  SD: [32.5599, 15.5007], // Khartoum
  TZ: [39.2083, -6.7924], // Dodoma
  TG: [1.2074, 6.1319], // Lomé
  TN: [10.1658, 36.8188], // Tunis
  UG: [32.5825, 0.3476], // Kampala
  EH: [-13.1711, 27.1536], // Laayoune (disputed)
  ZM: [28.3228, -15.3875], // Lusaka
  ZW: [31.053, -17.8292], // Harare

  AF: [69.2075, 34.5553], // Kabul
  AM: [44.509, 40.1792], // Yerevan
  AZ: [49.8671, 40.4093], // Baku
  BH: [50.5832, 26.2235], // Manama
  BD: [90.4125, 23.8103], // Dhaka
  BT: [89.639, 27.4728], // Thimphu
  BN: [114.9398, 4.9031], // Bandar Seri Begawan
  KH: [104.916, 11.5564], // Phnom Penh
  CN: [116.4074, 39.9042], // Beijing
  GE: [44.793, 41.7151], // Tbilisi
  IN: [77.209, 28.6139], // New Delhi
  ID: [106.8456, -6.2088], // Jakarta
  IR: [51.389, 35.6892], // Tehran
  IQ: [44.3661, 33.3152], // Baghdad
  IL: [35.2137, 31.7683], // Jerusalem
  JP: [139.6917, 35.6895], // Tokyo
  JO: [35.9106, 31.9516], // Amman
  KZ: [71.4278, 51.1694], // Astana (Nur-Sultan)
  KW: [47.9774, 29.3759], // Kuwait City
  KG: [74.6059, 42.8746], // Bishkek
  LA: [102.6341, 17.9757], // Vientiane
  LB: [35.5018, 33.8938], // Beirut
  MY: [101.6869, 3.139], // Kuala Lumpur
  MV: [73.5093, 4.1755], // Malé
  MN: [106.9057, 47.8864], // Ulaanbaatar
  MM: [96.1951, 19.7633], // Naypyidaw
  NP: [85.324, 27.7172], // Kathmandu
  KP: [125.7625, 39.0392], // Pyongyang
  OM: [58.3829, 23.5859], // Muscat
  PK: [73.0479, 33.6844], // Islamabad
  PS: [35.2137, 31.7683], // East Jerusalem (de facto)
  PH: [120.9842, 14.5995], // Manila
  QA: [51.531, 25.2854], // Doha
  SA: [46.6753, 24.7136], // Riyadh
  SG: [103.8198, 1.3521], // Singapore
  KR: [126.978, 37.5665], // Seoul
  LK: [79.8612, 6.9271], // Colombo (commercial)
  SY: [36.2765, 33.5138], // Damascus
  TW: [121.5654, 25.033], // Taipei
  TJ: [68.7739, 38.5598], // Dushanbe
  TH: [100.5018, 13.7563], // Bangkok
  TL: [125.5603, -8.5569], // Dili
  TR: [32.8597, 39.9334], // Ankara
  TM: [58.3833, 37.95], // Ashgabat
  AE: [54.3773, 24.4539], // Abu Dhabi
  UZ: [69.2163, 41.2995], // Tashkent
  VN: [105.8542, 21.0285], // Hanoi
  YE: [44.191, 15.3694], // Sana'a

  AL: [19.8187, 41.3275], // Tirana
  AD: [1.5218, 42.5063], // Andorra la Vella
  AT: [16.3738, 48.2082], // Vienna
  BY: [27.5619, 53.9045], // Minsk
  BE: [4.3517, 50.8503], // Brussels
  BA: [18.4131, 43.8563], // Sarajevo
  BG: [23.3219, 42.6977], // Sofia
  HR: [15.9819, 45.815], // Zagreb
  CY: [33.3823, 35.1856], // Nicosia
  CZ: [14.4208, 50.088], // Prague
  DK: [12.5683, 55.6761], // Copenhagen
  EE: [24.7536, 59.437], // Tallinn
  FI: [24.9384, 60.1699], // Helsinki
  FR: [2.3522, 48.8566], // Paris
  DE: [13.405, 52.52], // Berlin
  GR: [23.7275, 37.9838], // Athens
  HU: [19.0402, 47.4979], // Budapest
  IS: [-21.8174, 64.1265], // Reykjavik
  IE: [-6.2603, 53.3498], // Dublin
  IT: [12.4964, 41.9028], // Rome
  XK: [21.1662, 42.6629], // Pristina
  LV: [24.1052, 56.9496], // Riga
  LI: [9.5215, 47.141], // Vaduz
  LT: [25.2797, 54.6872], // Vilnius
  LU: [6.1319, 49.6116], // Luxembourg
  MT: [14.5146, 35.8989], // Valletta
  MD: [28.8575, 47.0105], // Chisinau
  MC: [7.4246, 43.7384], // Monaco
  ME: [19.2594, 42.4304], // Podgorica
  NL: [4.9041, 52.3676], // Amsterdam
  MK: [21.4314, 41.9973], // Skopje
  NO: [10.7522, 59.9139], // Oslo
  PL: [21.0122, 52.2297], // Warsaw
  PT: [-9.1427, 38.7223], // Lisbon
  RO: [26.1025, 44.4268], // Bucharest
  RU: [37.6173, 55.7558], // Moscow
  SM: [12.4578, 43.9424], // San Marino
  RS: [20.4489, 44.7866], // Belgrade
  SK: [17.1077, 48.1486], // Bratislava
  SI: [14.5058, 46.0569], // Ljubljana
  ES: [-3.7038, 40.4168], // Madrid
  SE: [18.0686, 59.3293], // Stockholm
  CH: [7.4474, 46.948], // Bern
  UA: [30.5234, 50.4501], // Kyiv
  GB: [-0.1276, 51.5074], // London
  VA: [12.4534, 41.9029], // Vatican City

  AG: [-61.8456, 17.1175], // St. John's
  BS: [-77.3963, 25.0343], // Nassau
  BB: [-59.6167, 13.0975], // Bridgetown
  BZ: [-88.1976, 17.5046], // Belmopan
  CA: [-75.6972, 45.4215], // Ottawa
  CR: [-84.0907, 9.9281], // San José
  CU: [-82.3666, 23.1136], // Havana
  DM: [-61.3881, 15.3014], // Roseau
  DO: [-69.9312, 18.4861], // Santo Domingo
  SV: [-89.2182, 13.6929], // San Salvador
  GD: [-61.7486, 12.0561], // St. George's
  GT: [-90.5133, 14.6349], // Guatemala City
  HT: [-72.3349, 18.5944], // Port-au-Prince
  HN: [-87.2169, 14.0723], // Tegucigalpa
  JM: [-76.792, 18.1096], // Kingston
  MX: [-99.1332, 19.4326], // Mexico City
  NI: [-86.2514, 12.1364], // Managua
  PA: [-79.5199, 8.9824], // Panama City
  KN: [-62.7287, 17.3026], // Basseterre
  LC: [-60.9875, 14.0101], // Castries
  VC: [-61.2248, 13.1600], // Kingstown
  TT: [-61.5122, 10.6549], // Port of Spain
  US: [-77.0369, 38.9072], // Washington DC
  PR: [-66.1057, 18.4655], // San Juan

  AU: [149.1300, -35.2809], // Canberra
  FJ: [178.4501, -18.1248], // Suva
  KI: [173.0006, 1.3291], // Tarawa
  MH: [171.3803, 7.0897], // Majuro
  FM: [158.1499, 6.9248], // Palikir
  NR: [166.9315, -0.5477], // Yaren (de facto)
  NZ: [174.7762, -41.2865], // Wellington
  PW: [134.5825, 7.5004], // Ngerulmud
  PG: [147.1803, -9.478], // Port Moresby
  WS: [-171.7514, -13.8333], // Apia
  SB: [159.9729, -9.4456], // Honiara
  TO: [-175.1982, -21.1393], // Nukuʻalofa
  TV: [179.194, -8.5243], // Funafuti
  VU: [168.3273, -17.7333], // Port Vila
  NC: [166.4572, -22.2558], // Nouméa

  AR: [-58.4173, -34.6118], // Buenos Aires
  BO: [-68.1193, -16.5000], // La Paz (administrative)
  BR: [-47.9292, -15.7801], // Brasília
  CL: [-70.6483, -33.4569], // Santiago
  CO: [-74.0721, 4.7110], // Bogotá
  EC: [-78.4678, -0.1807], // Quito
  GY: [-58.1551, 6.8013], // Georgetown
  PY: [-57.5759, -25.2637], // Asunción
  PE: [-77.0428, -12.0464], // Lima
  SR: [-55.2038, 5.852], // Paramaribo
  UY: [-56.1645, -34.9011], // Montevideo
  VE: [-66.9036, 10.4806], // Caracas
  FK: [-57.85, -51.7], // Stanley

  AQ: [0, -75.25], // No official capital, use South Pole area
  GL: [-51.7216, 64.1835], // Nuuk
  TF: [70.2167, -49.35], // Port-aux-Français
};

function toA3(code) {
  return isoA2toA3[code] || code;
}

// --- Continents array goes here (unchanged) ---
const continents = [
  {
    name: "Africa",
    countries: [
      { code: "DZ", name: "Algeria" },
      { code: "AO", name: "Angola" },
      { code: "BJ", name: "Benin" },
      { code: "BW", name: "Botswana" },
      { code: "BF", name: "Burkina Faso" },
      { code: "BI", name: "Burundi" },
      { code: "CM", name: "Cameroon" },
      { code: "CV", name: "Cape Verde" },
      { code: "CF", name: "Central African Republic" },
      { code: "TD", name: "Chad" },
      { code: "KM", name: "Comoros" },
      { code: "CD", name: "Congo (Democratic Republic)" },
      { code: "CG", name: "Congo" },
      { code: "CI", name: "Côte d'Ivoire" },
      { code: "DJ", name: "Djibouti" },
      { code: "EG", name: "Egypt" },
      { code: "GQ", name: "Equatorial Guinea" },
      { code: "ER", name: "Eritrea" },
      { code: "SZ", name: "Eswatini" },
      { code: "ET", name: "Ethiopia" },
      { code: "GA", name: "Gabon" },
      { code: "GM", name: "Gambia" },
      { code: "GH", name: "Ghana" },
      { code: "GN", name: "Guinea" },
      { code: "GW", name: "Guinea-Bissau" },
      { code: "KE", name: "Kenya" },
      { code: "LS", name: "Lesotho" },
      { code: "LR", name: "Liberia" },
      { code: "LY", name: "Libya" },
      { code: "MG", name: "Madagascar" },
      { code: "MW", name: "Malawi" },
      { code: "ML", name: "Mali" },
      { code: "MR", name: "Mauritania" },
      { code: "MU", name: "Mauritius" },
      { code: "MA", name: "Morocco" },
      { code: "MZ", name: "Mozambique" },
      { code: "NA", name: "Namibia" },
      { code: "NE", name: "Niger" },
      { code: "NG", name: "Nigeria" },
      { code: "RW", name: "Rwanda" },
      { code: "ST", name: "Sao Tome and Principe" },
      { code: "SN", name: "Senegal" },
      { code: "SC", name: "Seychelles" },
      { code: "SL", name: "Sierra Leone" },
      { code: "SO", name: "Somalia" },
      { code: "SX", name: "Somaliland" },
      { code: "ZA", name: "South Africa" },
      { code: "SS", name: "South Sudan" },
      { code: "SD", name: "Sudan" },
      { code: "TZ", name: "Tanzania" },
      { code: "TG", name: "Togo" },
      { code: "TN", name: "Tunisia" },
      { code: "UG", name: "Uganda" },
      { code: "EH", name: "Western Sahara" },
      { code: "ZM", name: "Zambia" },
      { code: "ZW", name: "Zimbabwe" }
    ]
  },
  {
    name: "Asia",
    countries: [
      { code: "AF", name: "Afghanistan" },
      { code: "AM", name: "Armenia" },
      { code: "AZ", name: "Azerbaijan" },
      { code: "BH", name: "Bahrain" },
      { code: "BD", name: "Bangladesh" },
      { code: "BT", name: "Bhutan" },
      { code: "BN", name: "Brunei" },
      { code: "KH", name: "Cambodia" },
      { code: "CN", name: "China" },
      { code: "GE", name: "Georgia" },
      { code: "IN", name: "India" },
      { code: "ID", name: "Indonesia" },
      { code: "IR", name: "Iran" },
      { code: "IQ", name: "Iraq" },
      { code: "IL", name: "Israel" },
      { code: "JP", name: "Japan" },
      { code: "JO", name: "Jordan" },
      { code: "KZ", name: "Kazakhstan" },
      { code: "KW", name: "Kuwait" },
      { code: "KG", name: "Kyrgyzstan" },
      { code: "LA", name: "Laos" },
      { code: "LB", name: "Lebanon" },
      { code: "MY", name: "Malaysia" },
      { code: "MV", name: "Maldives" },
      { code: "MN", name: "Mongolia" },
      { code: "MM", name: "Myanmar" },
      { code: "NP", name: "Nepal" },
      { code: "KP", name: "North Korea" },
      { code: "OM", name: "Oman" },
      { code: "PK", name: "Pakistan" },
      { code: "PS", name: "Palestine" },
      { code: "PH", name: "Philippines" },
      { code: "QA", name: "Qatar" },
      { code: "SA", name: "Saudi Arabia" },
      { code: "SG", name: "Singapore" },
      { code: "KR", name: "South Korea" },
      { code: "LK", name: "Sri Lanka" },
      { code: "SY", name: "Syria" },
      { code: "TW", name: "Taiwan" },
      { code: "TJ", name: "Tajikistan" },
      { code: "TH", name: "Thailand" },
      { code: "TL", name: "Timor-Leste" },
      { code: "TR", name: "Turkey" },
      { code: "TM", name: "Turkmenistan" },
      { code: "AE", name: "United Arab Emirates" },
      { code: "UZ", name: "Uzbekistan" },
      { code: "VN", name: "Vietnam" },
      { code: "YE", name: "Yemen" }
    ]
  },
  {
    name: "Europe",
    countries: [
      { code: "AL", name: "Albania" },
      { code: "AD", name: "Andorra" },
      { code: "AT", name: "Austria" },
      { code: "BY", name: "Belarus" },
      { code: "BE", name: "Belgium" },
      { code: "BA", name: "Bosnia and Herzegovina" },
      { code: "BG", name: "Bulgaria" },
      { code: "HR", name: "Croatia" },
      { code: "CY", name: "Cyprus" },
      { code: "CZ", name: "Czechia" },
      { code: "DK", name: "Denmark" },
      { code: "EE", name: "Estonia" },
      { code: "FI", name: "Finland" },
      { code: "FR", name: "France" },
      { code: "DE", name: "Germany" },
      { code: "GR", name: "Greece" },
      { code: "HU", name: "Hungary" },
      { code: "IS", name: "Iceland" },
      { code: "IE", name: "Ireland" },
      { code: "IT", name: "Italy" },
      { code: "XK", name: "Kosovo" },
      { code: "LV", name: "Latvia" },
      { code: "LI", name: "Liechtenstein" },
      { code: "LT", name: "Lithuania" },
      { code: "LU", name: "Luxembourg" },
      { code: "MT", name: "Malta" },
      { code: "MD", name: "Moldova" },
      { code: "MC", name: "Monaco" },
      { code: "ME", name: "Montenegro" },
      { code: "NL", name: "Netherlands" },
      { code: "MK", name: "North Macedonia" },
      { code: "NO", name: "Norway" },
      { code: "PL", name: "Poland" },
      { code: "PT", name: "Portugal" },
      { code: "RO", name: "Romania" },
      { code: "RU", name: "Russia" },
      { code: "SM", name: "San Marino" },
      { code: "RS", name: "Serbia" },
      { code: "SK", name: "Slovakia" },
      { code: "SI", name: "Slovenia" },
      { code: "ES", name: "Spain" },
      { code: "SE", name: "Sweden" },
      { code: "CH", name: "Switzerland" },
      { code: "UA", name: "Ukraine" },
      { code: "GB", name: "United Kingdom" },
      { code: "VA", name: "Vatican City" },
      { code: "CX", name: "Northern Cyprus" }
    ]
  },
  {
    name: "North America",
    countries: [
      { code: "AG", name: "Antigua and Barbuda" },
      { code: "BS", name: "Bahamas" },
      { code: "BB", name: "Barbados" },
      { code: "BZ", name: "Belize" },
      { code: "CA", name: "Canada" },
      { code: "CR", name: "Costa Rica" },
      { code: "CU", name: "Cuba" },
      { code: "DM", name: "Dominica" },
      { code: "DO", name: "Dominican Republic" },
      { code: "SV", name: "El Salvador" },
      { code: "GD", name: "Grenada" },
      { code: "GT", name: "Guatemala" },
      { code: "HT", name: "Haiti" },
      { code: "HN", name: "Honduras" },
      { code: "JM", name: "Jamaica" },
      { code: "MX", name: "Mexico" },
      { code: "NI", name: "Nicaragua" },
      { code: "PA", name: "Panama" },
      { code: "KN", name: "Saint Kitts and Nevis" },
      { code: "LC", name: "Saint Lucia" },
      { code: "VC", name: "Saint Vincent and the Grenadines" },
      { code: "TT", name: "Trinidad and Tobago" },
      { code: "US", name: "United States" },
      { code: "PR", name: "Puerto Rico" }
    ]
  },
  {
    name: "Oceania",
    countries: [
      { code: "AU", name: "Australia" },
      { code: "FJ", name: "Fiji" },
      { code: "KI", name: "Kiribati" },
      { code: "MH", name: "Marshall Islands" },
      { code: "FM", name: "Micronesia" },
      { code: "NR", name: "Nauru" },
      { code: "NZ", name: "New Zealand" },
      { code: "PW", name: "Palau" },
      { code: "PG", name: "Papua New Guinea" },
      { code: "WS", name: "Samoa" },
      { code: "SB", name: "Solomon Islands" },
      { code: "TO", name: "Tonga" },
      { code: "TV", name: "Tuvalu" },
      { code: "VU", name: "Vanuatu" },
      { code: "NC", name: "New Caledonia" }
    ]
  },
  {
    name: "South America",
    countries: [
      { code: "AR", name: "Argentina" },
      { code: "BO", name: "Bolivia" },
      { code: "BR", name: "Brazil" },
      { code: "CL", name: "Chile" },
      { code: "CO", name: "Colombia" },
      { code: "EC", name: "Ecuador" },
      { code: "GY", name: "Guyana" },
      { code: "PY", name: "Paraguay" },
      { code: "PE", name: "Peru" },
      { code: "SR", name: "Suriname" },
      { code: "UY", name: "Uruguay" },
      { code: "VE", name: "Venezuela" },
      { code: "FK", name: "Falkland Islands" }
    ]
  },
  {
    name: "Antarctica",
    countries: [
      { code: "AQ", name: "Antarctica" },
      { code: "GL", name: "Greenland" },
      { code: "TF", name: "French Southern Territories" }
    ]
  }
];

// --- Build lookupMap for country names ---
(function buildLookupMap() {
  continents.forEach(cont => {
    cont.countries.forEach(c => {
      lookupMap[c.code] = c.name;
    });
  });
})();

// --- Menu modal open/close logic ---
const openMenuBtn = document.getElementById("open-menu-btn");
const menuModal = document.getElementById("menu-modal");
const closeMenuBtn = document.getElementById("close-menu-btn");

if (openMenuBtn && menuModal) {
  openMenuBtn.onclick = () => {
    menuModal.classList.remove("hidden");
  };
}
if (closeMenuBtn && menuModal) {
  closeMenuBtn.onclick = () => {
    menuModal.classList.add("hidden");
  };
}

// --- Auth logic ---
function saveUserToLocal(user) {
  localStorage.setItem("travellin_user", JSON.stringify(user));
}
function getUserFromLocal() {
  try {
    return JSON.parse(localStorage.getItem("travellin_user"));
  } catch {
    return null;
  }
}

// --- Login/Register logic ---
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginMessage = document.getElementById("login-message");
const registerMessage = document.getElementById("register-message");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

if (showRegister) {
  showRegister.onclick = (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    loginMessage.textContent = "";
    registerMessage.textContent = "";
  };
}
if (showLogin) {
  showLogin.onclick = (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    loginMessage.textContent = "";
    registerMessage.textContent = "";
  };
}

if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;
    loginMessage.textContent = "";
    if (!username || !password) {
      loginMessage.textContent = "Please enter both username and password.";
      return;
    }
    try {
      const snap = await db.ref("users").orderByChild("username").equalTo(username).once("value");
      const users = snap.val();
      if (!users) {
        loginMessage.textContent = "User not found.";
        return;
      }
      const userId = Object.keys(users)[0];
      const user = users[userId];
      if (user.password !== password) {
        loginMessage.textContent = "Incorrect password.";
        return;
      }
      currentUser = { ...user, id: userId };
      saveUserToLocal(currentUser);
      showApp();
    } catch (err) {
      loginMessage.textContent = "Login failed. Try again.";
    }
  };
}

if (registerForm) {
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value;
    registerMessage.textContent = "";
    if (!username || !password) {
      registerMessage.textContent = "Please enter both username and password.";
      return;
    }
    try {
      const snap = await db.ref("users").orderByChild("username").equalTo(username).once("value");
      if (snap.exists()) {
        registerMessage.textContent = "Username already taken.";
        return;
      }
      const newUserRef = db.ref("users").push();
      await newUserRef.set({
        username,
        password,
        visited: [],
        wish: [],
        lived: []
      });
      registerMessage.textContent = "Registered! You can now log in.";
      registerForm.reset();
      setTimeout(() => {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
      }, 1200);
    } catch (err) {
      registerMessage.textContent = "Registration failed. Try again.";
    }
  };
}

// --- Auto-login if user in localStorage ---
window.addEventListener("DOMContentLoaded", () => {
  const user = getUserFromLocal();
  if (user) {
    currentUser = user;
    showApp();
  }
});

// --- Show/hide app ---
function showApp() {
  const authContainer = document.getElementById("auth-container");
  const openMenuBtn = document.getElementById("open-menu-btn");
  const logoutBtn = document.getElementById("logout-btn");
  if (authContainer) authContainer.style.display = "none";
  if (openMenuBtn) openMenuBtn.style.display = "flex";
  if (logoutBtn) logoutBtn.style.display = "block";
  renderContinentMenu();
  loadVisited();
}

function hideApp() {
  const authContainer = document.getElementById("auth-container");
  const openMenuBtn = document.getElementById("open-menu-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const menuModal = document.getElementById("menu-modal");
  if (authContainer) authContainer.style.display = "block";
  if (openMenuBtn) openMenuBtn.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "none";
  if (menuModal) menuModal.classList.add("hidden");
  const profileModal = document.getElementById("profile-modal");
  if (profileModal) profileModal.classList.add("hidden");
  localStorage.removeItem("travellin_user");
}

// --- Logout ---
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.onclick = () => {
    currentUser = null;
    hideApp();
  };
}

// --- Mapbox Setup (official countries only) ---
mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuNDc3IiwiYSI6ImNtYzBocWxkZDAyODkya3IzcnVuMzZhbGwifQ.FxKhBvo0839jqpUyKLqVfg';
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [0, 20],
  zoom: 2,
  projection: 'mercator'
});

map.on('load', () => {
  mapLoaded = true;

  map.addSource('country-boundaries', {
    type: 'vector',
    url: 'mapbox://mapbox.country-boundaries-v1'
  });

  map.addLayer({
    id: 'country-highlight',
    type: 'fill',
    source: 'country-boundaries',
    'source-layer': 'country_boundaries',
    paint: {
      'fill-color': [
        'case',
        ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', livedA3Codes]], '#ff9800',
        ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', visitedA3Codes]], '#e0e0e0',
        ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', wishA3Codes]], '#757575',
        'rgba(0,0,0,0.08)'
      ],
      'fill-outline-color': '#222',
      'fill-opacity': 0.85
    }
  });

  map.addLayer({
    id: 'country-borders',
    type: 'line',
    source: 'country-boundaries',
    'source-layer': 'country_boundaries',
    paint: {
      'line-color': '#363636',
      'line-width': 0.7
    }
  });

  if (currentUser) showApp();
});

// --- Add flag waypoint markers on the map for visited/lived countries ---
function addFlagMarkers() {
  if (!mapLoaded) return;

  if (window._flagMarkers) {
    window._flagMarkers.forEach(m => m.remove());
  }
  window._flagMarkers = [];

  const codesToShow = [...new Set([...visitedA3Codes, ...livedA3Codes])];

  codesToShow.forEach(a3 => {
    const a2 = Object.keys(isoA2toA3).find(k => isoA2toA3[k] === a3);
    if (!a2) return;

    // Use capital if available
    let coords = countryCapitals[a2];
    if (!coords) {
      // Fallback: use centroid of the first visible polygon
      const features = map.queryRenderedFeatures({ layers: ['country-highlight'] })
        .filter(f => f.properties && f.properties.iso_3166_1_alpha_3 === a3);
      if (!features.length) return;
      const geom = features[0].geometry;
      if (geom.type === "Polygon") {
        const poly = geom.coordinates[0];
        let lng = 0, lat = 0;
        poly.forEach(([x, y]) => { lng += x; lat += y; });
        lng /= poly.length; lat /= poly.length;
        coords = [lng, lat];
      } else if (geom.type === "MultiPolygon") {
        const poly = geom.coordinates[0][0];
        let lng = 0, lat = 0;
        poly.forEach(([x, y]) => { lng += x; lat += y; });
        lng /= poly.length; lat /= poly.length;
        coords = [lng, lat];
      }
    }
    if (!coords) return;

    const el = document.createElement('div');
    el.className = 'flag-waypoint-marker';
    el.innerHTML = `<img class="country-flag-img" src="https://flagcdn.com/${a2.toLowerCase()}.svg" height="18" alt="" loading="lazy" />`;

    const marker = new mapboxgl.Marker(el)
      .setLngLat(coords)
      .addTo(map);

    window._flagMarkers.push(marker);
  });
}

// --- Update flag markers on map move/zoom and after color update ---
map.on('moveend', addFlagMarkers);
map.on('zoomend', addFlagMarkers);

function updateMapColors() {
  if (!mapLoaded) return;

  const lived = activeFilters.lived ? livedA3Codes : [];
  const visited = activeFilters.visited ? visitedA3Codes : [];
  const wish = activeFilters.wish ? wishA3Codes : [];

  map.setPaintProperty('country-highlight', 'fill-color', [
    'case',
    ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', lived]], '#ff9800',
    ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', visited]], '#e0e0e0',
    ['in', ['get', 'iso_3166_1_alpha_3'], ['literal', wish]], '#757575',
    'rgba(0,0,0,0.08)'
  ]);

  // Wait for the map to finish rendering before placing markers
  map.once('idle', addFlagMarkers);
}

// --- Load visited/wish/lived countries for current user ---
function loadVisited() {
  if (!currentUser) return;
  db.ref("users/" + currentUser.id + "/visited").on("value", (snapshot) => {
    const rawVisited = snapshot.val() || [];
    visitedA3Codes = rawVisited.map(toA3).filter(Boolean);
    window.visitedCodes = rawVisited;
    updateMapColors();
    saveTravelStats();
    if (window._updateCategoryMenu) window._updateCategoryMenu();
  });

  db.ref("users/" + currentUser.id + "/wish").on("value", (snapshot) => {
    const rawWish = snapshot.val() || [];
    wishA3Codes = rawWish.map(toA3).filter(Boolean);
    window.wishCodes = rawWish;
    updateMapColors();
    if (window._updateCategoryMenu) window._updateCategoryMenu();
  });

  db.ref("users/" + currentUser.id + "/lived").on("value", (snapshot) => {
    const rawLived = snapshot.val() || [];
    livedA3Codes = rawLived.map(toA3).filter(Boolean);
    window.livedCodes = rawLived;
    updateMapColors();
    if (window._updateCategoryMenu) window._updateCategoryMenu();
  });
}

// --- Country menu with lived/wish/visited (with flags) ---
function getFlagImgTag(a2) {
  if (!a2) return "";
  return `<img class="country-flag-img" src="https://flagcdn.com/${a2.toLowerCase()}.svg" height="18" alt="" loading="lazy" />`;
}

// --- Per-continent scroll position ---
let countryMenuScrollPos = {};

function renderContinentMenu() {
  const continentList = document.getElementById("continent-list");
  if (!continentList) return;

  continentList.innerHTML = "";

  const categories = [
    { key: "lived", label: "Lived", icon: '<i class="fi fi-sr-house-chimney"></i>' },
    { key: "visited", label: "Visited", icon: '<i class="fi fi-sr-marker"></i>' },
    { key: "wish", label: "Wish", icon: '<i class="fi fi-sr-heart"></i>' }
  ];

  const tabBar = document.createElement("div");
  tabBar.className = "country-category-tabs";
  categories.forEach(cat => {
    const tab = document.createElement("button");
    tab.className = "country-category-tab";
    tab.innerHTML = `${cat.icon} ${cat.label}`;
    tab.dataset.cat = cat.key;
    if (cat.key === currentCategory) tab.classList.add("active");
    tab.onclick = () => {
      // Do NOT clear scroll positions when changing tab
      currentCategory = cat.key;
      renderContinentMenu();
    };
    tabBar.appendChild(tab);
  });
  continentList.appendChild(tabBar);

  const categoryMenuContainer = document.createElement("div");
  categoryMenuContainer.id = "category-menu-container";
  continentList.appendChild(categoryMenuContainer);

  continents.forEach((cont, idx) => {
    const section = document.createElement("div");
    section.className = "region-section";

    const header = document.createElement("div");
    header.className = "region-header";
    header.innerHTML = `<span>${cont.name}</span> <button class="toggle-btn">${expandedContinentIndex === idx ? "−" : "+"}</button>`;
    section.appendChild(header);

    const menu = document.createElement("div");
    menu.className = "country-menu";
    menu.id = `country-menu-${idx}`;
    menu.style.display = expandedContinentIndex === idx ? "flex" : "none";

    cont.countries.forEach((country) => {
      const btn = document.createElement("button");
      btn.className = "country-btn";
      btn.innerHTML = `<span class="country-flag">${getFlagImgTag(country.code)}</span> ${country.name}`;
      btn.dataset.code = country.code;

      if (currentCategory === "visited") {
        btn.onclick = () => {
          toggleCountry(country.code, btn);
        };
        if (visitedA3Codes.includes(toA3(country.code))) btn.classList.add("visited");
      } else if (currentCategory === "wish") {
        btn.onclick = () => {
          toggleWish(country.code, btn);
        };
        if (wishA3Codes.includes(toA3(country.code))) btn.classList.add("wished");
      } else if (currentCategory === "lived") {
        btn.onclick = () => {
          toggleLived(country.code, btn);
        };
        if (livedA3Codes.includes(toA3(country.code))) btn.classList.add("lived");
      }

      menu.appendChild(btn);
    });

    section.appendChild(menu);
    categoryMenuContainer.appendChild(section);

    header.querySelector(".toggle-btn").onclick = function () {
      if (expandedContinentIndex === idx) {
        // Clear scroll position when collapsing
        countryMenuScrollPos[expandedContinentIndex] = 0;
        expandedContinentIndex = -1;
      } else {
        expandedContinentIndex = idx;
      }
      renderContinentMenu();
    };
  });

  // --- Restore scroll position for expanded continent's country-menu ---
  setTimeout(() => {
    if (expandedContinentIndex !== -1) {
      const newMenu = document.getElementById(`country-menu-${expandedContinentIndex}`);
      if (newMenu && countryMenuScrollPos[expandedContinentIndex] !== undefined) {
        newMenu.scrollTop = countryMenuScrollPos[expandedContinentIndex];
      }
    }
  }, 0);

  window._updateCategoryMenu = () => renderContinentMenu();
}

// --- Filter FAB with Flaticon UIcons ---
const fab = document.getElementById("map-filter-fab");
const toggleBtn = document.getElementById("map-filter-toggle");
const filterMenu = document.getElementById("map-filter-menu");
const filterBtns = document.querySelectorAll(".map-filter-toggle-btn");

if (toggleBtn) {
  toggleBtn.onclick = () => {
    filterMenu.classList.toggle("hidden");
  };
}

// Hide menu when clicking outside
document.addEventListener("mousedown", (e) => {
  if (
    !filterMenu.classList.contains("hidden") &&
    !fab.contains(e.target)
  ) {
    filterMenu.classList.add("hidden");
  }
});

// Toggle filter buttons
filterBtns.forEach(btn => {
  btn.onclick = () => {
    const filter = btn.dataset.filter;
    const pressed = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", !pressed);
    activeFilters[filter] = !pressed;
    updateMapColors();
  };
});

function saveCurrentMenuScroll() {
  if (expandedContinentIndex !== -1) {
    const menu = document.getElementById(`country-menu-${expandedContinentIndex}`);
    if (menu) {
      countryMenuScrollPos[expandedContinentIndex] = menu.scrollTop;
    }
  }
}

function toggleCountry(code, btn) {
  if (!currentUser) return;
  saveCurrentMenuScroll(); // <-- Save scroll before DB update
  db.ref("users/" + currentUser.id + "/visited")
    .once("value")
    .then((snapshot) => {
      let visited = snapshot.val() || [];
      if (visited.includes(code)) {
        visited = visited.filter((c) => c !== code);
      } else {
        visited.push(code);
      }
      db.ref("users/" + currentUser.id + "/visited").set(visited);
    });
}

function toggleWish(code, btn) {
  if (!currentUser) return;
  saveCurrentMenuScroll(); // <-- Save scroll before DB update
  db.ref("users/" + currentUser.id + "/wish")
    .once("value")
    .then((snapshot) => {
      let wish = snapshot.val() || [];
      if (wish.includes(code)) {
        wish = wish.filter((c) => c !== code);
      } else {
        wish.push(code);
      }
      db.ref("users/" + currentUser.id + "/wish").set(wish);
    });
}

function toggleLived(code, btn) {
  if (!currentUser) return;
  saveCurrentMenuScroll(); // <-- Save scroll before DB update
  db.ref("users/" + currentUser.id + "/lived")
    .once("value")
    .then((snapshot) => {
      let lived = snapshot.val() || [];
      if (lived.includes(code)) {
        lived = lived.filter((c) => c !== code);
      } else {
        lived.push(code);
      }
      db.ref("users/" + currentUser.id + "/lived").set(lived);
    });
}

// --- Profile modal logic ---
const profileBtn = document.getElementById("profile-btn");
const profileModal = document.getElementById("profile-modal");
const closeProfileBtn = document.getElementById("close-profile-btn");
const changeUsernameForm = document.getElementById("change-username-form");
const newUsernameInput = document.getElementById("new-username");
const changePasswordForm = document.getElementById("change-password-form");
const newPasswordInput = document.getElementById("new-password");
const clearMapBtn = document.getElementById("clear-map-btn");
const deleteAccountBtn = document.getElementById("delete-account-btn");
const profileMessage = document.getElementById("profile-message");


if (profileBtn) {
  profileBtn.onclick = () => {
    if (currentUser && profileModal) {
      profileModal.classList.remove("hidden");
      profileMessage.textContent = "";
      if (newUsernameInput) newUsernameInput.value = currentUser.username;
    }
  };
}
if (closeProfileBtn) {
  closeProfileBtn.onclick = () => {
    if (profileModal) profileModal.classList.add("hidden");
  };
}
if (changeUsernameForm) {
  changeUsernameForm.onsubmit = async (e) => {
    e.preventDefault();
    const newUsername = newUsernameInput.value.trim();
    if (!newUsername) {
      profileMessage.textContent = "Please enter a new username.";
      return;
    }
    // Check if username exists
    const snap = await db.ref("users").orderByChild("username").equalTo(newUsername).once("value");
    if (snap.exists()) {
      profileMessage.textContent = "Username already taken.";
      return;
    }
    await db.ref("users/" + currentUser.id + "/username").set(newUsername);
    currentUser.username = newUsername;
    saveUserToLocal(currentUser);
    profileMessage.textContent = "Username changed!";
  };
}
if (changePasswordForm) {
  changePasswordForm.onsubmit = async (e) => {
    e.preventDefault();
    const newPassword = newPasswordInput.value;
    if (!newPassword) {
      profileMessage.textContent = "Please enter a new password.";
      return;
    }
    await db.ref("users/" + currentUser.id + "/password").set(newPassword);
    profileMessage.textContent = "Password changed!";
    changePasswordForm.reset();
  };
}
if (clearMapBtn) {
  clearMapBtn.onclick = async () => {
    if (!currentUser) return;
    await db.ref("users/" + currentUser.id + "/visited").set([]);
    await db.ref("users/" + currentUser.id + "/wish").set([]);
    await db.ref("users/" + currentUser.id + "/lived").set([]);
    profileMessage.textContent = "Map cleared!";
  };
}
if (deleteAccountBtn) {
  deleteAccountBtn.onclick = async () => {
    if (!currentUser) return;
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    await db.ref("users/" + currentUser.id).remove();
    currentUser = null;
    hideApp();
    alert("Account deleted.");
  };
}

// --- Passport modal logic ---
const passportBtn = document.getElementById("passport-btn");
const passportModal = document.getElementById("passport-modal");
const closePassportBtn = document.getElementById("close-passport-btn");
const passportStatsDiv = document.getElementById("passport-stats");

if (passportBtn) {
  passportBtn.onclick = async () => {
    if (!currentUser) return;
    passportModal.classList.remove("hidden");
    await renderPassportStats();
  };
}
if (closePassportBtn) {
  closePassportBtn.onclick = () => {
    passportModal.classList.add("hidden");
  };
}

const comparePassportBtn = document.getElementById("compare-passport-btn");
if (comparePassportBtn) {
  comparePassportBtn.onclick = () => {
    // Get your user code from localStorage
    const user = getUserFromLocal();
    if (user && user.id) {
      window.open(`compare.html?user1=${encodeURIComponent(user.id)}`, "_blank");
    } else {
      window.open("compare.html", "_blank");
    }
  };
}

const sharePassportBtn = document.getElementById("share-passport-btn");
if (sharePassportBtn) {
  sharePassportBtn.onclick = async () => {
    const user = getUserFromLocal();
    if (!user || !user.id) return;
    const shareUrl = `${window.location.origin}/compare.html?user1=${encodeURIComponent(user.id)}`;
    const shareText = `Check out my travel passport on WANDER! Compare your stats with mine:\n${shareUrl}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My WANDER Passport",
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert("Share link copied to clipboard!");
    }
  };
}

const passportCodeSpan = document.getElementById("passport-code");
const copyPassportCodeBtn = document.getElementById("copy-passport-code-btn");

function showPassportCode() {
  const user = getUserFromLocal();
  if (user && user.id && passportCodeSpan) {
    passportCodeSpan.textContent = user.id;
  }
}

if (passportBtn) {
  passportBtn.onclick = async () => {
    if (!currentUser) return;
    passportModal.classList.remove("hidden");
    showPassportCode();
    await renderPassportStats();
  };
}

if (copyPassportCodeBtn) {
  copyPassportCodeBtn.onclick = async () => {
    const user = getUserFromLocal();
    if (user && user.id) {
      await navigator.clipboard.writeText(user.id);
      copyPassportCodeBtn.textContent = "Copied!";
      setTimeout(() => {
        copyPassportCodeBtn.textContent = "Copy";
      }, 1200);
    }
  };
}

async function renderPassportStats() {
  if (!currentUser || !passportStatsDiv) return;
  const snap = await db.ref("users/" + currentUser.id).once("value");
  const user = snap.val();
  const visited = user.visited || [];
  const lived = user.lived || [];
  const wish = user.wish || [];

  // Only count official countries (in continents array)
  const allCountries = [];
  continents.forEach(cont => cont.countries.forEach(c => allCountries.push(c.code)));
  const totalCountries = allCountries.length;
  const percentWorld = ((visited.length / totalCountries) * 100).toFixed(1);

  let continentStats = [];
  for (const cont of continents) {
    const total = cont.countries.length;
    const visitedInCont = cont.countries.filter(c => visited.includes(c.code));
    const percent = ((visitedInCont.length / total) * 100).toFixed(1);
    continentStats.push(`<div>${cont.name}: <b>${visitedInCont.length}/${total}</b> (${percent}%)</div>`);
  }

  passportStatsDiv.innerHTML = `
    <div style="font-size:1.2em;margin-bottom:0.5em;">
      <b>${visited.length}</b> / <b>${totalCountries}</b> countries visited
      <span style="margin-left:1em;">(<b>${percentWorld}%</b> of world)</span>
    </div>
    <div style="margin-bottom:0.5em;">
      <b>${lived.length}</b> lived, <b>${wish.length}</b> wish
    </div>
    <div style="font-size:1em;">
      ${continentStats.join("")}
    </div>
  `;
}

// --- Utility: Haversine ---
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// --- Stats calculation and storage ---
function calculateTravelStats(user) {
  if (!user) return null;
  const visited = user.visited || [];
  const lived = user.lived || [];

  // Only count official countries (in continents array)
  const allCountries = [];
  continents.forEach(cont => cont.countries.forEach(c => allCountries.push(c.code)));
  const totalCountries = allCountries.length;
  const percentWorld = ((visited.length / totalCountries) * 100);

  let continentPercents = {};
  for (const cont of continents) {
    const total = cont.countries.length;
    const visitedInCont = cont.countries.filter(c => visited.includes(c.code));
    const percent = ((visitedInCont.length / total) * 100);
    continentPercents[cont.name] = +percent.toFixed(2);
  }

  // Removed furthestDistanceKm and furthestCountries
  return {
    countriesVisited: visited.length,
    countriesLived: lived.length,
    percentWorld: +percentWorld.toFixed(2),
    continentPercents
  };
}

async function saveTravelStats() {
  if (!currentUser) return;
  const snap = await db.ref("users/" + currentUser.id).once("value");
  const user = snap.val();
  const stats = calculateTravelStats(user);
  if (stats) {
    await db.ref("users/" + currentUser.id + "/stats").set(stats);
  }
}

async function renderTravelStats() {
  if (!currentUser) return;
  const statsDiv = document.getElementById("travel-stats");
  if (!statsDiv) return;

  const snap = await db.ref("users/" + currentUser.id).once("value");
  const user = snap.val();
  const visited = user.visited || [];
  const lived = user.lived || [];

  // Only count official countries (in continents array)
  const allCountries = [];
  continents.forEach(cont => cont.countries.forEach(c => allCountries.push(c.code)));
  const totalCountries = allCountries.length;
  const percentWorld = ((visited.length / totalCountries) * 100).toFixed(1);

  let continentStats = [];
  for (const cont of continents) {
    const total = cont.countries.length;
    const visitedInCont = cont.countries.filter(c => visited.includes(c.code));
    const percent = ((visitedInCont.length / total) * 100).toFixed(1);
    continentStats.push(`${cont.name}: ${visitedInCont.length}/${total} (${percent}%)`);
  }

  statsDiv.innerHTML = `
    <h3>Travel Stats</h3>
    <div>Visited: ${visited.length}</div>
    <div>Lived: ${lived.length}</div>
    <div>World: ${visited.length}/${totalCountries} (${percentWorld}%)</div>
    <div>${continentStats.join("<br>")}</div>
  `;
}