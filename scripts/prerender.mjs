import { preview } from 'vite';
import { chromium } from 'playwright';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const output = resolve('dist');
const shell = await readFile(resolve(output, 'index.html'), 'utf8');
await writeFile(resolve(output, 'app.html'), shell);
const paths = [...(await readFile('public/sitemap.xml', 'utf8')).matchAll(/<loc>https:\/\/freefinancecamp.com([^<]*)<\/loc>/g)].map(match => match[1] || '/');
// Keep snapshots in memory until all routes have rendered from the same app shell.
const snapshots = [];
const server = await preview({ preview: { host: '127.0.0.1', port: 4175, strictPort: true } });
let browser;
try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
    const page = await context.newPage();
    page.setDefaultTimeout(120000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of [...paths, '/audit-not-found']) {
        errors.length = 0;
        await page.goto(`http://127.0.0.1:4175${path}`, { waitUntil: 'domcontentloaded', timeout: 120000 });
        await page.locator('#root h1').waitFor();
        await page.waitForFunction(() => !Array.from(document.querySelectorAll('[role="status"]')).some(el => /Loading/.test(el.textContent)));
        if (path !== '/audit-not-found') await page.waitForFunction(expected => document.querySelector('link[rel="canonical"]')?.href === expected, `https://freefinancecamp.com${path}`);
        await page.waitForTimeout(100);
        const result = await page.evaluate(() => ({
            headings: document.querySelectorAll('h1').length,
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            robots: document.querySelector('meta[name="robots"]')?.content,
            html: '<!doctype html>\n' + document.documentElement.outerHTML
        }));
        if (errors.length || result.headings !== 1) throw new Error(`${path}: ${result.headings} H1 headings; ${errors.join('; ')}`);
        if (path !== '/audit-not-found' && (result.canonical !== `https://freefinancecamp.com${path}` || result.robots !== 'index, follow')) throw new Error(`${path}: invalid index metadata`);
        if (path === '/audit-not-found' && !result.robots.startsWith('noindex')) throw new Error('404 must be noindex');
        snapshots.push([path, result.html]);
        if (snapshots.length % 25 === 0) console.log(`Validated ${snapshots.length} pages…`);
    }
    for (const [path, html] of snapshots) {
        const target = path === '/audit-not-found' ? resolve(output, '404.html') : resolve(output, `.${path}`, 'index.html');
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, html);
    }
    console.log(`Prerendered and validated ${paths.length} public pages plus 404.html.`);
} finally {
    await browser?.close();
    await new Promise(resolve => server.httpServer.close(resolve));
}
