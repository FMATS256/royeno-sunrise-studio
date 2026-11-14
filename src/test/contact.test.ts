import { describe, expect, it } from "vitest";
import { companyContact, directionsUrl, whatsappUrl } from "@/lib/contact";

describe("official Royeno contact information", () => {
  it("uses the published contact number for calls and WhatsApp", () => {
    expect(companyContact.phoneHref).toBe("tel:+263774161316");
    expect(whatsappUrl("Solar enquiry")).toBe("https://wa.me/263774161316?text=Solar%20enquiry");
  });
  it("uses the published email address", () => {
    expect(companyContact.email).toBe("info@royenosolartech.co.zw");
  });
  it("keeps the published Harare address in map directions", () => {
    expect(new URL(directionsUrl(`${companyContact.address}, ${companyContact.city}`)).searchParams.get("query")).toBe("Afgate House, Cnr 4th & George Silundika, Harare, Zimbabwe");
  });
  it("keeps the published weekday and Saturday hours", () => {
    expect(companyContact.hours).toEqual([
      { days: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
      { days: "Saturday", time: "8:00 AM – 1:00 PM" },
    ]);
  });
});