import React, { useEffect } from 'react';
import { getCharacter } from './services/fetch-utils';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { Button, Alert, Snackbar } from '@mui/material';
import CustomizedSnackbars from './services/utils';

export default function Profile() {
  const [characters, setCharacters] = useState([]);
  

  useEffect(() => {
    async function fetch() {
      
      const data = await getCharacter();
      
      setCharacters(data);
    }
    fetch();
  }, []);


  
  return (
    <>
      
      {characters.map((character) => <Link className='card' key={`${character.id}`} to={`/detail/${character.id}`}> <div>
        <h1>{character.name}</h1>
        <h2>{character.race} {character.class}</h2>
      </div>
      </Link>)}
    </>
  );
}
