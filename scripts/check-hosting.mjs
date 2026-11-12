import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = process.env.HOSTING_URL || 'http://127.0.0.1:5187';
for (const [path, status, title] of [
    ['/', 200, 'Free'],
    ['/tools/CoastFireCalculator', 200, 'Coast FIRE Calculator'],
    ['/tools/FourOhOneKCalculator', 200, '401(k) Contribution Calculator'],
    ['/lesson/lesson-1-1', 200, 'Free Finance Camp'],
    ['/missing-audit-page', 404, 'Page Not Found'],
    ['/tools/missing-audit-tool', 404, 'Page Not Found'],
    ['/lesson/missing-audit-lesson', 404, 'Page Not Found']
]) {
    const response = await fetch(base + path);
    assert.equal(response.status, status, path);
    assert.equal(new URL(response.url).pathname, path, `${path}: unexpected redirect`);
    const html = await response.text();
    assert.ok(html.includes(title), `${path}: missing title`);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.ok(response.headers.get('content-security-policy').includes("frame-ancestors 'self'"));
    if (status === 404) assert.ok(html.includes('noindex, follow'));
    const asset = html.match(/src="(\/assets\/[^" ]+\.js)"/);
    if (asset && path === '/') {
        const js = await fetch(base + asset[1]);
        assert.ok(js.headers.get('cache-control').includes('immutable'));
    }
    console.log(`${status} ${path}: static HTML and headers passed`);
}
assert.equal((await fetch(base + '/map')).status, 200);
assert.equal((await fetch(base + '/finance-camp-og.png')).headers.get('content-type'), 'image/png');

const browser = await chromium.launch();
try {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    // A stalled sign-in service must not hide public content.
    await context.route('**/*supabase.co/**', () => {});
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/tools/CoastFireCalculator');
    await page.getByRole('heading', { level: 1, name: 'Coast FIRE Calculator' }).waitFor();
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('h1').count(), 1);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.getByRole('link', { name: '← Tools', exact: true }).click();
    await page.getByRole('heading', { level: 1 }).waitFor();
    await page.waitForFunction(() => document.querySelector('link[rel="canonical"]').href === 'https://freefinancecamp.com/tools');
    await page.goto(base + '/map');
    await page.waitForURL('**/login');
    assert.deepEqual(errors, []);
    console.log('Mobile layout, stalled-auth public page, client navigation, private-route redirect passed');
} finally {
    await browser.close();
}
