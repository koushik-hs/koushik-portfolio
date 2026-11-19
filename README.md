# CONTROL / CHAOS

Koushik HS’s portfolio, migrated from the Motion V2 prototype to Next.js App Router and TypeScript. It carries over the obsidian, vermilion, and ivory palette, the three supplied photographs, the scroll-to-print opening, the floating project index, and the About disclosure.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build and verification

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

For a production-build browser test, run the following after the build. Playwright starts Next.js on port 3167 and runs against Chromium.

The production build explicitly uses Webpack (`next build --webpack`) because the supplied Next.js version's Turbopack CSS worker failed during local production verification. This changes the build tool only; the existing styles, fonts, responsive layouts, and animation code are unchanged.

```sh
npx playwright install chromium
npm run test:e2e
```

The suite checks scroll interpolation and reversal at five viewport sizes, keyboard mobile navigation, the photo disclosure, the gallery rail, all four case-study routes, the 404, optimized media, Open Graph metadata, résumé delivery and email links, and reduced-motion accessibility with axe. `CHROMIUM_EXECUTABLE` optionally points to a local Chromium executable for tests.

## Configuration

All variables are optional at build time. Copy `.env.example` to `.env.local` to set them locally.

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Canonical HTTPS origin for public pages and social previews. Vercel’s production-domain variable supplies a fallback on Vercel if system variables are exposed. |
| `CONTACT_EMAIL` | Overrides the default public contact email. |
| `RESUME_URL` | Optional HTTPS URL that overrides the bundled résumé. |

The supplied résumé is included at `public/resume.pdf` and served by the site. It contains the contact details printed on the PDF. Environment overrides are read at build time.

## Deploy on Vercel

1. Push this source to a Git repository and import it under **Add New → Project** in Vercel.
2. Choose the **Next.js** framework preset and the directory containing `package.json` (`control-chaos` when importing its parent folder). Node.js 24 LTS was used for local verification. Keep the default install, build, and output settings; Vercel uses the package build script and supports the Next.js Image optimizer. No `vercel.json` is needed.
3. The Vercel production-domain system variable supplies the site origin automatically. Optionally add `SITE_URL` for an explicit production/custom domain, or when system environment variables are disabled. Set the optional contact overrides only if needed.
4. Deploy and verify the preview and production URLs. Check the project routes, inspect the Open Graph image, and confirm the résumé opens as a PDF.
5. If the public domain changes, update `SITE_URL` and redeploy.

[Vercel’s Next.js deployment guide](https://vercel.com/docs/frameworks/full-stack/nextjs)

## Source structure

| Path | Purpose |
| --- | --- |
| `app/` | App Router pages, shared layout, metadata, and global styles |
| `components/` | Navigation, opening scenes, motion, project prints, About, and contact |
| `lib/projects.ts` | Case-study content, diagram stages, and repository links |
| `lib/site.ts` | Public environment configuration |
| `assets/` | Three optimized local photographs, without embedded metadata |
| `public/` | Shared social preview and supplied résumé PDF |
| `tests/` | Production-build browser tests |

The opening uses a sticky viewport and a passive scroll listener. A single animation frame interpolates the photo frame and phase values from the current scroll position. Without JavaScript or with reduced motion, the two scenes appear in document order. The About reveal uses native disclosure semantics. Tailwind utilities handle straightforward layout, with custom CSS for the editorial layouts and motion.

ZeroTrust Workspace, NexusGuard AI, and the MITM lab pages use their repository documentation and selected source files. Diagrams simplify a specific path through each system. ReflexXDR is based on the public README, architecture notes, and source. The case study distinguishes the live rule-based monitoring path from the neural research model. NexusGuard’s evaluation used synthetic data. No performance claims from those projects are presented as production results.

## Verification completed

Production preparation on 20 November 2026 used Node.js 24.11.0. `npm run build`, `npm run typecheck`, and `npm run lint` passed. `npm audit` reported zero known vulnerabilities. Manifest and lockfile versions match, and the lockfile includes the Linux native dependencies needed on Vercel. The GitHub profile, four repository links, and nine linked source files returned HTTP 200.

All eight production browser tests passed using local Chrome via `CHROMIUM_EXECUTABLE`. They verify reversible scroll animation at 1440×900, 820×1180, 390×844, 320×568, and 844×390; mobile keyboard navigation; all three optimized photographs; project artwork; section navigation; all four case pages and next-case links; the favicon and social image; résumé PDF delivery; 404 behavior; and reduced-motion accessibility. The axe scans found no violations on the tested home and ZeroTrust pages. Browser tests required execution outside the local sandbox so the test server and browser could communicate.

The supplied source files contain no detected credential patterns or unnecessary private files. This folder has no `.git` directory, so tracked files and commit history could not be audited. The bundled public résumé intentionally contains contact details. `.gitignore` excludes dependencies, build outputs, local environment files, Vercel state, test artifacts, logs, and common private-key files.

## Remaining verification and assets

- Revisit ReflexXDR’s model metrics once the reported results are tied to a checkpoint and dataset split.
- Test on physical touch devices and Safari/Firefox. Measure Core Web Vitals after deployment. The Chromium checks are local and no Lighthouse score is claimed.
- Audit the actual repository's tracked files and history before publishing; this supplied folder has no Git metadata. No deployment or publication was performed during this preparation.
