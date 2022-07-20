import React, { useEffect } from 'react';
import { getCharacter } from './services/fetch-utils';
import { useState } from 'react';

export default function Profile() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetch() {
      const data = await getCharacter();
      console.log(data);
      setCharacters(data);
    }
    fetch();
  }, []);
  return (
    <>
      {characters.map((character) => <div className='card' key={`${character.id}`}>
        <h1>{character.name}</h1>
        <h2>{character.race} {character.class}</h2>
      </div>)}
    </>
  );
}
