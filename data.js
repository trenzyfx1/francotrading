/* ===========================================================
   Franco Trading — shared product data + state helpers
   This is an academic frontend demo. No data leaves the browser.
   =========================================================== */

const PRODUCTS = [
  {
    id: "laptop",
    name: "Pro Series Laptop",
    was: "₵6,500",
    icon: "laptop"
  },
  {
    id: "chromebook",
    name: "HP Chromebook",
    was: "₵3,200",
    icon: "chromebook"
  },
  {
    id: "phone",
    name: "Samsung Galaxy A17",
    was: "₵2,400",
    icon: "phone"
  },
  {
    id: "ac",
    name: "1.5HP Air Conditioner",
    was: "₵4,800",
    icon: "ac"
  }
];

const GIVEAWAY_PRICE = "GH₵20.00";

/* ---------- simple sessionStorage state ---------- */
const FrancoState = {
  key: "franco_demo_state",

  get(){
    try{
      return JSON.parse(sessionStorage.getItem(this.key)) || {};
    }catch(e){ return {}; }
  },
  set(patch){
    const current = this.get();
    const next = Object.assign({}, current, patch);
    sessionStorage.setItem(this.key, JSON.stringify(next));
    return next;
  },
  clear(){
    sessionStorage.removeItem(this.key);
  }
};

function getProductById(id){
  return PRODUCTS.find(p => p.id === id);
}

/* ---------- product icon markup (inline SVG, no external images) ---------- */
function productIconSVG(icon){
  const icons = {
    laptop: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="14" width="44" height="28" rx="3" fill="#0f2152"/>
      <rect x="14" y="18" width="36" height="20" rx="1.5" fill="#a9c2ff"/>
      <path d="M4 46h56l-4 6H8l-4-6z" fill="#f4b740"/>
    </svg>`,
    chromebook: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="15" width="46" height="27" rx="3" fill="#1a2f68"/>
      <rect x="13" y="19" width="38" height="19" rx="1.5" fill="#ffe3a3"/>
      <circle cx="32" cy="28.5" r="5" fill="#0f2152"/>
      <path d="M3 46h58l-4 6H7l-4-6z" fill="#f4b740"/>
    </svg>`,
    phone: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="21" y="6" width="22" height="52" rx="5" fill="#0f2152"/>
      <rect x="24" y="12" width="16" height="35" rx="1.5" fill="#a9c2ff"/>
      <circle cx="32" cy="51" r="2.4" fill="#f4b740"/>
    </svg>`,
    ac: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="18" width="52" height="20" rx="5" fill="#eef1fb" stroke="#0f2152" stroke-width="2"/>
      <rect x="12" y="24" width="30" height="3" rx="1.5" fill="#0f2152"/>
      <rect x="12" y="30" width="22" height="3" rx="1.5" fill="#0f2152"/>
      <circle cx="48" cy="28" r="4" fill="#f4b740"/>
      <path d="M14 40l-4 10M26 40l-3 10M38 40l-2 10" stroke="#a9c2ff" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  };
  return icons[icon] || "";
}

/* ---------- 24h rolling countdown ---------- */
function startRollingCountdown(targetEl){
  const DURATION = 24 * 60 * 60 * 1000; // 24 hours
  const STORE_KEY = "franco_countdown_start";

  let start = parseInt(localStorage.getItem(STORE_KEY), 10);
  const now = Date.now();
  if (!start || now - start > DURATION) {
    start = now;
    localStorage.setItem(STORE_KEY, String(start));
  }

  function render(){
    const elapsed = (Date.now() - start) % DURATION;
    const remaining = DURATION - elapsed;

    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);

    const pad = n => String(n).padStart(2, "0");
    if (targetEl.hours) targetEl.hours.textContent = pad(h);
    if (targetEl.mins) targetEl.mins.textContent = pad(m);
    if (targetEl.secs) targetEl.secs.textContent = pad(s);
  }

  render();
  return setInterval(render, 1000);
}

/* ---------- card number formatting (demo only, never persisted beyond page) ---------- */
function formatCardNumber(value){
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(value){
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return digits.slice(0,2) + " / " + digits.slice(2);
  return digits;
}
function maskCardForDisplay(formatted){
  if (!formatted) return "•••• •••• •••• ••••";
  const groups = formatted.split(" ");
  while (groups.length < 4) groups.push("••••");
  return groups.map((g,i) => g.padEnd(4,"•")).join(" ");
}
