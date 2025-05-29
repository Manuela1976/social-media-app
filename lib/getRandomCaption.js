import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import stripBomStream from 'strip-bom-stream';

export async function getRandomCaption(category) {
  const results = [];
  const filePath = path.join(process.cwd(), 'data', 'captions.csv');

  console.log('⏳ Lese CSV-Datei:', filePath);
  console.log('👉 Gewünschte Kategorie:', category);

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath, { encoding: 'utf8' })
      .pipe(stripBomStream())
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        console.log('📄 Gelesene Zeile:', data);

        const kategorie = data.Kategorie?.trim().toLowerCase();
        const caption = data['Caption']?.trim();

        if (kategorie === category.toLowerCase()) {
          console.log('✅ Treffer gefunden:', caption);
          results.push(caption);
        }
      })
      .on('end', () => {
        console.log('📦 Alle passenden Captions:', results);
        if (results.length === 0) return reject('Keine Caption gefunden');
        const random = results[Math.floor(Math.random() * results.length)];
        console.log('🎯 Zufällig ausgewählte Caption:', random);
        resolve(random);
      })
      .on('error', (err) => {
        console.error('❌ Fehler beim Lesen:', err);
        reject(err);
      });
  });
}
