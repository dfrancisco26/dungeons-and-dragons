import { useState, useEffect } from 'react';
import { checkError } from './services/client';
import { getClass } from './services/fetch-utils';
import { getRace } from './services/fetch-utils';
import { createCharacter } from './services/fetch-utils';

export default function CreateCharacter() {
  // this naming seems a little easier for me to follow
  const [allClasses, setAllClasses] = useState([]);
  const [allRaces, setAllRaces] = useState([]);
  const [classInput, setClassInput] = useState('barbarian');
  const [classQuery, setClassQuery] = useState('');
  const [raceInput, setRaceInput] = useState('dwarf');
  const [raceQuery, setRaceQuery] = useState('');
  const [name, setName] = useState('');
  const [strength, setStrength] = useState(1);
  const [dexterity, setDexterity] = useState(1);
  const [constitution, setConstitution] = useState(1);
  const [intelligence, setIntelligence] = useState(1);
  const [wisdom, setWisdom] = useState(1);
  const [charisma, setCharisma] = useState(1);

  // const race = allRaces.find(singlerace => singlerace.name === raceInput); (just in case we can no longer hit the API for single races/classes)

  const sheet = {
    name: name,
    class: classInput,
    race: raceInput,
    strength: strength,
    dexterity: dexterity,
    constitution: constitution,
    intelligence: intelligence,
    wisdom: wisdom,
    charisma: charisma
  };


  async function storeRaces() {
    const data = await getRace(raceQuery);

    setAllRaces(data.results);
  }

  async function storeClasses() {
    const data = await getClass(classQuery);
   
    setAllClasses(data.results);
  }
  

  useEffect(() => {
    storeClasses();
    storeRaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // might need separate useEffect for races

  async function handleSubmit(e) {

    e.preventDefault();
    
    setClassQuery(classInput);
    setRaceQuery(raceInput);
    const data = await getClass(classInput);
    const rdata = await getRace(raceInput);
    setAllRaces(rdata.results);
    setAllClasses(data.results); //this could be an issue
    setClassInput('');
    setRaceInput('');
    setName('');
    

    const response = await createCharacter(sheet);
    return checkError(response);
  }


  return (
    <div>
      <form className='createchar-form' onSubmit={handleSubmit}>
        <label>
            Name:  <input id='name-input' value={name} onChange = {e => setName(e.target.value)}/ >      
        </label>
        <br></br>
        <label>
            Class:  
          <select id='class-select' required onChange={e => setClassInput(e.target.value)}>
            <option value={null}></option> 
            {
              allClasses.map((Dclass) => <option value={Dclass.data} className='class-selection' key = {Dclass.slug} > 
                {
                  Dclass.name
                }
              </option>)
            }
          </select>
        </label>
        <br></br>
        <label>
            Race:   
          <select id='race-select' onChange={e => setRaceInput(e.target.value)}>
            <option value={null}></option>
            {
              allRaces.map((race) =>
                <option 
                  value={race.data} 
                  className='race-selection' 
                  key={race.slug}>
                  {race.name}
                </option>)
            }
          </select>
        
        </label>
        <label>
            Strength
        </label>
        <input id='str' value={strength} onChange={e => setStrength (e.target.value)}/ >
        <label>
            Dexterity
        </label>
        <input id='dex' value={dexterity} onChange={e => setDexterity (e.target.value)}/ >
        <label>
            Constitution
        </label>
        <input id='con' value={constitution} onChange={e => setConstitution (e.target.value)}/ >
        <label>
            Intelligence
        </label>
        <input id='int' value={intelligence} onChange={e => setIntelligence (e.target.value)}/ >
        <label>
            Wisdom
        </label>
        <input id='wis' value={wisdom} onChange={e => setWisdom (e.target.value)}/ >
        <label>
            Charisma
        </label>
        <input id='cha' value={charisma} onChange={e => setCharisma (e.target.value)}/ >
        {/* use css display:block on the button to move things to the next line  */}
        <button id='submit-button'>Submit Selection</button>
      </form>
    </div>

  );
}
