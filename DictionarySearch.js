import React, { useState } from 'react';
import './DictionarySearch.css';

const DictionarySearch = () => {
  const [word, setWord] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!word.trim()) {
      setError('Please enter a word.');
      return;
    }

    setLoading(true);
    setError('');
    setData(null);

    const apiKey = '16f7c477d4dao63td086a628b0b233a9';
    const url = `https://api.shecodes.io/dictionary/v1/define?word=${word}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);

      if (result && result.word && result.definitions && result.definitions.length > 0) {
        setData(result);
      } else if (result.message) {
        setError(result.message);
      } else {
        setError('No definition found.');
      }
    } catch (err) {
      setError('Error fetching data: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="bubble" style={{ left: `${Math.random() * 100}%`, animationDuration: `${5 + Math.random() * 5}s`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
      </div>
      <h1>🌈 Dictionary Search</h1>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="definition">
          <h2>{data.word}</h2>
          <p><strong>Definition:</strong> {data.definitions[0].definition}</p>
          {data.definitions[0].partOfSpeech && (
            <p><strong>Part of Speech:</strong> {data.definitions[0].partOfSpeech}</p>
          )}
          {data.definitions[0].example && (
            <p><strong>Example:</strong> {data.definitions[0].example}</p>
          )}
          {data.phonetic && (
            <p><strong>Phonetics:</strong> {data.phonetic}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DictionarySearch;

