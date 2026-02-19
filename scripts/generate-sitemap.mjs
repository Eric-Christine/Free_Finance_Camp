import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { curriculum } from '../src/data/curriculum.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUTPUT_PATH = resolve(ROOT, 'public', 'sitemap.xml');
const BASE_URL = 'https://freefinancecamp.com';
const lastmod = new Date().toISOString().slice(0, 10);

function xmlEscape(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
}

function buildUrlXml({ loc, changefreq, priority }) {
    return [
        '  <url>',
        `    <loc>${xmlEscape(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority.toFixed(1)}</priority>`,
        '  </url>'
    ].join('\n');
}

const staticPages = [
    { path: '/', changefreq: 'weekly', priority: 1.0 },
    { path: '/about', changefreq: 'monthly', priority: 0.7 },
    { path: '/privacy', changefreq: 'yearly', priority: 0.4 },
    { path: '/curriculum', changefreq: 'weekly', priority: 0.9 },
    { path: '/resources', changefreq: 'monthly', priority: 0.8 },
    { path: '/lessons', changefreq: 'weekly', priority: 0.9 }
];

const lessonPages = curriculum.flatMap((module) =>
    module.lessons.map((lesson) => ({
        path: `/lesson/${lesson.id}`,
        changefreq: 'monthly',
        priority: 0.8
    }))
);

const allPages = [...staticPages, ...lessonPages];
const urlEntries = allPages.map((page) => buildUrlXml({
    loc: `${BASE_URL}${page.path}`,
    changefreq: page.changefreq,
    priority: page.priority
})).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

await writeFile(OUTPUT_PATH, xml, 'utf8');
console.log(`Generated sitemap with ${allPages.length} URLs at ${OUTPUT_PATH}`);
