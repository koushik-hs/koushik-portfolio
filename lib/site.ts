export const github = 'https://github.com/koushik-hs';

function httpsUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url : undefined;
  } catch {
    return undefined;
  }
}

const vercelOrigin = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = httpsUrl(process.env.SITE_URL)?.origin
  ?? httpsUrl(vercelOrigin && `https://${vercelOrigin}`)?.origin;
export const resumeUrl = httpsUrl(process.env.RESUME_URL)?.href ?? '/resume.pdf';
const configuredEmail = process.env.CONTACT_EMAIL?.trim();
export const contactEmail = configuredEmail && /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(configuredEmail)
  ? configuredEmail : 'koushikhsbhat02@gmail.com';
export const emailLink = `mailto:${contactEmail}`;
export const siteDescription = 'Koushik HS builds backend systems and explores what happens when software leaves the happy path.';
