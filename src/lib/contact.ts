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