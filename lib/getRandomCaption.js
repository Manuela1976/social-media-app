import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export async function getRandomCaption(category) {
  const results = [];
  const filePath = path.join(process.cwd(), 'data', 'captions.csv');

  console.log('Kategorie angefordert:', category);

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        console.log('Gelesene Zeile:', data); // ← das wollen wir sehen

        const aktuelleKategorie = data.Kategorie?.trim().toLowerCase();
        const gewählteKategorie = category.toLowerCase();

        if (aktuelleKategorie === gewählteKategorie) {
          console.log('Treffer:', data['Caption']);
          results.push(data['Caption']?.trim());
        }
      })
      .on('end', () => {
        console.log('Gefundene Captions:', results);
        if (results.length === 0) return reject('Keine Caption gefunden');
        const random = results[Math.floor(Math.random() * results.length)];
        resolve(random);
      })
      .on('error', reject);
  });
}
