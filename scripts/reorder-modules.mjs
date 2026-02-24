/**
 * Reorder modules in curriculum.js without modifying any content.
 *
 * Strategy: read the file as text, split into module blocks by their
 * top-level position in the exported array, identify each block by its
 * `id:` field, then reassemble in the desired order.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CURRICULUM_PATH = resolve(__dirname, '../src/data/curriculum.js');

// Desired module order (by module id)
const DESIRED_ORDER = [
    'module-1',              // 1.  The Wealth Mindset
    'module-2',              // 2.  Budgeting & Saving
    'module-10',             // 3.  Banking & Financial Institutions
    'module-15',             // 4.  Emergency Funds & Financial Resilience
    'module-6',              // 5.  Credit & Debt
    'module-22',             // 6.  Consumer Protection, Scams & Identity Theft
    'module-3',              // 7.  Investing 101
    'module-roth-ira',       // 8.  Roth IRA Mastery
    'module-401k',           // 9.  401(k) Master Plan
    'module-21',             // 10. Budgeting Systems & Cash-Flow Automation
    'module-14',             // 11. Salary Negotiation & Career Finance
    'module-12',             // 12. Taxes: What You Need to Know
    'module-13',             // 13. Student Loans & Education ROI
    'module-5',              // 14. Insurance Essentials
    'module-4',              // 15. Big Purchases: Cars
    'module-11',             // 16. Homebuying & Mortgages
    'module-7',              // 17. Investing 201: The Deep End
    'module-26',             // 18. Investing 301: Evaluating What You Buy
    'module-8',              // 19. The Economic Machine
    'module-16',             // 20. The Fed, Rates, and the Real Economy
    'module-9',              // 21. Future Finance
    'module-24',             // 22. Small Business / Freelancer Finance
    'module-kids-finances',  // 23. Investing in Your Kids
    'module-23',             // 24. Estate Planning & Legacy Basics
    'module-25',             // 25. Retirement Drawdown & Decumulation
    'module-17',             // 26. Wealth & Impact
];

const src = readFileSync(CURRICULUM_PATH, 'utf-8');

// ── Split file into: header, module blocks, footer ──────────────────────

// Find the opening bracket of `export const curriculum = [`
const arrayStartMatch = src.match(/^export\s+const\s+curriculum\s*=\s*\[/m);
if (!arrayStartMatch) {
    console.error('Could not find `export const curriculum = [` in file');
    process.exit(1);
}
const headerEnd = arrayStartMatch.index + arrayStartMatch[0].length;
const header = src.slice(0, headerEnd); // everything up to and including `[`

// Find the matching closing `];` — it's the last one in the file
const closingIndex = src.lastIndexOf('];');
if (closingIndex === -1) {
    console.error('Could not find closing `];`');
    process.exit(1);
}
const footer = src.slice(closingIndex); // `];` plus anything after

const arrayBody = src.slice(headerEnd, closingIndex);

// ── Parse module blocks ─────────────────────────────────────────────────
// Each top-level module object starts with `    {` (4-space indent) at
// the start of a line and we need to find matching closing `    },` or
// `    }` blocks.  We track brace depth to handle nested objects.

const modules = [];
let current = null;
let depth = 0;

const lines = arrayBody.split('\n');

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (depth === 0) {
        // Look for the start of a new top-level object
        if (/^    \{/.test(line)) {
            current = { startLine: i, lines: [line] };
            depth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
            if (depth <= 0) {
                // Single-line object (unlikely but handle it)
                current.endLine = i;
                modules.push(current);
                current = null;
                depth = 0;
            }
        }
        // Otherwise it's whitespace / commas between modules — ignore
    } else {
        current.lines.push(line);
        depth += (line.match(/\{/g) || []).length;
        depth -= (line.match(/\}/g) || []).length;
        if (depth <= 0) {
            current.endLine = i;
            modules.push(current);
            current = null;
            depth = 0;
        }
    }
}

console.log(`Found ${modules.length} module blocks`);

// ── Identify each block by its id field ─────────────────────────────────

const moduleMap = new Map();
for (const mod of modules) {
    const text = mod.lines.join('\n');
    const idMatch = text.match(/id:\s*'([^']+)'/);
    if (!idMatch) {
        console.error('Could not find id in module block starting at line', mod.startLine);
        console.error(mod.lines.slice(0, 5).join('\n'));
        process.exit(1);
    }
    mod.id = idMatch[1];
    moduleMap.set(mod.id, mod);
    console.log(`  [${mod.id}] — ${mod.lines.length} lines`);
}

// ── Validate desired order ──────────────────────────────────────────────

for (const id of DESIRED_ORDER) {
    if (!moduleMap.has(id)) {
        console.error(`Desired order references unknown module: ${id}`);
        process.exit(1);
    }
}
if (DESIRED_ORDER.length !== modules.length) {
    const missing = modules.filter(m => !DESIRED_ORDER.includes(m.id)).map(m => m.id);
    console.error(`Module count mismatch. Missing from desired order: ${missing.join(', ')}`);
    process.exit(1);
}

// ── Reassemble ──────────────────────────────────────────────────────────

const reorderedBlocks = DESIRED_ORDER.map(id => {
    const mod = moduleMap.get(id);
    let text = mod.lines.join('\n');
    // Ensure block ends with a comma (for all but last)
    return text;
});

// Make sure each block (except the last) ends with a trailing comma
const finalBlocks = reorderedBlocks.map((block, i) => {
    const trimmed = block.trimEnd();
    if (i < reorderedBlocks.length - 1) {
        // Needs trailing comma
        if (!trimmed.endsWith(',')) {
            return trimmed + ',';
        }
    } else {
        // Last block — remove trailing comma if present
        if (trimmed.endsWith(',')) {
            return trimmed.slice(0, -1);
        }
    }
    return trimmed;
});

const newBody = '\n' + finalBlocks.join('\n') + '\n';
const output = header + newBody + footer;

writeFileSync(CURRICULUM_PATH, output, 'utf-8');
console.log(`\nDone! Reordered ${modules.length} modules in ${CURRICULUM_PATH}`);
