import React, { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [lyricist, setLyricist] = useState('');
  const [composer, setComposer] = useState('');
  const [singer, setSinger] = useState('');
  const [lyrics, setLyrics] = useState('');

  const handleGenerate = async () => {
    const response = await fetch('https://lyrics-backend-dzxb.onrender.com/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, lyricist, composer, singer, lyrics }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title || 'lyrics'}.pptx`;
      a.click();
      a.remove();
    } else {
      alert('生成失敗，請確認伺服器是否啟動');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">🎤 粵語歌詞 PPT 生成器</h1>

      <input
        className="w-full max-w-2xl mb-4 p-3 text-black rounded"
        placeholder="歌名（必填）"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-4">
        <input
          className="flex-1 p-3 text-black rounded"
          placeholder="作詞"
          value={lyricist}
          onChange={(e) => setLyricist(e.target.value)}
        />
        <input
          className="flex-1 p-3 text-black rounded"
          placeholder="作曲"
          value={composer}
          onChange={(e) => setComposer(e.target.value)}
        />
      </div>

      <input
        className="w-full max-w-2xl mb-4 p-3 text-black rounded"
        placeholder="演唱者"
        value={singer}
        onChange={(e) => setSinger(e.target.value)}
      />

      <textarea
        className="w-full max-w-2xl h-80 p-4 text-black rounded"
        placeholder="請貼上歌詞（繁體）"
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
      />

      {title && (
        <button
          onClick={() => {
            const query = encodeURIComponent(`${title} ${singer} site:kkbox.com`);
            window.open(`https://www.bing.com/search?q=${query}`, '_blank');
          }}
          className="mt-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          🔍 去 KKBOX 搜索歌詞（必应）
        </button>
      )}


      <button
        onClick={handleGenerate}
        className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-300 transition"
      >
        生成 PPT
      </button>
    </div>
  );
}

export default App;
