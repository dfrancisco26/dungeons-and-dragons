import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleCard } from './services/fetch-utils';




export default function Detail() {
  const [character, setCharacters] = useState({});
  const params = useParams();



  useEffect(() => {
    async function onLoad() {
      const data = await getSingleCard(params.id);
      setCharacters(data);

    }
    onLoad();
  }, [params.id]);
  return (
    <div>
      <h1>{character.name}</h1>
      <h2>{character.race} {character.class}</h2>
      <div id='abilities'>
        <p>Strength: {character.strength}</p>
        <p>Dexterity: {character.dexterity}</p>
        <p>Constitution: {character.constitution}</p>
        <p>Intelligence: {character.intelligence}</p>
        <p>Wisdom: {character.wisdom}</p>
        <p>Charisma: {character.charisma}</p>
      </div>
    </div>);
    
  
}
