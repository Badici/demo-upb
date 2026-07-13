import fs from "fs";
import path from "path";
import config from "@payload-config";

import { getPayload } from "payload";

async function seedAnnouncements() {
  const payload = await getPayload({ config });
  const filePath = path.resolve(process.cwd(), "public/poza-rectorat-hd.jpeg");
  const buffer = fs.readFileSync(filePath);

  const existing = await payload.find({
    collection: "announcements",
    limit: 1,
    overrideAccess: true,
  });

  if (existing.totalDocs > 0) {
    console.log("Announcements already seeded.");
    return;
  }

  const media = await payload.create({
    collection: "media",
    data: { alt: "Banner anunț admitere UNST Politehnica București" },
    file: {
      data: buffer,
      mimetype: "image/jpeg",
      name: "announcement-banner.jpeg",
      size: buffer.length,
    },
    overrideAccess: true,
  });

  const now = new Date();
  const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const end = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

  await payload.create({
    collection: "announcements",
    data: {
      title: "Descoperă programele de admitere 2026",
      banner: media.id,
      link: {
        type: "internal",
        internalPath: "/ro/admitere",
      },
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    },
    overrideAccess: true,
  });

  await payload.create({
    collection: "announcements",
    data: {
      title: "Centrul Universitar Pitești — informații pentru studenți",
      banner: media.id,
      link: {
        type: "external",
        externalUrl: "https://upb.ro",
      },
      startDate: start.toISOString(),
      endDate: end.toISOString(),
    },
    overrideAccess: true,
  });

  console.log("Seeded 2 announcements.");
}

seedAnnouncements()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
