import React, { useEffect } from 'react';
import { getCharacter } from './services/fetch-utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [characters, setCharacters] = useState([]);
<<<<<<< HEAD
  
=======
>>>>>>> main

  useEffect(() => {
    async function fetch() {
      // seems confusing that getCharacter (singluar) returns more than one character
      const data = await getCharacter();
      
      setCharacters(data);
    }
    fetch();
  }, []);


  
  return (
<<<<<<< HEAD
    <><h1 className='list-header'>Your characters</h1>
      <div className='scroller'>
        {characters.map((character) => <Link className='card' key={`${character.id}`} to={`/detail/${character.id}`}> <div>
          <h1>{character.name}</h1>
          <h2>{character.race} {character.class}</h2>
        </div>
        </Link>)}
      </div></>
=======
    <>
      {characters.map((character) => 
        <Link className='card' key={`${character.id}`} to={`/detail/${character.id}`}> 
          <div>
            <h1>{character.name}</h1>
            <h2>{character.race} {character.class}</h2>
          </div>
        </Link>)}
    </>
>>>>>>> main
  );
}
