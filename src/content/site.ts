export const site = {
  name: "Cranford Realty Group",
  shortName: "CRG",
  legalName: "Cranford Realty Group, LLC",
  tagline: "Buy or sell in Middle Georgia with a team you can actually talk to.",
  url: "https://www.cranfordrealtygroup.com",
  email: "info@Cranford-Realty-Group.com",
  listingsPhone: {
    display: "(478) 718-2783",
    href: "tel:+14787182783",
    sms: "sms:+14787182783",
  },
  rentalsPhone: {
    display: "(478) 737-4973",
    href: "tel:+14787374973",
    sms: "sms:+14787374973",
  },
  officePhone: {
    display: "(478) 259-3605",
    href: "tel:+14782593605",
  },
  address: {
    line1: "168 Orange St",
    city: "Macon",
    state: "GA",
    zip: "31201",
  },
  mapUrl:
    "https://www.google.com/maps?q=168+Orange+St,+Macon,+GA+31201",
  mapEmbed:
    "https://maps.google.com/maps?q=168%20Orange%20St%2C%20Macon%2C%20GA%2031201&z=15&output=embed",
  areas: ["Macon", "Warner Robins", "Perry", "Byron", "Bonaire", "Lizella"],
  counties: ["Bibb County", "Houston County", "Peach County"],
  /**
   * Zillow Rental Manager
   * Paste your public Zillow profile URL in profileUrl so "Our rentals" opens
   * YOUR listings. Example: https://www.zillow.com/profile/your-zillow-username
   * The dashboard itself cannot be embedded on this site — Zillow does not allow it.
   */
  zillow: {
    rentalManager: "https://www.zillow.com/rental-manager/",
    profileUrl: "",
    maconRentals: "https://www.zillow.com/macon-ga/rentals/",
    warnerRobinsRentals: "https://www.zillow.com/warner-robins-ga/rentals/",
  },
  team: [
    {
      name: "Maria Cranford",
      role: "Broker",
      roleEs: "Corredora",
      phoneDisplay: "(478) 737-4973",
      phoneHref: "tel:+14787374973",
      sms: "sms:+14787374973",
      initials: "MC",
      photo: "/team/maria-cranford.jpg",
      bio: "Maria leads Cranford Realty Group and works with families buying, selling, and relocating across Middle Georgia.",
      bioEs:
        "Maria dirige Cranford Realty Group y trabaja con familias que compran, venden y se mudan en el centro de Georgia.",
    },
    {
      name: "Bertha Cranford",
      role: "Realtor",
      roleEs: "Agente de bienes raíces",
      phoneDisplay: "(478) 718-2783",
      phoneHref: "tel:+14787182783",
      sms: "sms:+14787182783",
      initials: "BC",
      photo: "/team/bertha-cranford.jpg",
      bio: "Bertha helps buyers and sellers through showings, offers, and closing with clear, practical guidance.",
      bioEs:
        "Bertha acompaña a compradores y vendedores en las visitas, ofertas y el cierre con una guía clara y práctica.",
    },
    {
      name: "Mayra Dominy",
      role: "Realtor",
      roleEs: "Agente de bienes raíces",
      phoneDisplay: "(478) 733-1283",
      phoneHref: "tel:+14787331283",
      sms: "sms:+14787331283",
      initials: "MD",
      photo: "/team/mayra-dominy.jpg",
      bio: "Mayra works with local and relocating clients who want a straightforward path from first call to keys.",
      bioEs:
        "Mayra trabaja con clientes locales y quienes se mudan a la zona y quieren un camino claro desde la primera llamada hasta las llaves.",
    },
    {
      name: "Nick Dominy",
      role: "Appraiser, Landlord & Engineer",
      roleEs: "Tasador, arrendador e ingeniero",
      phoneDisplay: "(478) 259-3605",
      phoneHref: "tel:+14782593605",
      sms: "sms:+14782593605",
      initials: "ND",
      photo: "/team/nick-dominy.jpg",
      bio: "Nick is an appraiser, landlord, and engineer. He helps the team look at value, rental property, and the practical condition of a home — not just the listing photos.",
      bioEs:
        "Nick es tasador, arrendador e ingeniero. Ayuda al equipo a ver el valor, la renta y el estado real de una casa — no solo las fotos del anuncio.",
    },
  ],
} as const;

export const nav = [
  { href: "/", key: "home" },
  { href: "/buy", key: "buy" },
  { href: "/sell", key: "sell" },
  { href: "/listings", key: "listings" },
  { href: "/rentals", key: "rentals" },
  { href: "/about", key: "about" },
  { href: "/feedback", key: "feedback" },
  { href: "/contact", key: "contact" },
] as const;
