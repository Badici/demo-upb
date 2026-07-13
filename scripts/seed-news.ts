import fs from "fs";
import path from "path";
import config from "@payload-config";
import { getPayload } from "payload";

function textNode(text: string) {
  return {
    type: "text",
    text,
    format: 0,
    style: "",
    mode: "normal",
    detail: 0,
    version: 1,
  };
}

function paragraph(text: string) {
  return {
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function heading(text: string, tag: "h2" | "h3" = "h2") {
  return {
    type: "heading",
    tag,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function list(items: string[]) {
  return {
    type: "list",
    listType: "bullet",
    tag: "ul",
    start: 1,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: items.map((item, i) => ({
      type: "listitem",
      value: i + 1,
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: [textNode(item)],
    })),
  };
}

function richText(nodes: object[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: nodes,
    },
  };
}

async function seedNews() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "news",
    limit: 1,
    overrideAccess: true,
  });

  if (existing.totalDocs > 0) {
    console.log("News already seeded.");
    return;
  }

  const images = ["poza-rectorat-hd.jpeg", "poza-rectorat-drona.jpg"];
  const mediaIds: number[] = [];

  for (const [i, name] of images.entries()) {
    const buffer = fs.readFileSync(path.resolve(process.cwd(), "public", name));
    const media = await payload.create({
      collection: "media",
      data: { alt: `Imagine știre ${i + 1} — Politehnica București` },
      file: {
        data: buffer,
        mimetype: "image/jpeg",
        name: `news-${i + 1}.jpeg`,
        size: buffer.length,
      },
      overrideAccess: true,
    });
    mediaIds.push(media.id as number);
  }

  const day = 24 * 60 * 60 * 1000;
  const now = Date.now();

  const items = [
    {
      title: "Politehnica București, în topul universităților tehnice europene",
      excerpt:
        "Universitatea urcă în clasamentele internaționale datorită rezultatelor din cercetare și inovare.",
      category: "cercetare",
      daysAgo: 1,
      content: richText([
        paragraph(
          "Universitatea Națională de Știință și Tehnică Politehnica București a obținut o nouă poziție de top în cel mai recent clasament al universităților tehnice din Europa, confirmând direcția strategică axată pe cercetare și inovare.",
        ),
        heading("Rezultate remarcabile în cercetare"),
        paragraph(
          "Echipele de cercetare au publicat peste 3.000 de articole indexate în ultimul an, iar numărul de brevete a crescut semnificativ față de perioada anterioară.",
        ),
        list([
          "Peste 40 de proiecte europene active",
          "Colaborări cu parteneri industriali de top",
          "Laboratoare modernizate în toate facultățile",
        ]),
        paragraph(
          "Acest rezultat reflectă efortul comun al cadrelor didactice, cercetătorilor și studenților implicați în proiecte de anvergură.",
        ),
      ]),
    },
    {
      title: "Admiterea 2026: calendar și noutăți pentru candidați",
      excerpt:
        "Au fost publicate calendarul admiterii și programele de studiu disponibile pentru anul universitar 2026-2027.",
      category: "admitere",
      daysAgo: 3,
      content: richText([
        paragraph(
          "Sesiunea de admitere 2026 aduce mai multe programe noi de licență și masterat, precum și un proces de înscriere complet digitalizat.",
        ),
        heading("Etape importante"),
        list([
          "Înscrieri online: iulie 2026",
          "Afișarea rezultatelor: sfârșitul lunii iulie",
          "Confirmarea locurilor: începutul lunii august",
        ]),
        paragraph(
          "Candidații sunt încurajați să consulte site-ul fiecărei facultăți pentru detalii specifice legate de probele de concurs.",
        ),
      ]),
    },
    {
      title: "Ziua Carierei: peste 100 de companii pe campus",
      excerpt:
        "Cel mai mare târg de joburi tehnice din țară revine în campusul Politehnica cu oportunități pentru studenți și absolvenți.",
      category: "evenimente",
      daysAgo: 6,
      content: richText([
        paragraph(
          "Ziua Carierei aduce în campus companii din domeniile IT, energie, auto și inginerie, oferind studenților acces direct la oportunități de internship și angajare.",
        ),
        paragraph(
          "Pe lângă standurile companiilor, participanții vor putea lua parte la workshop-uri, sesiuni de CV și interviuri pe loc.",
        ),
      ]),
    },
    {
      title: "Parteneriat strategic cu industria auto",
      excerpt:
        "Un nou laborator de cercetare dedicat mobilității electrice va fi deschis în colaborare cu parteneri din industrie.",
      category: "parteneriate",
      daysAgo: 10,
      content: richText([
        paragraph(
          "Politehnica București anunță un parteneriat strategic pentru dezvoltarea unui laborator dedicat mobilității electrice și sistemelor autonome.",
        ),
        heading("Ce presupune colaborarea"),
        list([
          "Burse pentru studenți",
          "Proiecte de cercetare aplicată",
          "Acces la echipamente de ultimă generație",
        ]),
        paragraph(
          "Laboratorul va deveni operațional în următorul an universitar și va găzdui proiecte comune între studenți și ingineri din industrie.",
        ),
      ]),
    },
    {
      title: "Studenții Politehnicii, premiați la competiții internaționale",
      excerpt:
        "Echipe de studenți au obținut premii importante la concursuri de robotică și programare din străinătate.",
      category: "studenti",
      daysAgo: 14,
      content: richText([
        paragraph(
          "Studenții Politehnicii au demonstrat din nou excelență la nivel internațional, obținând locuri fruntașe la competiții de robotică și programare.",
        ),
        paragraph(
          "Rezultatele confirmă calitatea pregătirii și implicarea studenților în activități extracurriculare de performanță.",
        ),
      ]),
    },
    {
      title: "Investiții în infrastructura de învățământ",
      excerpt:
        "Noi spații de studiu și laboratoare modernizate sunt disponibile începând cu acest an universitar.",
      category: "general",
      daysAgo: 20,
      content: richText([
        paragraph(
          "Universitatea continuă programul amplu de modernizare a infrastructurii, cu accent pe spații de studiu colaborative și laboratoare dotate cu tehnologie modernă.",
        ),
        paragraph(
          "Aceste investiții susțin obiectivul de a oferi studenților un mediu de învățare la standarde europene.",
        ),
      ]),
    },
  ];

  for (const [i, item] of items.entries()) {
    await payload.create({
      collection: "news",
      data: {
        title: item.title,
        excerpt: item.excerpt,
        coverImage: mediaIds[i % mediaIds.length],
        category: item.category,
        publishedAt: new Date(now - item.daysAgo * day).toISOString(),
        content: item.content,
      },
      overrideAccess: true,
    });
  }

  console.log(`Seeded ${items.length} news items.`);
}

seedNews()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
