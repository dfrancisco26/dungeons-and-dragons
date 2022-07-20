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


  // const race = dRace.find(singlerace => singlerace.name === raceInput); (just in case we can no longer hit the API for single races/classes)



  const sheet = {
    name: name,
    class: classInput,
    race: raceInput,
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
    <><div>
      <form className='createchar-form' onSubmit={handleSubmit}>
        <label>Name:  <input id='name-input' value={name} onChange = {e => setName(e.target.value)}></input></label>
        <br></br>
        <label>Class:  
          <select id='class-select' required onChange={e => setClassInput(e.target.value)}>
            <option value={''}></option> 
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
            <option value={''}></option>
            {
              dRace.map((Drace) => <option value={Drace.data} className='race-selection' key = {Drace.slug} >
                {
                  Drace.name
                }
              </option>)
            }
          </select>
        </label>
        <br></br>
        <button id='submit-button'>Submit Selection</button>
      </form>
    </div>
    <div>

    </div></>

  );
}
