import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteCharacter, getSingleCard, updateCharacter } from './services/fetch-utils';
import { useHistory } from 'react-router-dom';

export default function Detail() {
  const [character, setCharacters] = useState({});
  const params = useParams();
  const { push } = useHistory();
  const [strength, setStrength] = useState(1);
  const [dexterity, setDexterity] = useState(1);
  const [constitution, setConstitution] = useState(1);
  const [intelligence, setIntelligence] = useState(1);
  const [wisdom, setWisdom] = useState(1);
  const [charisma, setCharisma] = useState(1);
  
  
  const sheet = {
    
    strength: strength,
    dexterity: dexterity,
    constitution: constitution,
    intelligence: intelligence,
    wisdom: wisdom,
    charisma: charisma
  };

  useEffect(() => {
    async function onLoad() {
      const data = await getSingleCard(params.id);
      setCharacters(data);
  
    }
    onLoad();
  }, [params.id]);
  
  async function handleUpdateCharacter(e) {
    e.preventDefault();
    await updateCharacter(params.id, sheet);
    
    push('/profile');
  }
  
  async function handleDeleteCharacter() {
    await deleteCharacter(params.id);

    push('/profile');
  }

  return (
    <div>
      <div id='char-and-stats'>
        <div id='char-info'>
          <h1 id='char-name'>{character.name}</h1>
          <h2 id='char-rc'>{character.race} {character.class}</h2>
          <img src={`./assets/${character.race}.png`}></img>
        </div>
        <div id='abilities'>
          <p>Strength: {character.strength}</p>
          <p>Dexterity: {character.dexterity}</p>
          <p>Constitution: {character.constitution}</p>
          <p>Intelligence: {character.intelligence}</p>
          <p>Wisdom: {character.wisdom}</p>
          <p>Charisma: {character.charisma}</p>
        </div>
      </div>
      <div>
        <form id='update-abilities-form' onSubmit={handleUpdateCharacter}>
          <label>Strength</label>
          <input id='str' type='number' value={strength} onChange={e => setStrength(e.target.value)}></input>
          <label>Dexterity</label>
          <input id='dex' type='number' value={dexterity} onChange={e => setDexterity(e.target.value)}></input>
          <label>Constitution</label>
          <input id='con' type='number' value={constitution} onChange={e => setConstitution(e.target.value)}></input>
          <label>Intelligence</label>
          <input id='int' type='number' value={intelligence} onChange={e => setIntelligence(e.target.value)}></input>
          <label>Wisdom</label>
          <input id='wis' type='number' value={wisdom} onChange={e => setWisdom(e.target.value)}></input>
          <label>Charisma</label>
          <input id='cha' type='number' value={charisma} onChange={e => setCharisma (e.target.value)}></input>
          <br></br>
          <button id='update-button'>Update Character</button>
        </form>
      </div>
      <button id='delete-button' onClick={handleDeleteCharacter} className='delete-button'>Delete Character</button>
    </div>);
    
  
}
