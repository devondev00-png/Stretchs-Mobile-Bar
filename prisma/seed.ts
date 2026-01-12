import { db } from "@/lib/db";

async function main() {
  console.log("🌱 Seeding premium content...");

  // 1. Site Settings (Hero)
  await db.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      businessName: "Stretchs Mobile Bar",
      phone: "087 060 9734",
      email: "info@stretchsmobilebar.ie",
      location: "Servicing Limerick, Clare, Kerry & Tipperary",
      instagramHandle: "stretchs_mobile_bar",
      heroHeadline: "Elevate Your Event with Ireland’s Premier Mobile Bar Experience.",
      heroSubheadline: "From intimate weddings to corporate festivals — we bring the taps, the style, and the service to make your occasion unforgettable."
    }
  });

  // 2. Packages (4 Premium Options)
  const packages = [
    {
      slug: "the-garden-party",
      title: "The Garden Party",
      summary: "Perfect for birthdays and family gatherings. Two taps and a sleek setup.",
      description: "Our entry-level package that doesn't compromise on style. Ideal for up to 50 guests, bringing the pub experience to your back garden.",
      inclusions: [
        "- 2 Taps of your choice (Guinness, Heineken, Cider, etc.)",
        "- Compact Bar Counter (Black or Wood finish)",
        "- In-line Cooling System",
        "- 50 Pint Glasses (Standard)",
        "- Setup & Collection included"
      ].join("\n"),
      priceFrom: 350,
      depositCents: 5000,
      isFeatured: true,
      sortOrder: 1
    },
    {
      slug: "the-wedding-classic",
      title: "The Wedding Classic",
      summary: "Our most popular choice. 3 taps, full service, and Prosecco wall.",
      description: "Designed for the big day. We handle everything from the arrival drinks to the evening flowing pints. Elegant setup that complements your venue.",
      inclusions: [
        "- 3 Taps (Stout, Lager, Ale/Cider)",
        "- Premium Bar Counter (Illuminated option)",
        "- Prosecco Wall (Holds 40 flutes)",
        "- Glassware for 100+ guests",
        "- 2 Staff members for 4 hours",
        "- Full Cooling & Gas Setup"
      ].join("\n"),
      priceFrom: 650,
      depositCents: 10000,
      isFeatured: true,
      sortOrder: 2
    },
    {
      slug: "the-corporate-mixer",
      title: "The Corporate Mixer",
      summary: "Impress clients and staff. Branded bar options and cocktail service.",
      description: "A sophisticated solution for office parties, product launches, and client entertainment. We can brand the bar to match your company identity.",
      inclusions: [
        "- 4 Taps (High capacity system)",
        "- Branded Bar Front (Your Logo)",
        "- Cocktail Station & Mixologist",
        "- Premium Glassware & Ice Service",
        "- Public Liability Insurance (fully covered)",
        "- Invoice & VAT receipt provided"
      ].join("\n"),
      priceFrom: 950,
      depositCents: 15000,
      isFeatured: true,
      sortOrder: 3
    },
    {
      slug: "the-festival-rig",
      title: "The Festival Rig",
      summary: "High volume serving for large crowds. 6+ taps and cooling trailer.",
      description: "Built for speed and volume. When you have 200+ thirsty guests, you need the Festival Rig. Guarantees perfectly cold pints, poured fast.",
      inclusions: [
        "- 6+ Taps (Double line cooling)",
        "- Walk-in Cold Room / Cooling Trailer",
        "- 10m Bar Counter Support",
        "- generator power backup (optional)",
        "- 4+ Serving Staff",
        "- Waste Management included"
      ].join("\n"),
      priceFrom: 1200,
      depositCents: 20000,
      isFeatured: false,
      sortOrder: 4
    }
  ];

  for (const pkg of packages) {
    await db.package.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: pkg
    });
  }

  // 3. FAQs (15 Items)
  const faqs = [
    { q: "How far do you travel?", a: "We primarily cover Limerick, Clare, Kerry, and Tipperary. We can travel nationwide for larger weddings and corporate events — just ask for a quote." },
    { q: "Do I need to apply for a license?", a: "For private property events (weddings, home parties) where alcohol is free, no license is needed. If you are selling alcohol, we can help advise on the occasional license process." },
    { q: "What power supply do you need?", a: "We require a standard 13amp socket within 20 meters of the bar location. For remote fields, we can arrange a generator." },
    { q: "Do you supply the kegs?", a: "We can source kegs for you at cost price, or you can purchase them yourself from a local wholesaler. We just charge for the hire and service." },
    { q: "How long does setup take?", a: "We typically arrive 90 minutes before serving time to ensure the gas lines are settled and the beer has reached the perfect temperature." },
    { q: "Can you serve cocktails?", a: "Absolutely. Our 'Corporate Mixer' and bespoke packages can include a cocktail station and trained mixologists." },
    { q: "Is a deposit required?", a: "Yes, we take a booking deposit (varied by package) to secure your date. The balance is due 7 days before the event." },
    { q: "What happens to unfinished kegs?", a: "Any unfinished kegs are yours to keep! If you have a pump, you can finish them the next day." },
    { q: "Do you provide glassware?", a: "Yes, standard pint glasses are included. We also offer premium crystal-style glassware for weddings and champagne flutes." },
    { q: "Are you insured?", a: "Yes, we carry full Public Liability and Product Liability insurance. We can provide certs to your venue upon request." },
    { q: "Can we brand the bar?", a: "Yes! For corporate events, we can wrap the bar counter with your logo or graphics. Requires 2 weeks notice." },
    { q: "Do you do table service?", a: "Our standard service is from the bar. Table service can be added as an optional extra with additional staff." },
    { q: "What if the keg runs out?", a: "We always advise ordering slightly more than you think. We can bring backup kegs on a 'sale or return' basis for peace of mind." },
    { q: "Can you set up indoors?", a: "Yes, our bars are modular and can fit through standard single doors. We use drip trays to protect flooring." },
    { q: "Do you supply ice?", a: "Yes, we bring plenty of ice for spirits, wines, and cocktails. Our beer systems cool the draught directly." }
  ];

  await db.fAQ.deleteMany({}); // Clear old FAQs to ensure clean sort order
  await db.fAQ.createMany({
    data: faqs.map((f, i) => ({ question: f.q, answer: f.a, sortOrder: i + 1 }))
  });

  // 4. Testimonials (8 Items)
  const testimonials = [
    { name: "Sarah & Mike", quote: "Stretchs Mobile Bar made our marquee wedding! The Guinness tried and tested perfect, and the lads were great craic with the guests.", rating: 5 },
    { name: "John O'Connor", quote: "Hired the two-tap setup for my 40th. Seamless from start to finish. They were in and out without a fuss, and the setup looked brilliant.", rating: 5 },
    { name: "Clare Tech Corp", quote: "Used the branded bar for our summer BBQ. Professional service, great cocktails, and the branding looked incredibly sharp. Highly recommended.", rating: 5 },
    { name: "Emma D.", quote: "The Prosecco wall was the highlight of the arrival reception. Stunning setup and great photos.", rating: 5 },
    { name: "Patrick Murphy", quote: "Best pint of Heineken I've had outside a pub. The cooling system is top notch.", rating: 5 },
    { name: "Limerick Rugby Club", quote: "Handled a crowd of 200+ with ease. No queues, cold pints, happy days.", rating: 4 },
    { name: "Jessica W.", quote: "So easy to deal with. Booked online, paid deposit, and they handled the rest. Took all the stress out of the party.", rating: 5 },
    { name: "The Fitzgeralds", quote: "Setup looked very premium compared to other mobile bars we've seen. Real wood counters and proper taps.", rating: 5 }
  ];

  await db.testimonial.deleteMany({});
  await db.testimonial.createMany({
    data: testimonials.map((t, i) => ({ name: t.name, quote: t.quote, rating: t.rating, sortOrder: i + 1 }))
  });

  console.log("✅ Seeding complete.");
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
