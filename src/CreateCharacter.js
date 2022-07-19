import { useState, useEffect } from 'react';
import { checkError } from './services/client';
import { getClass } from './services/fetch-utils';
import { getRace } from './services/fetch-utils';
import { createCharacter } from './services/fetch-utils';

export default function CreateCharacter() {
  const [dClass, setDclass] = useState([]);
  const [dRace, setDrace] = useState([]);
  const [classInput, setClassInput] = useState('');
  const [classQuery, setClassQuery] = useState('');
  const [raceInput, setRaceInput] = useState('');
  const [raceQuery, setRaceQuery] = useState('');
  const [name, setName] = useState('');

  const sheet = {
    name: name,
    class: dClass,
    race: dRace,
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
      <form onSubmit={handleSubmit}>
        <label>Name<input value={name} onChange = {e => setName(e.target.value)}></input></label>
        <label>Class
          <select required onSubmit={e => setDclass(e.target.value)}>
            {
              dClass.map((Dclass) => <option value={Dclass.data} className='class-selection' key = {Dclass.slug} > 
                {
                  Dclass.name
                }
              </option>)
            }
          </select></label>
        <label>Race 
          <select onSubmit={e => setDrace(e.target.value)}>
            {
              dRace.map((Drace) => <option value={Drace.data} className='race-selection' key = {Drace.slug} >
                {
                  Drace.name
                }
              </option>)
            }
          </select>
        </label>
        <button>Submit Selection</button>
      </form>
    </div>
    <div>

    </div></>

  );
}
