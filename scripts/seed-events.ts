import fs from "fs";
import path from "path";
import config from "@payload-config";
import { getPayload } from "payload";

async function seedEvents() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "events",
    limit: 1,
    overrideAccess: true,
  });

  if (existing.totalDocs > 0) {
    console.log("Events already seeded.");
    return;
  }

  const sources = ["poza-rectorat-hd.jpeg", "poza-rectorat-drona.jpg"];
  const mediaIds: number[] = [];

  for (const [i, name] of sources.entries()) {
    const buffer = fs.readFileSync(path.resolve(process.cwd(), "public", name));
    const media = await payload.create({
      collection: "media",
      data: { alt: `Banner eveniment ${i + 1}` },
      file: {
        data: buffer,
        mimetype: "image/jpeg",
        name: `event-${i + 1}.jpeg`,
        size: buffer.length,
      },
      overrideAccess: true,
    });
    mediaIds.push(media.id as number);
  }

  const day = 24 * 60 * 60 * 1000;
  const now = Date.now();

  const events = [
    { title: "Noaptea Cercetătorilor", daysAhead: 5, link: "https://upb.ro" },
    { title: "Târgul de Carieră IT", daysAhead: 12, link: "https://upb.ro" },
    { title: "Conferința de Robotică", daysAhead: 20, link: "https://upb.ro" },
    { title: "Ziua Porților Deschise", daysAhead: 28, link: "https://upb.ro" },
    { title: "Gala Absolvenților", daysAhead: 40, link: "https://upb.ro" },
    { title: "Hackathon Politehnica", daysAhead: 52, link: "https://upb.ro" },
  ];

  for (const [i, event] of events.entries()) {
    await payload.create({
      collection: "events",
      data: {
        title: event.title,
        banner: mediaIds[i % mediaIds.length],
        link: event.link,
        eventDate: new Date(now + event.daysAhead * day).toISOString(),
      },
      overrideAccess: true,
    });
  }

  console.log(`Seeded ${events.length} events.`);
}

seedEvents()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
