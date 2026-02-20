import { useEffect } from 'react';

const SITE_NAME = 'Free Finance Camp';
const BASE_URL = 'https://freefinancecamp.com';
const DEFAULT_DESCRIPTION = 'Free, practical financial education on budgeting, investing, debt, and macroeconomics.';
const DEFAULT_IMAGE = '/finance-camp-og.svg';
const DEFAULT_IMAGE_ALT = 'Free Finance Camp preview image';

function absoluteUrl(path = '/') {
    if (!path.startsWith('/')) return `${BASE_URL}/${path}`;
    return `${BASE_URL}${path}`;
}

function upsertMeta(attr, key, content) {
    if (!content) return;
    let element = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
}

function upsertLink(rel, href) {
    let element = document.head.querySelector(`link[rel="${rel}"]`);
    if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
    }
    element.setAttribute('href', href);
}

export default function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    path = '/',
    image = DEFAULT_IMAGE,
    imageAlt = DEFAULT_IMAGE_ALT,
    type = 'website',
    noindex = false,
    jsonLd = null
}) {
    useEffect(() => {
        const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
        const canonical = absoluteUrl(path);
        const imageUrl = absoluteUrl(image);
        const robots = noindex ? 'noindex, follow' : 'index, follow';

        document.title = fullTitle;

        upsertMeta('name', 'description', description);
        upsertMeta('name', 'robots', robots);
        upsertMeta('name', 'googlebot', robots);
        upsertMeta('name', 'author', SITE_NAME);

        upsertMeta('property', 'og:type', type);
        upsertMeta('property', 'og:locale', 'en_US');
        upsertMeta('property', 'og:site_name', SITE_NAME);
        upsertMeta('property', 'og:title', fullTitle);
        upsertMeta('property', 'og:description', description);
        upsertMeta('property', 'og:url', canonical);
        upsertMeta('property', 'og:image', imageUrl);
        upsertMeta('property', 'og:image:alt', imageAlt);

        upsertMeta('name', 'twitter:card', 'summary_large_image');
        upsertMeta('name', 'twitter:title', fullTitle);
        upsertMeta('name', 'twitter:description', description);
        upsertMeta('name', 'twitter:url', canonical);
        upsertMeta('name', 'twitter:image', imageUrl);
        upsertMeta('name', 'twitter:image:alt', imageAlt);

        upsertLink('canonical', canonical);

        const scriptId = 'seo-json-ld';
        const existingScript = document.getElementById(scriptId);
        if (jsonLd) {
            const script = existingScript || document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.text = JSON.stringify(jsonLd);
            if (!existingScript) {
                document.head.appendChild(script);
            }
        } else if (existingScript) {
            existingScript.remove();
        }
    }, [title, description, path, image, imageAlt, type, noindex, jsonLd]);

    return null;
}
