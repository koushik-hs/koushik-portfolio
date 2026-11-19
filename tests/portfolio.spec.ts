import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const cases = [
  ['ZeroTrust Workspace', 'zerotrust-workspace'],
  ['NexusGuard AI', 'nexusguard-ai'],
  ['ReflexXDR', 'reflexxdr'],
  ['Man-in-the-Middle Lab', 'man-in-the-middle-lab'],
];

async function scrollToProgress(page: Page, progress: number) {
  await page.locator('.opening').evaluate((opening, value) => {
    const pin = opening.querySelector<HTMLElement>('.opening-pin');
    if (pin) scrollTo({ top: (opening.clientHeight - pin.clientHeight) * value, behavior: 'instant' });
  }, progress);
}

const viewports = [
  { width: 1440, height: 900 },
  { width: 820, height: 1180 },
  { width: 390, height: 844 },
  { width: 320, height: 568 },
  { width: 844, height: 390 },
];

for (const viewport of viewports) {
  test(`hero transforms reversibly at ${viewport.width} × ${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    const opening = page.locator('.opening');
    await expect(opening).toHaveAttribute('data-motion', '');
    const stage = opening.locator('.opening-stage');
    const startingBox = await stage.boundingBox();
    expect(startingBox).not.toBeNull();
    await expect(opening.locator('.opening-next')).toHaveCSS('opacity', '0');
    await expect(page.getByRole('link', { name: 'Explore my work' })).toBeInViewport();

    await scrollToProgress(page, .45);
    await expect.poll(async () => (await stage.boundingBox())!.width).toBeLessThan(startingBox!.width * .9);
    const midBox = await stage.boundingBox();
    await scrollToProgress(page, .93);
    await expect(opening.locator('.opening-next')).toHaveCSS('opacity', '1');
    await expect.poll(async () => (await stage.boundingBox())!.width).toBeLessThan(midBox!.width);
    await scrollToProgress(page, .45);
    await expect.poll(async () => (await stage.boundingBox())!.width).toBeCloseTo(midBox!.width);
    await scrollToProgress(page, 0);
    await expect(opening.locator('.opening-next')).toHaveCSS('opacity', '0');
    await expect.poll(async () => (await stage.boundingBox())!.width).toBeCloseTo(startingBox!.width);

    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
    expect(errors).toEqual([]);
  });
}

test('mobile navigation, scrollable prints, and the keyboard photo disclosure', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveCount(0);
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();

  await menu.press('Enter');
  await page.getByRole('navigation').getByRole('link', { name: 'About' }).press('Enter');
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator('#about')).toBeFocused();
  const reveal = page.getByText('A less serious side', { exact: true });
  await reveal.click();
  const photo = page.getByAltText('Koushik reaching toward the camera against a blue sky');
  await expect(photo).toBeVisible();
  await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await page.locator('.gesture summary').press('Enter');
  await expect(photo).toBeHidden();

  const prints = page.locator('.project-prints');
  await prints.evaluate((rail) => rail.scrollTo({ left: rail.scrollWidth, behavior: 'instant' }));
  await expect.poll(() => prints.evaluate((rail) => rail.scrollLeft)).toBeGreaterThan(100);
});

test('four case routes, local media, social metadata, and résumé links', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/og\.jpg$/);
  expect((await request.get('/og.jpg')).ok()).toBe(true);
  const hero = page.getByAltText('Koushik HS beside a weathered industrial window');
  await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  expect(await hero.getAttribute('src')).toContain('/_next/image');
  const aboutPhoto = page.getByAltText('Koushik in a cream shirt at sunset');
  await aboutPhoto.scrollIntoViewIfNeeded();
  await expect.poll(() => aboutPhoto.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator('.project-prints .project-art svg')).toHaveCount(4);
  expect((await request.get('/icon.svg')).ok()).toBe(true);

  for (const section of ['Work', 'About', 'Contact']) {
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: section, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${section.toLowerCase()}$`));
    await expect(page.locator(`#${section.toLowerCase()}`)).toHaveCount(1);
  }
  for (const [name, slug] of cases) {
    await page.locator('.project-prints').getByRole('link', { name: new RegExp(name) }).click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}$`));
    await expect(page.getByRole('heading', { name: `${name}.`, level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Architecture/ })).toBeVisible();
    await expect(page.getByRole('link', { name: 'View repository' })).toBeVisible();
    if (slug === 'reflexxdr') {
      await expect(page.getByText(/neural detector inactive/)).toBeVisible();
      await expect(page.getByRole('link', { name: 'Evaluation report' })).toBeVisible();
    }
    await page.getByRole('link', { name: /Next case study/ }).click();
    const nextSlug = cases[(cases.findIndex((item) => item[1] === slug) + 1) % cases.length][1];
    await expect(page).toHaveURL(new RegExp(`/work/${nextSlug}$`));
    await page.getByRole('link', { name: 'Selected work' }).click();
    await expect(page).toHaveURL(/#work$/);
  }
  const contact = page.locator('#contact');
  await expect(contact.getByRole('link', { name: 'koushikhsbhat02@gmail.com' })).toHaveAttribute('href', 'mailto:koushikhsbhat02@gmail.com');
  await expect(contact.getByRole('link', { name: 'View résumé' })).toHaveAttribute('href', '/resume.pdf');
  await expect(page.locator('#about').getByRole('link', { name: 'View résumé' })).toHaveAttribute('href', '/resume.pdf');
  const resume = await request.get('/resume.pdf');
  expect(resume.ok()).toBe(true);
  expect(resume.headers()['content-type']).toContain('application/pdf');
  expect((await resume.body()).subarray(0, 5).toString()).toBe('%PDF-');
  expect((await request.get('/assets/resume.pdf')).status()).toBe(404);
  expect((await page.goto('/work/unknown'))?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Off the happy path.' })).toBeVisible();
});

test('reduced motion and automated accessibility scan', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.opening')).not.toHaveAttribute('data-motion', '');
  await expect(page.locator('.opening-stage')).toHaveCSS('transform', 'none');
  await expect(page.locator('.opening-next')).toHaveCSS('opacity', '1');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.goto('/work/zerotrust-workspace');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
