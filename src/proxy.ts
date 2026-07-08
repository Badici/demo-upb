import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the "middleware" file convention to "proxy".
export default createMiddleware(routing);

export const config = {
  // Run on all paths except Payload (admin/api), Next internals, and files with an extension.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
