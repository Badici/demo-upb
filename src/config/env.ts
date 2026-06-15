export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contentProvider: process.env.CONTENT_PROVIDER ?? "mock",
  mediaProvider: process.env.MEDIA_PROVIDER ?? "mock",
} as const;
