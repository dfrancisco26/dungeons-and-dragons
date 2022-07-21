import { useState, useEffect } from 'react';
import { checkError } from './services/client';
import { getClass } from './services/fetch-utils';
import { getRace } from './services/fetch-utils';
import { createCharacter } from './services/fetch-utils';

export default function CreateCharacter() {
  const [dClass, setDclass] = useState([]);
  const [dRace, setDrace] = useState([]);
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


  // const race = dRace.find(singlerace => singlerace.name === raceInput); (just in case we can no longer hit the API for single races/classes)



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

    setDrace(data.results);
  }

  async function storeClasses() {
    const data = await getClass(classQuery);
   
    setDclass(data.results);
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
    setDrace(rdata.results);
    setDclass(data.results); //this could be an issue
    setClassInput('');
    setRaceInput('');
    setName('');
    

    const response = await createCharacter(sheet);
    return checkError(response);
  }


  return (
    <div>
      <form className='createchar-form' onSubmit={handleSubmit}>
        <label>Name:  <input id='name-input' value={name} onChange = {e => setName(e.target.value)}></input></label>
        <br></br>
        <label>Class:  
          <select id='class-select' required onChange={e => setClassInput(e.target.value)}>
            <option value={null}></option> 
            {
              dClass.map((Dclass) => <option value={Dclass.data} className='class-selection' key = {Dclass.slug} > 
                {
                  Dclass.name
                }
              </option>)
            }
          </select></label>
        <br></br>
        <label>Race:   
          <select id='race-select' onChange={e => setRaceInput(e.target.value)}>
            <option value={null}></option>
            {
              dRace.map((Drace) => <option value={Drace.data} className='race-selection' key = {Drace.slug} >
                {
                  Drace.name
                }
              </option>)
            }
          </select>
        </label>
        <label>Strength</label>
        <input id='str' value={strength} onChange={e => setStrength (e.target.value)}></input>
        <label>Dexterity</label>
        <input id='dex' value={dexterity} onChange={e => setDexterity (e.target.value)}></input>
        <label>Constitution</label>
        <input id='con' value={constitution} onChange={e => setConstitution (e.target.value)}></input>
        <label>Intelligence</label>
        <input id='int' value={intelligence} onChange={e => setIntelligence (e.target.value)}></input>
        <label>Wisdom</label>
        <input id='wis' value={wisdom} onChange={e => setWisdom (e.target.value)}></input>
        <label>Charisma</label>
        <input id='cha' value={charisma} onChange={e => setCharisma (e.target.value)}></input>
        <br></br>
        <button id='submit-button'>Submit Selection</button>
      </form>
    </div>

  );
}
