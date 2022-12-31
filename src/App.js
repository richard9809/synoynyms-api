import { useState } from 'react';
import { DATAMUSE_API_URL } from './api';
import './App.css';

function App() {
  const [word, setWord] = useState("")
  const [synonyms, setSynonyms] = useState([])

  const handleChange = (e) => {
    setWord(e.target.value);
  }

  const fetchSynonym = (word) => {
    fetch(`${DATAMUSE_API_URL}/words?rel_syn=${word}`)
          .then((response) => response.json())
          .then(setSynonyms);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSynonym(word);
  };

  const handleSynonymClicked = (newWord) => {
    setWord(newWord);
    fetchSynonym(newWord);
  }

  // const fetchSynonym = (word) => {
  //   return fetch(`${DATAMUSE_API_URL}/words?rel_syn=${word}`)
  // }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="search" 
            className='search-bar' 
            placeholder='Search for synonyms' 
            value={word} 
            onChange={handleChange} 
        />

        <button className='btn'>Submit</button>
      </form>

      <ul className='list'>
        {synonyms.map(synonym => (
          <li key={synonym.word} onClick={() => handleSynonymClicked(synonym.word)}>{synonym.word}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
