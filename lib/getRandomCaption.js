import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export async function getRandomCaption(category) {
  const results = [];
  const filePath = path.join(process.cwd(), 'data', 'captions.csv');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        if (data.Kategorie === category) {
          results.push(data.Caption);
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
