import sharp from 'sharp';
await sharp('public/finance-camp-og.svg').png().toFile('public/finance-camp-og.png');
