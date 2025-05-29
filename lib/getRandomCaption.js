import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import stripBomStream from 'strip-bom-stream';

export async function getRandomCaption(category) {
  const results = [];
  const filePath = path.join(process.cwd(), 'data', 'captions.csv');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath, { encoding: 'utf8' })
      .pipe(stripBomStream())
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        if (data.Kategorie?.trim().toLowerCase() === category.toLowerCase()) {
          results.push(data['Caption']?.trim());
        }
      })
      .on('end', () => {
        if (results.length === 0) return reject('Keine Caption gefunden');
        const random = results[Math.floor(Math.random() * results.length)];
        resolve(random);
      })
      .on('error', reject);
  });
}
