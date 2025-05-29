import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCaption = async () => {
    setLoading(true);
    const res = await fetch('/api/generate-post');
    const json = await res.json();

    const imageUrl = `/images/${json.category}/1.jpg`; // statisch – kann später zufällig werden
    setData({ ...json, imageUrl });
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (data) {
      const text = `${data.caption}\n\n${data.hashtags}`;
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📸 Instagram-Post Generator</h1>

      <button onClick={loadCaption} disabled={loading} style={{ marginTop: '1rem' }}>
        {loading ? 'Lade...' : 'Neue Caption generieren'}
      </button>

      {data && (
        <div style={{ marginTop: '2rem' }}>
          <p><strong>Kategorie:</strong> {data.category}</p>
          <p><strong>Caption:</strong><br />{data.caption}</p>
          <p><strong>Hashtags:</strong><br />{data.hashtags}</p>
          <img src={data.imageUrl} alt={data.category} style={{ maxWidth: '100%', marginTop: '1rem' }} />
          <button onClick={copyToClipboard} style={{ marginTop: '1rem' }}>
            Alles kopieren 📋
          </button>
        </div>
      )}
    </main>
  );
}
