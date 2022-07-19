import React, { useEffect } from 'react';
import { getCharacter } from './services/fetch-utils';
import { useState } from 'react';

export default function Profile() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetch(id) {
      const data = await getCharacter(id);
      console.log(data);
      setCharacters(data);
    }
    fetch();
  }, []);
  return (
    <div>Profile</div>
  );
}
