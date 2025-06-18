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

function toA3(code) {
  return isoA2toA3[code] || code;
}

// Build lookupMap for country names (A3 code -> name)
let lookupMap = {};
continents.forEach(cont => {
  cont.countries.forEach(c => {
    lookupMap[toA3(c.code)] = c.name;
  });
});

const compareForm = document.getElementById("compare-form");
const user1Input = document.getElementById("user1");
const user2Input = document.getElementById("user2");
const compareResult = document.getElementById("compare-result");
const compareError = document.getElementById("compare-error");

compareForm.onsubmit = async (e) => {
  e.preventDefault();
  compareError.textContent = "";
  compareResult.innerHTML = "Loading...";

  const code1 = user1Input.value.trim();
  const code2 = user2Input.value.trim();
  if (!code1 || !code2) {
    compareError.textContent = "Please enter both codes.";
    compareResult.innerHTML = "";
    return;
  }
  if (code1 === code2) {
    compareError.textContent = "Please enter two different codes.";
    compareResult.innerHTML = "";
    return;
  }

  try {
    const [snap1, snap2] = await Promise.all([
      db.ref("users/" + code1).once("value"),
      db.ref("users/" + code2).once("value"),
    ]);
    if (!snap1.exists() || !snap2.exists()) {
      compareError.textContent = "One or both codes are invalid.";
      compareResult.innerHTML = "";
      return;
    }
    const user1 = snap1.val();
    const user2 = snap2.val();
    const user1Visited = new Set((user1.visited || []).map(toA3));
    const user2Visited = new Set((user2.visited || []).map(toA3));
    const overlap = [...user1Visited].filter((c) => user2Visited.has(c));
    const overlapNames = overlap.map(c => lookupMap[c] || c);

    // --- Compare stats ---
    const stats1 = user1.stats || {};
    const stats2 = user2.stats || {};

    compareResult.innerHTML = `
      <div class="compare-columns">
        <div class="compare-user">
          <div class="compare-username">${user1.username || code1}</div>
          <div class="compare-stat"><span class="compare-label">Visited:</span> <span class="compare-value">${user1Visited.size}</span></div>
          <div class="compare-stat"><span class="compare-label">% of World:</span> <span class="compare-value">${stats1.percentWorld?.toFixed(1) || "0"}%</span></div>
          <div class="compare-stat compare-continents">
            <span class="compare-label">Continents:</span>
            ${stats1.continentPercents ? Object.entries(stats1.continentPercents).map(([cont, val]) =>
              `<div class="compare-continent-row"><span>${cont}:</span> <span>${val.toFixed(1)}%</span></div>`
            ).join("") : ""}
          </div>
        </div>
        <div class="compare-vs">
          <div class="vs-circle">VS</div>
        </div>
        <div class="compare-user">
          <div class="compare-username">${user2.username || code2}</div>
          <div class="compare-stat"><span class="compare-label">Visited:</span> <span class="compare-value">${user2Visited.size}</span></div>
          <div class="compare-stat"><span class="compare-label">% of World:</span> <span class="compare-value">${stats2.percentWorld?.toFixed(1) || "0"}%</span></div>
          <div class="compare-stat compare-continents">
            <span class="compare-label">Continents:</span>
            ${stats2.continentPercents ? Object.entries(stats2.continentPercents).map(([cont, val]) =>
              `<div class="compare-continent-row"><span>${cont}:</span> <span>${val.toFixed(1)}%</span></div>`
            ).join("") : ""}
          </div>
        </div>
      </div>
      <hr>
      <div class="compare-row overlap-row">
        <span class="compare-label">Both visited:</span>
        <span class="compare-value">${overlap.length}</span>
      </div>
      <div class="overlap-list">${overlapNames.length ? overlapNames.join(", ") : "<i>No overlap</i>"}</div>
    `;
  } catch (err) {
    compareError.textContent = "Error loading data.";
    compareResult.innerHTML = "";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  // Pre-fill user1 from localStorage (travellin_user is a JSON string in main app)
  let myUser = null;
  try {
    myUser = JSON.parse(localStorage.getItem("travellin_user"));
  } catch {}
  if (myUser && myUser.id && user1Input) {
    user1Input.value = myUser.id;
  }

  // Support ?user1 and ?user2 in URL
  const params = new URLSearchParams(window.location.search);
  if (params.get("user1")) user1Input.value = params.get("user1");
  if (params.get("user2")) user2Input.value = params.get("user2");
  if (user1Input.value && user2Input.value && compareForm) compareForm.requestSubmit();
});