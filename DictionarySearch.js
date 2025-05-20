import React, { useState } from 'react';
import './DictionarySearch.css'; // 👈 CSS in a separate file

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
      console.log(result); // Check API response

      if (result && result.definition) {
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
      <div className="bubbles"></div>
      <h1>Dictionary Search</h1>
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
          <p><strong>Definition:</strong> {data.definition}</p>
          {data.partOfSpeech && (
            <p><strong>Part of Speech:</strong> {data.partOfSpeech}</p>
          )}
          {data.phonetics && (
            <p><strong>Phonetics:</strong> {data.phonetics}</p>
          )}
          {data.example && (
            <p><strong>Example:</strong> {data.example}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DictionarySearch;
