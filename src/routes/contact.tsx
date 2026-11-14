import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone as PhoneIcon, Send } from "lucide-react";
import { BottomNav, Phone, TopBar } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { companyContact, directionsUrl, whatsappUrl } from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact Us — Royeno Solartech" },
    { name: "description", content: "Call, email or visit Royeno Solartech in Harare for solar, borehole and irrigation enquiries." },
    { property: "og:title", content: "Contact Us — Royeno Solartech" },
    { property: "og:description", content: "Get in touch with our Harare team and find our opening hours." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Solar Installations");
  const [message, setMessage] = useState("");
  const field = "mt-1.5 w-full min-w-0 rounded-lg border bg-card px-3 py-3 text-sm outline-none focus:border-primary";
  return (
    <Phone>
      <TopBar title="Contact Us" subtitle="Let’s talk about your next project" />
      <main className="flex-1 space-y-7 px-5 py-5">
        <section className="border-b pb-6">
          <h2 className="text-2xl font-bold text-primary">Talk to Royeno</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Solar installations, borehole services and irrigation. Get in touch for a free consultation and personalized quote.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button asChild className="min-h-12"><a href={companyContact.phoneHref}><PhoneIcon /> Call Us</a></Button>
            <Button asChild variant="outline" className="min-h-12"><a href={whatsappUrl("Hello Royeno, I'm interested in your services.")} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button>
          </div>
        </section>
        <div className="grid gap-8 @min-[600px]:grid-cols-2">
          <section className="min-w-0 space-y-6">
            <div className="flex gap-3"><PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-secondary" /><div className="min-w-0"><h3 className="text-sm font-bold">Call Us</h3><a href={companyContact.phoneHref} className="mt-1 block text-sm text-primary">{companyContact.phone}</a></div></div>
            <div className="flex gap-3"><Mail className="mt-1 h-5 w-5 shrink-0 text-secondary" /><div className="min-w-0"><h3 className="text-sm font-bold">Email Us</h3><a href={`mailto:${companyContact.email}`} className="mt-1 block break-all text-sm text-primary">{companyContact.email}</a></div></div>
            <div className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-secondary" /><div className="min-w-0"><h3 className="text-sm font-bold">Visit Us</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{companyContact.address}<br />{companyContact.city}</p><a href={directionsUrl(`${companyContact.address}, ${companyContact.city}`)} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-primary">Get Directions <ArrowRight className="h-4 w-4" /></a></div></div>
            <div className="flex gap-3"><Clock className="mt-1 h-5 w-5 shrink-0 text-secondary" /><div className="min-w-0 flex-1"><h3 className="text-sm font-bold">Working Hours</h3><dl className="mt-2 space-y-2">{companyContact.hours.map((h) => <div key={h.days} className="text-sm"><dt className="text-muted-foreground">{h.days}</dt><dd className="font-medium">{h.time}</dd></div>)}</dl></div></div>
            <Button asChild variant="outline" className="min-h-12 w-full"><Link to="/branches"><MapPin /> Our Branches <ArrowRight /></Link></Button>
          </section>
          <section className="min-w-0 border-t pt-6 @min-[600px]:border-t-0 @min-[600px]:pt-0">
            <h2 className="text-lg font-bold">Send Us a Message</h2>
            <form className="mt-4 space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\n\n${message}`;
              window.location.href = `mailto:${companyContact.email}?subject=${encodeURIComponent(`${service} enquiry — ${name}`)}&body=${encodeURIComponent(body)}`;
            }}>
              <label className="block text-xs font-semibold">Full Name *<input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} /></label>
              <label className="block text-xs font-semibold">Email Address *<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={field} /></label>
              <label className="block text-xs font-semibold">Phone Number<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" className={field} /></label>
              <label className="block text-xs font-semibold">Service Interested In<select value={service} onChange={(e) => setService(e.target.value)} className={field}>{["Solar Installations", "Borehole Services", "Irrigation Services", "Other"].map((s) => <option key={s}>{s}</option>)}</select></label>
              <label className="block text-xs font-semibold">Message *<textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${field} resize-y`} /></label>
              <Button type="submit" className="min-h-12 w-full"><Send /> Send by Email</Button>
            </form>
          </section>
        </div>
        <a href={companyContact.source} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-xs text-muted-foreground underline">royenosolartech.co.zw</a>
      </main>
      <BottomNav />
    </Phone>
  );
}