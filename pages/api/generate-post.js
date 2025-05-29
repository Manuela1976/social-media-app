import { getRandomCaption } from '@/lib/getRandomCaption';

export default async function handler(req, res) {
  const categories = [
    'Portrait',
    'Erotik',
    'Familienshooting',
    'Newborn',
    'Pärchen und Freunde',
    'Faces',
    'Business',
    'Hinter den Kulissen'
  ];

  const category = categories[Math.floor(Math.random() * categories.length)];

  try {
    const caption = await getRandomCaption(category);

    const hashtags = `#${category.toLowerCase().replace(/ /g, '')} #fotografie #wismar`;

    res.status(200).json({
      category,
      caption,
      hashtags,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
