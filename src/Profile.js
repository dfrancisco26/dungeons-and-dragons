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
    <div>Profile</div>
  );
}
