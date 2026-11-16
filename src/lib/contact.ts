export const companyContact = {
  phone: "+263 77 416 1316",
  phoneHref: "tel:+263774161316",
  whatsapp: "https://wa.me/263774161316",
  email: "info@royenosolartech.co.zw",
  address: "Afgate House, Cnr 4th & George Silundika",
  city: "Harare, Zimbabwe",
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { days: "Saturday", time: "8:00 AM – 1:00 PM" },
  ],
  source: "https://royenosolartech.co.zw/contact",
};

export function directionsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function whatsappUrl(message: string) {
  return `${companyContact.whatsapp}?text=${encodeURIComponent(message)}`;
}
export type Branch = { name: string; address: string | null; headquarters?: boolean };

/** Branches listed on Royeno's "We Are Open" flyer (Facebook, July 2026). */
export const branches: Branch[] = [
  { name: "Harare", address: "Afgate House, Corner 4th Street & George Silundika", headquarters: true },
  { name: "Gokwe", address: "No. 1 Airstrip Complex, near Roma" },
  { name: "Chiredzi", address: "Chandara Complex, opposite Old Rank" },
  { name: "Mt Darwin", address: "Shop No. 5, Garanonga Complex" },
  { name: "Mvurwi", address: "Shop No. 7, Tavengwa Complex" },
  { name: "Mutoko", address: "Opposite Profeeds, next to Chicken Colley" },
  { name: "Rusape", address: "Opposite Econet Shop, next to Masamvi Complex" },
  { name: "Goromonzi", address: "Woke Mutamba Shops" },
  { name: "Gazebo", address: null },
];

export const branchPhones = ["+263 78 212 0724", "+263 78 915 5825"];
